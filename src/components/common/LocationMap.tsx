import React from 'react';

interface LocationMapProps {
  coordinates: string;
  address: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({ coordinates, address }) => {
  const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

  return (
    <div className="space-y-2">
      <div className="h-64 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}`}
          allowFullScreen
        />
      </div>
      <p className="text-sm text-gray-600">{address}</p>
    </div>
  );
};
