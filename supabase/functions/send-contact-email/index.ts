
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

// Enhanced input validation
const validateInput = (data: ContactEmailRequest): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else if (data.name.length < 2 || data.name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }
  
  // Email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!emailRegex.test(data.email) || data.email.length > 254) {
    errors.push('Valid email address is required');
  }
  
  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required');
  } else if (data.message.length < 10 || data.message.length > 1000) {
    errors.push('Message must be between 10 and 1000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Enhanced sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[\r\n]/g, ' ') // Replace line breaks with spaces
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Rate limiting using a simple in-memory store (for basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests per window
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Check content length (prevent large payloads)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10000) { // 10KB limit
      return new Response(
        JSON.stringify({ error: "Request payload too large" }),
        {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get client IP for rate limiting
    const clientIP = req.headers.get("cf-connecting-ip") || 
                    req.headers.get("x-forwarded-for") || 
                    "unknown";
    
    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded. Please try again later." 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if API key is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ 
          error: "Email service not configured. Please contact support." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    let requestData: ContactEmailRequest;
    try {
      requestData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input
    const validation = validateInput(requestData);
    if (!validation.isValid) {
      console.log("Validation failed:", validation.errors);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: validation.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(requestData.name),
      email: sanitizeInput(requestData.email.toLowerCase()),
      message: sanitizeInput(requestData.message),
    };

    console.log("Processing contact form submission:", { 
      name: sanitizedData.name, 
      email: sanitizedData.email,
      messageLength: sanitizedData.message.length,
      clientIP: clientIP.substring(0, 8) + "..." // Log partial IP for privacy
    });

    // Get recipient email from environment variable
    const recipientEmail = Deno.env.get("CONTACT_EMAIL") || "emilypettersson83@gmail.com";

    // Send email with enhanced security
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `New Contact Form Message from ${sanitizedData.name}`,
      replyTo: sanitizedData.email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e1e5e9; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #333;">Name:</strong> ${sanitizedData.name}</p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #333;">Email:</strong> ${sanitizedData.email}</p>
              <p style="margin: 10px 0 0 0;"><strong style="color: #333;">Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap; word-wrap: break-word; border: 1px solid #e1e5e9;">
${sanitizedData.message}
              </div>
            </div>
            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #0056b3; font-size: 14px;">
                <strong>Security Notice:</strong> This message was sent through your portfolio contact form with enhanced security validation.
              </p>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; color: #6c757d; font-size: 12px;">
              Sent at ${new Date().toISOString()} | Portfolio Contact Form
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", {
      id: emailResponse.id,
      to: recipientEmail
    });

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    // Don't expose detailed error information to clients
    const errorMessage = error instanceof Error ? "Internal server error" : "Unknown error occurred";
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
