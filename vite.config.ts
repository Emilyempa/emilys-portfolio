
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Security headers
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      // Content Security Policy
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // React needs unsafe-inline and unsafe-eval
        "style-src 'self' 'unsafe-inline'", // Tailwind needs unsafe-inline
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://bhoauhbplvlutywbtnjm.supabase.co wss://bhoauhbplvlutywbtnjm.supabase.co",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join("; ")
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
