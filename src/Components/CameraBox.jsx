import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { IconButton } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CameraIcon from '@mui/icons-material/Camera';

function CameraApp() {
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
        const apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD2lFq87EADs3BDfHTHXXVIzR8ZN7Mbrhw';
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