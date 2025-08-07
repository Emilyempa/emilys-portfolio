# Emily Pettersson's Portfolio

A modern, responsive portfolio website built with cutting-edge web technologies and AI-driven development practices. This project showcases my skills in frontend development, prompt engineering, and creating accessible web applications.

## 🚀 Features

- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Mode**: Theme switching with Next Themes
- **Contact Form**: Functional contact form with email integration via Resend
- **Skills Showcase**: Interactive skills and technologies display
- **Projects Gallery**: Portfolio projects with live demo links
- **Accessibility**: Built with accessibility best practices
- **Modern UI**: Clean, modern interface using shadcn/ui components
- **Performance Optimized**: Fast loading with Vite and optimized assets

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, customizable UI components
- **Lucide React** - Modern icon library
- **Next Themes** - Theme switching functionality

### Backend & Services
- **Supabase** - Backend as a Service (BaaS)
- **Supabase Edge Functions** - Serverless functions for API endpoints
- **Resend** - Email service for contact form

### Development & Testing
- **ESLint** - Code linting and formatting
- **Cypress** - End-to-end testing
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/your-portfolio-repo.git
cd your-portfolio-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Supabase Setup
This project uses Supabase for backend functionality. You'll need to:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Update the Supabase configuration in `src/integrations/supabase/client.ts`
3. Set up the required environment variables/secrets in Supabase:
   - `RESEND_API_KEY` - For email functionality
   - `CONTACT_EMAIL` - Recipient email for contact form

### 4. Email Service Setup (Optional)
For the contact form to work, you'll need a Resend API key:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add it to your Supabase project secrets as `RESEND_API_KEY`

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🚀 Deployment

### Option 1: Lovable Platform (Recommended)
This project is optimized for deployment on the Lovable platform:
1. Connect your GitHub repository to Lovable
2. Deploy directly from the Lovable interface

### Option 2: Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Skills.tsx      # Skills showcase
│   ├── Projects.tsx    # Projects gallery
│   └── Contact.tsx     # Contact form
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── integrations/       # Third-party integrations
└── index.css          # Global styles and design tokens

supabase/
└── functions/          # Supabase Edge Functions
    └── send-contact-email/  # Contact form email handler
```

## 🎨 Customization

### Design System
The project uses a comprehensive design system with:
- Custom CSS variables in `src/index.css`
- Tailwind configuration in `tailwind.config.ts`
- Semantic color tokens for consistent theming

### Adding Content
- **Skills**: Update the skills array in `src/components/Skills.tsx`
- **Projects**: Modify the projects data in `src/components/Projects.tsx`
- **Personal Info**: Update content in various components as needed

## 🧪 Testing

Run end-to-end tests with Cypress:
```bash
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Feel free to reach out through the contact form on the website or connect with me on:
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

---

Built with ❤️ using AI-driven development and modern web technologies.

