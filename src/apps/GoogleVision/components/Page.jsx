import React, { useState, useEffect } from 'react'
import WebCam from './WebCam'
import WebCamButton from './WebCamButton'
import ImageSelector from './ImageSelector'
import '../styles/Page.css'
import EmotionDetection from './EmotionDetection'
import * as faceapi from 'face-api.js'
import { storage } from "../../../firebase";


const Page = ({count, emotion, handleCount, handleFacialEmotion}) => {
    const [useWebcam, setUseWebcam] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState();
    const [blobImage, setBlobImage] = useState();
    const [dataUri, setDataUri] = useState();
    const [emotionDisplay, setEmotionDisplay] = useState();

    useEffect(() => {
        switch(emotion){
            case 'happy':
                setEmotionDisplay('Happy 😃')
                break;
            case 'sad':
                setEmotionDisplay('Sad 😞')
                break;
            case 'surprised':
                setEmotionDisplay('Surprised 😮')
                break;
            case 'neutral':
                setEmotionDisplay('Neutral 😐')
                break;
        }
    })

    function dataUriToBlob(dataUri) {
        var byteString = atob(dataUri.split(',')[1]);
        var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
      
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    }

    useEffect(() => {
        if (blobImage != undefined){
            console.log(blobImage);
            handleUpload();
        }
    }, [blobImage])

    const handleClick = () => {
        setUseWebcam(true);
    }

    const handleUpload = () => {
        let uploadTask;
        const webcam = `WEBCAM_PHOTO ${Math.random()}`
        if (dataUri){
            uploadTask = storage.ref(`images/${webcam}`).putString(dataUri, 'data_url');
        }else {
            uploadTask = storage.ref(`images/${blobImage.name}`).put(image);
        }
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
              if (dataUri) {
                storage
                .ref("images")
                .child(webcam)
                .getDownloadURL()
                .then((url)=> {
                    handleFacialEmotion(url);
                })
              }else {
                storage
                .ref("images")
                .child(blobImage.name)
                .getDownloadURL()
                .then((url)=> {
                    handleFacialEmotion(url);
                })
              }
          }
        );
      };

    const handleImageSelector = async (event) => {
        setBlobImage(event.target.files[0]);
		setImage(await faceapi.bufferToImage(event.target.files[0]));
		setImageSelected(true);
	};

    const handleWebcamPhoto = async(dataUri) => {
        setDataUri(dataUri);
        const blobPhoto = dataUriToBlob(dataUri);
        setBlobImage(blobPhoto);
        setImage(await faceapi.bufferToImage(blobPhoto));
        setImageSelected(true);
    }

    const emotionMatch = (result) => {
        if (result) {
            handleCount();
            const emotions = ["happy", "neutral", "sad", "surprised"];
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            emotion = randomEmotion;
            setImageSelected(false);
            setUseWebcam(false);
            setImage(null);
            setDataUri(null);
        }else {
            setImageSelected(false);
            setUseWebcam(false);
            setImage(null);
            setDataUri(null);
        }
    }

    return (
        <div>
        <div className = "navbar">Crypto Identity</div>
        <div className = "PageContainer">
            {!imageSelected && !useWebcam &&  (
            <div className = 'row'>
                <div className = 'column-left'>
                <h1 className = 'welcome'>Welcome</h1>
                <h2 >Thank you for signing up! Please take a photo of <strong>yourself</strong> performing the expression on the right using a webcam or uploading an image  </h2>
                </div>
                <div className = 'column'>
                <h3 className = 'emotion'>{emotionDisplay}</h3>
                {!useWebcam && (
                    <div>
                        <WebCamButton onClick = {handleClick}/>
                        <ImageSelector onChange = {handleImageSelector}/>  
                    </div>
                )}
                <h1>{count}/4</h1>
            </div>
            </div>
            )}
            {!imageSelected && useWebcam && (
                <div>
                    <WebCam onClick = {handleWebcamPhoto}></WebCam>
                    <h1>{count}/4</h1>
                    </div>
                )}
            {imageSelected && image && (
                <div>
                    <EmotionDetection image = {image} emotion = {emotion} emotionMatch = {emotionMatch}/>
                </div>
            )}
        </div>
        </div>
    )
}

export default Page;
