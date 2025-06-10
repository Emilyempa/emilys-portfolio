
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

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Sending contact form:", formData);

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      console.log("Email sent successfully:", data);

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending email:", error.message);
      } else {
        console.error("Error sending email:", error);
      }
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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
    // Basic input sanitization - remove HTML tags
    const sanitizedValue = value.replace(/<[^>]*>/g, "");
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    required
                    className="retro-border bg-input focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={100}
                    required
                    className="retro-border bg-input focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    className="flex min-h-[120px] w-full rounded-md border border-primary/30 bg-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm retro-border"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={1000}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-all retro-border hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
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
