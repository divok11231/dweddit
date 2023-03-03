import React from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

interface TransformImageProps {
  crop: string;
  image: string;
  width: number;
  height: number;
}

const TransformImage: React.FC<TransformImageProps> = ({  image }) => {
  
  return (
    <CloudinaryContext cloudName="dic7lotfy">
      <Image publicId={image}>
        
        <Transformation  />
      </Image>
    </CloudinaryContext>
  );
};

export default TransformImage;
