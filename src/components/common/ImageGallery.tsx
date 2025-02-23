import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={alt || 'Gallery image'}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedImage(index)}
            className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
