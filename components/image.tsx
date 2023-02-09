import React from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

interface TransformImageProps {
  crop: string;
  image: string;
  width: number;
  height: number;
}

const TransformImage: React.FC<TransformImageProps> = ({ crop, image, width, height }) => {
  
  return (
    <CloudinaryContext cloudName="dic7lotfy">
      <Image publicId={image}>
        
        <Transformation width={width} height={height} crop={crop} />
      </Image>
    </CloudinaryContext>
  );
};

export default TransformImage;
