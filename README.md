# Emily Pettersson's Portfolio

A modern, responsive portfolio website showcasing skills in frontend development, prompt engineering, and creating accessible web applications. Built with cutting-edge web technologies and featuring a functional contact form with email integration.

## 🚀 Features

- **Responsive Design**: Fully responsive across all device sizes with mobile-first approach
- **Dark/Light Mode**: Theme switching with system preference detection
- **Contact Form**: Functional contact form with email integration via Resend
- **Skills Showcase**: Interactive display of technical skills and technologies
- **Projects Gallery**: Portfolio projects showcase with descriptions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Modern UI**: Clean interface using shadcn/ui components and Tailwind CSS
- **Performance Optimized**: Fast loading with Vite build tool

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Beautiful, accessible, and customizable UI components
- **Lucide React** - Modern SVG icon library
- **Next Themes** - Theme switching functionality

### Backend & Services
- **Supabase** - Backend as a Service (BaaS) for serverless functions
- **Supabase Edge Functions** - Deno-based serverless functions for API endpoints
- **Resend** - Modern email API for contact form functionality

### Development & Testing
- **ESLint** - Code linting and formatting with TypeScript support
- **Cypress** - End-to-end testing framework
- **React Hook Form** - Performant form handling with validation
- **Zod** - Runtime type validation and schema validation

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <your-portfolio-repo>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

#### Supabase Setup
This project requires a Supabase project for backend functionality:

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Note your project URL and anon key

2. **Update Supabase configuration**:
   - Replace the project settings in `src/integrations/supabase/client.ts` with your project details:
   ```typescript
   const supabaseUrl = "YOUR_SUPABASE_URL"
   const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"
   ```

3. **Deploy Edge Functions**:
   - The edge functions will be automatically deployed when you connect to Supabase
   - Functions are located in `supabase/functions/send-contact-email/`

#### Email Service Setup (For Contact Form)
To enable the contact form functionality:

1. **Sign up for Resend**:
   - Create an account at [resend.com](https://resend.com)
   - Verify your sending domain at [resend.com/domains](https://resend.com/domains)

2. **Get API Key**:
   - Generate an API key at [resend.com/api-keys](https://resend.com/api-keys)

3. **Configure Supabase Secrets**:
   - Go to your Supabase project dashboard
   - Navigate to Settings → Edge Functions
   - Add these secrets:
     - `RESEND_API_KEY`: Your Resend API key
     - `CONTACT_EMAIL`: The email address where contact form messages should be sent

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🚀 Deployment

### Option 1: Lovable Platform (Recommended)
This project is optimized for the Lovable platform:

1. **Connect to GitHub**: Link your repository to Lovable
2. **Deploy**: Use Lovable's one-click deployment
3. **Configure secrets**: Add your environment variables in Lovable's project settings

### Option 2: Manual Deployment (Vercel, Netlify, etc.)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure environment variables** in your hosting platform:
   - Set up Supabase project credentials
   - Configure Resend API key and contact email

4. **Deploy Supabase functions** (if not using Lovable):
   ```bash
   supabase functions deploy send-contact-email
   ```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── Header.tsx      # Navigation header with theme toggle
│   │   ├── Hero.tsx        # Hero section with introduction
│   │   ├── Skills.tsx      # Skills and technologies showcase
│   │   ├── Projects.tsx    # Portfolio projects display
│   │   ├── Contact.tsx     # Contact form with validation
│   │   └── AccessibilityProvider.tsx  # Accessibility enhancements
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main portfolio page
│   │   └── NotFound.tsx    # 404 error page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   │   ├── utils.ts        # General utility functions
│   │   └── security.ts     # Input validation and sanitization
│   ├── integrations/       # Third-party service integrations
│   │   └── supabase/       # Supabase client configuration
│   └── index.css          # Global styles and design system tokens
├── supabase/
│   ├── functions/          # Supabase Edge Functions
│   │   └── send-contact-email/  # Contact form email handler
│   └── config.toml         # Supabase project configuration
├── cypress/                # E2E testing configuration
├── public/                 # Static assets
└── dist/                   # Built application (generated)
```

## 🎨 Customization

### Content Updates
- **Personal Information**: Update details in `src/components/Hero.tsx`
- **Skills**: Modify the skills array in `src/components/Skills.tsx`
- **Projects**: Update project data in `src/components/Projects.tsx`
- **Contact Information**: Update social links in `src/components/Contact.tsx`

### Design System
The project uses a comprehensive design system:
- **CSS Variables**: Defined in `src/index.css` for consistent theming
- **Tailwind Configuration**: Custom configuration in `tailwind.config.ts`
- **Component Variants**: shadcn/ui components with custom variants
- **Dark/Light Mode**: Automatic theme switching with system preference

### Email Templates
- Email styling can be customized in `supabase/functions/send-contact-email/index.ts`
- The template includes responsive design and security features

## 🔒 Security Features

- **Input Validation**: Comprehensive validation using Zod schemas
- **Input Sanitization**: XSS prevention with custom sanitization functions
- **Rate Limiting**: Built-in rate limiting for contact form submissions
- **CORS Configuration**: Proper CORS headers for secure API communication
- **Email Header Injection Prevention**: Protection against email header attacks

## 🧪 Testing

### End-to-End Testing
Run Cypress tests:
```bash
# Open Cypress Test Runner
npm run cy:open

# Run tests in headless mode
npm run cy:run
```

### Manual Testing Checklist
- [ ] Contact form submission works correctly
- [ ] Email delivery to specified recipient
- [ ] Theme switching functionality
- [ ] Responsive design across devices
- [ ] Accessibility features (keyboard navigation, screen readers)

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Development build (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint

# Run Cypress tests
npm run cy:open    # Interactive mode
npm run cy:run     # Headless mode
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend email service API key | Yes (for contact form) |
| `CONTACT_EMAIL` | Recipient email for contact form | No (defaults to emilypettersson@hotmail.com) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Emily Pettersson
- **Email**: emilypettersson@hotmail.com
- **Portfolio**: [Your Portfolio URL]
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]

---

Built with ❤️ using modern web technologies and AI-driven development practices.

