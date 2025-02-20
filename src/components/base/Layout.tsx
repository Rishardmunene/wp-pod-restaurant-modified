import React from 'react';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { BasePage } from '../../types/pods';

interface LayoutProps {
  pageData: BasePage;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ pageData, children }) => {
  const layoutClasses = {
    full_width: 'w-full',
    boxed: 'max-w-7xl mx-auto px-4',
    contained: 'max-w-5xl mx-auto px-4'
  };

  return (
    <div className="min-h-screen">
      <Navigation type={pageData.navigation_type} />
      
      {pageData.enable_hero && (
        <Hero
          type={pageData.hero_type}
          content={pageData.hero_content}
          images={pageData.hero_images}
        />
      )}
      
      <main className={layoutClasses[pageData.page_layout]}>
        {children}
      </main>
    </div>
  );
};