
import { Inter } from '@next/font/google'

import axios from "axios"

const inter = Inter({ subsets: ['latin'] })
import TransformImage from "../components/image";

import React, { useState } from "react";
import Head from "next/head";




const IndexPage = () => {
  const [imagePublicId, setImagePublicId] = useState("");
 
  
  const [post,setpost]=useState("")

  const mainDivStyle = {
    padding: "1em",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = { post };
    const image ={imagePublicId}
    console.log(image)
    
    
    const user = await axios.post("/api/create/createPost", {content, image});
    if (user) {
      window.location.replace("/feed");
    }
    

       
  };


  const openWidget = () => {
    // create the widget
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dic7lotfy",
        uploadPreset: "dranktheshower"
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          
          
          
          setImagePublicId(result.info.secure_url);
         
        }
      }
    );
    widget.open(); 
  };

  

  return (
    
 <>
  <div style={mainDivStyle}>
      <form  onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="post"> Post </label>
        <input
          type="text"
          name="post"
          id="post"

          onChange={(e) => setpost(e.target.value)}
        />

        

        <button> makePost </button>
      </form>

     
    </div>
    <Head>
        
        <meta charSet="utf-8" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div className="main">
        <div className="splitdiv" id="leftdiv">
         
        <button type="button" id="leftbutton" onClick={openWidget }>
            Upload Image
          </button>
        </div>

        

        <div className="splitdiv" id="rightdiv">
        
        <div id="rightdivcard">
            {imagePublicId ? (
              <TransformImage
                
                image={imagePublicId} crop={''} width={0} height={0}               
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default IndexPage;