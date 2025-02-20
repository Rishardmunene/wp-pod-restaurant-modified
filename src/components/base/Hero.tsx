import React, { useState, useEffect } from 'react';

interface HeroProps {
  type?: 'slider' | 'static' | 'video';
  content?: string;
  images?: string[];
}

export const Hero: React.FC<HeroProps> = ({ type = 'static', content, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (type === 'slider' && images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [type, images]);

  const renderContent = () => (
    <div 
      className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40"
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );

  switch (type) {
    case 'slider':
      return (
        <div className="relative h-[60vh] overflow-hidden">
          {images?.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {content && renderContent()}
        </div>
      );

    case 'video':
      return (
        <div className="relative h-[60vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src={images?.[0]} type="video/mp4" />
          </video>
          {content && renderContent()}
        </div>
      );

    default: // static
      return (
        <div className="relative h-[60vh] overflow-hidden">
          {images?.[0] && (
            <img
              src={images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          {content && renderContent()}
        </div>
      );
  }
};