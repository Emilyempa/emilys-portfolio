import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  sanitizeInput, 
  sanitizeEmailContent, 
  validateFormContent, 
  createRateLimiter 
} from "@/lib/security";

// Create rate limiter: 3 requests per 5 minutes
const rateLimiter = createRateLimiter(3, 5 * 60 * 1000);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors([]);
    
    // Check rate limiting
    if (!rateLimiter()) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before sending another message. You can send up to 3 messages per 5 minutes.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Sanitize all inputs - less aggressive now
    const sanitizedData = {
      name: sanitizeInput(formData.name, 100),
      email: sanitizeEmailContent(formData.email.toLowerCase()),
      message: sanitizeInput(formData.message, 1000),
    };

    // Comprehensive validation
    const validation = validateFormContent(sanitizedData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: validation.errors[0],
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Sending sanitized contact form:", {
        name: sanitizedData.name,
        email: sanitizedData.email,
        messageLength: sanitizedData.message.length
      });

      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: sanitizedData,
        }
      );

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to send message");
      }

      console.log("Email sent successfully:", data);

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
      setValidationErrors([]);

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error: unknown) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Minimal sanitization on input - just store the value for most natural typing experience
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-primary/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary retro-glow">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Card className="retro-card">
            <CardHeader>
              <CardTitle className="text-secondary retro-glow">
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {validationErrors.length > 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <ul className="text-sm text-destructive space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name (2-100 characters)"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    minLength={2}
                    required
                    className="retro-border bg-input focus:ring-primary"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={254}
                    required
                    className="retro-border bg-input focus:ring-primary"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    className="flex min-h-[120px] w-full rounded-md border border-primary/30 bg-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm retro-border resize-none"
                    placeholder="Tell me about your project... (10-1000 characters)"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={1000}
                    minLength={10}
                    required
                    autoComplete="off"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {formData.message.length}/1000 characters
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-all retro-border hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p className="text-xs text-muted-foreground">
                  * Required fields. Rate limited to 3 messages per 5 minutes.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="text-secondary retro-glow">
                  Connect With Me
                </CardTitle>
                <CardDescription>
                  Find me on these platforms or check out my work.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="https://github.com/Emilyempa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-secondary/30 hover:bg-secondary/20 transition-all retro-border hover:shadow-lg hover:shadow-secondary/30"
                >
                  <Github className="h-5 w-5 text-secondary" />
                  <div>
                    <div className="font-medium text-secondary">GitHub</div>
                    <div className="text-sm text-muted-foreground">
                      @EmilyEmpa
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/emily-pettersson-865157301/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-secondary/30 hover:bg-secondary/20 transition-all retro-border hover:shadow-lg hover:shadow-secondary/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-secondary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.63 1.34 2.97 2.98 2.97s2.97-1.34 2.97-2.97c0-1.64-1.33-2.98-2.97-2.98zM3.5 8H6.5V21H3.5zM9 8H12v2h.07c.55-1.04 1.89-2 3.93-2 4.2 0 4.98 2.77 4.98 6.38V21h-3V14.63c0-1.54-.03-3.5-2.13-3.5-2.13 0-2.46 1.67-2.46 3.4V21H9V8z" />
                  </svg>
                  <div>
                    <div className="font-medium text-secondary">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">
                      @Emily Pettersson
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="text-accent retro-glow">
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm a passionate fullstack developer who enjoys exploring
                  innovative and user-friendly web applications. My projects
                  reflect my commitment to accessibility, intuitive design, and
                  modern development practices. This portfolio is the result of
                  my curiosity about AI-driven development and my exploration of
                  Loveable—an experience that has deepened my understanding of
                  emerging technologies and how they shape the future of digital
                  experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
