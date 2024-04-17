import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState(default_image);
  const inputRef = useRef(null);
  const [loading, setLoading]= useState(false);

  const imageGenerator = async () => {
    try {
      const userInput = inputRef.current.value.trim();
      if (!userInput) {
        console.error('Please provide a valid input.');
        return;
      }
      setLoading(true);

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
            "User-Agent": "Chrome"
          },
          body: JSON.stringify({
            prompt: userInput,
            n: 1,
            size: "512x512"
          })
        }
      );

      if (!response.ok) {
        console.error('Error generating image:', response.statusText);
        return;
      }

      const data = await response.json();
      const imageUrl = data?.data?.[0]?.url;
      setLoading(false);
      if (!imageUrl) {
        console.error('Image URL not found in API response.');
        return;
        
      }

      setImage_url(imageUrl);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url} alt="Generated Image" />
          <div className='loading'>
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div> 
            </div>
        </div>
      </div>
      <div className='search-box'>
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
        <div className='generate-btn' onClick={imageGenerator}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
