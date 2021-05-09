import React from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import '../styles/WebCamButton.css'

export default function WebCam({onClick}) {
    function handleTakePhoto (dataUri) {
        onClick(dataUri);
    }

    return (
        <div>
        <Camera
        className = "camera"
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
        </div>
    )
}
