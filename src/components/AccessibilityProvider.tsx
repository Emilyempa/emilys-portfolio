
import React from 'react';

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="accessibility-enhanced">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:retro-border"
      >
        Skip to main content
      </a>
      {children}
    </div>
  );
};
