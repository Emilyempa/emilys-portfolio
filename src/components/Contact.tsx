
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (you'll need a backend to handle this securely)
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      alert('Message sent successfully!');
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Basic input sanitization - remove HTML tags
    const sanitizedValue = value.replace(/<[^>]*>/g, '');
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-primary/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary retro-glow">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Card className="retro-card">
            <CardHeader>
              <CardTitle className="text-secondary retro-glow">Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">Name</Label>
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
                  <Label htmlFor="email" className="text-muted-foreground">Email</Label>
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
                  <Label htmlFor="message" className="text-muted-foreground">Message</Label>
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="text-secondary retro-glow">Connect With Me</CardTitle>
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
                    <div className="text-sm text-muted-foreground">@EmilyEmpa</div>
                  </div>
                </a>
              </CardContent>
            </Card>
            
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="text-accent retro-glow">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm a passionate fullstack developer who loves creating innovative solutions with a retro-futuristic aesthetic. 
                  My projects showcase my skills in React, JavaScript, and modern web development practices with an 80's twist.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
