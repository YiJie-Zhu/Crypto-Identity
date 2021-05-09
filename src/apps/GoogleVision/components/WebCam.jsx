import React from 'react'
import Camera from 'react-html5-camera-photo';
import ImageSelector from './ImageSelector';
import 'react-html5-camera-photo/build/css/index.css';

export default function WebCam({onClick}) {
    function handleTakePhoto (dataUri) {
        onClick(dataUri);
    }

    return (
        <div>
        <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
        </div>
    )
}
