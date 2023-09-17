import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { IconButton } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CameraIcon from '@mui/icons-material/Camera';



function CameraApp(props) {
  // const apiKey = process.env.REACT_APP_API_KEY;
  const apiKey = 'AIzaSyCHtiu-J-OZrctQ0JK5WHZZyFbQCrJf7xA'

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 600 },
            height: { ideal: 1300 }
          }
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    startCamera();
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video feed
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Capture a photo from the video feed
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas as a base64-encoded PNG
      const dataUrl = canvas.toDataURL('image/png');

      // Set the captured photo data
      setPhotoData(dataUrl);
      console.log(dataUrl);
    }
  };

  const sendImageToOCR = async () => {
    if (photoData) {
      try {
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        const base64Image = photoData.split(',')[1]; // Remove the data URI prefix
        const requestData = {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'TEXT_DETECTION' }],
            },
          ],
        };

        const response = await axios.post(apiUrl, requestData);
        const ocrText = response.data.responses[0].fullTextAnnotation.text;
        console.log('OCR Text:', ocrText);
        sendImageToWard(ocrText);

        // You can now use the OCR text in your application
      } catch (error) {
        console.error('Error sending image to OCR:', error);
      }
    }


  };

  const sendImageToTesseract = () => {
    if (photoData) {
      Tesseract.recognize(
        photoData,
        'eng', // Language code (e.g., 'eng' for English)
        { logger: (info) => console.log(info) }
      ).then(({ data: { text } }) => {
        console.log('OCR Text:', text);
        // You can now use the OCR text in your application
      }).catch((error) => {
        console.error('Error performing OCR with Tesseract:', error);
      });
    }
  };

  const sendImageToWard = (ocrText) => {
    const wardObject = {
      menu: ocrText,
      allergies: props.preferences.allergies,
      restrictions: props.preferences.dietary,
      goals: props.preferences.goals,
    }
    console.log(wardObject);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "menu": "SANDWICHES SERVED WITH A HALF NAPOLI SALAD OR FIRE ROASTED TOMATO BISQUE.\nMEATBALL SANDWICH 22\nGrande size 10″ toasted baguette loaded with simmering, juicy meatballs in a family recipe Pomodoro sauce, topped with melted Mozzarella and finished with zesty Italian drizzle.\nWISEGUY 20\nOven toasted baguette with mayo, charcuterie meats (spicy capicola, soppressata and Italian ham), topped with Provolone cheese, crispy romaine, roma tomatoes, red onions, and zesty Italian dressing.\nCHICKEN PESTO SANDWICH 22\nRoasted chicken breast with pesto sauce and topped with Provolone cheese, prosciutto crisps, and bruschetta mix. Served on a garlic-toasted baguette with your choice of soup or Napoli salad.",
      "allergies": "",
      "restrictions": "",
      "goals": ""
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/frontend-endpoint", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="camera-container">
      <div className="video-frame">
        <video height="500" ref={videoRef} autoPlay playsInline muted />
        {/* <button onClick={takePhoto} className="take-picture-button">
          Take Photo
        </button> */}
        <IconButton onClick={takePhoto} className="take-picture-button" style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          zIndex: 2,
        }}>
          <CameraIcon /> {/* Use the camera or shutter icon here */}
        </IconButton>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {photoData && (
        <div className="captured-photo">
          <img src={photoData} alt="Captured" />
        </div>
      )}
      <button disabled={!photoData} onClick={sendImageToOCR}>
        Image to OCR
      </button>
    </div>
  );
}

export default CameraApp;