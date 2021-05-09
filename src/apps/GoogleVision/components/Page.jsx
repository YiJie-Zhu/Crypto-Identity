import React, { useState, useEffect } from 'react'
import WebCam from './WebCam'
import WebCamButton from './WebCamButton'
import ImageSelector from './ImageSelector'
import '../styles/Page.css'

const Page = ({emotion}) => {
    const [useWebcam, setUseWebcam] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState();

    useEffect(() => {
        console.log(image);
    }, [image])

    const handleClick = () => {
        setUseWebcam(true);
    }

    const handleImageSelector = (event) => {
		setImage(event.target.files[0]);
		setImageSelected(true);
	};

    const handleWebcamPhoto = (dataUri) => {
        setImage(dataUri);
        setImageSelected(true);
    }

    return (
        <div className = "PageContainer">
            {!imageSelected && (
                <div>
                <h1>Please make this face!</h1>
                <h2>{emotion}</h2>
                {!useWebcam && (
                    <div>
                        <WebCamButton onClick = {handleClick}/>
                        <ImageSelector onChange = {handleImageSelector}/>  
                    </div>
                )}
                {useWebcam && (
                    <WebCam onClick = {handleWebcamPhoto}></WebCam>
                )}
            </div>
            )}
            {imageSelected && image && (
                <div>
                    
                </div>
            )}
        </div>
    )
}

export default Page;
