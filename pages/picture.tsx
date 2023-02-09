import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import TransformImage from "../components/image";

import React, { useState } from "react";
import Head from "next/head";


const IndexPage = () => {
  
  const [imagePublicId, setImagePublicId] = useState("");
  const [alt, setAlt] = useState("");
  const [crop, setCrop] = useState("scale");
  const [height, setHeight] = useState(900);
  const [width, setWidth] = useState(900);
  console.log(imagePublicId);
  

  const openWidget = () => {
    // create the widget
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dic7lotfy",
        uploadPreset: "dranktheshower",
        sources: ['local', 'url'],
      },
      (error, result) => {
        if (
          console.log(result.info.secure_url),
          result.event === "success" &&
          result.info.resource_type === "image"
          
        ) {
          console.log(imagePublicId);
          setImagePublicId(result.info.public_id);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  

  return (
 <>
    <Head>
        <title>How to Crop and Resize Image in the Browser</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div className="main">
        <div className="splitdiv" id="leftdiv">
          <h1 className="main-h1">
            How to Crop, Resize & Upload Image in the Browser using Cloudinary
            Transformation
          </h1>
          <div id="leftdivcard">
            <h2 className="main-h2">Resize Options</h2>b   
          </div>

          <button type="button" id="leftbutton" onClick={openWidget}>
            Upload Image
          </button>
        </div>

        

        <div className="splitdiv" id="rightdiv">
        <h1> Image will appear here</h1>
        <div id="rightdivcard">
            {imagePublicId ? (
              <TransformImage
                crop={crop}
                image={imagePublicId}
                width={width}
                height={height}
              />
            ) : (
              <h1> Image will appear here</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default IndexPage;
