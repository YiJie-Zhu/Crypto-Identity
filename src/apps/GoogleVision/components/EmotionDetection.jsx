import React, {useEffect, useState} from 'react'
import * as faceapi from 'face-api.js'
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/EmotionDetection.css'
   
toast.configure()

const EmotionDetection = ({image, emotion, emotionMatch}) => {
      const [accurate, setAccurate] = useState();
      const [loading, setLoading] = useState();
      
      useEffect(() => {
        const loadModel = async () => {
          setLoading(true)
          Promise.all([
            faceapi.nets.faceExpressionNet.loadFromUri(process.env.PUBLIC_URL + '/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri(process.env.PUBLIC_URL + '/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri(process.env.PUBLIC_URL + '/models')
          ]).then(startCheck);
        }
        loadModel();
      }, [])

      const startCheck = async () => {
        const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceExpressions();
        if (detections){
          if (detections.expressions.sad > 0.8 && emotion === 'sad'){
            setAccurate(true);
          }else if (detections.expressions.neutral > 0.8 && emotion === 'neutral'){
            setAccurate(true);
          }else if (detections.expressions.happy > 0.8 && emotion === 'happy'){
            setAccurate(true);
          }else if (detections.expressions.surprised > 0.8 && emotion === 'surprised'){
            setAccurate(true);
          }else {
            setAccurate(false);
          }
        }
        else {
          console.log('yo');
          setAccurate(false);
        }
      }
      const notify = (accurate) => {
        if (accurate){
          toast.success('Nice! Your photo matched, please continue.', {
            position: toast.POSITION.TOP_CENTER, autoClose:3000})
        } else {
          toast.error('Sorry, your photo did not match, please try again!', {
            position: toast.POSITION.TOP_CENTER, autoClose:3000})
        }
      }
      useEffect(()=> {
        if (accurate === undefined) {
          return;
        } else if (accurate === false){
          emotionMatch(false);
          notify(false);
        }else if (accurate === true) {
          emotionMatch(true);
          notify(true);
        }
      }, [accurate])

    return (
      <div className = 'center'>
        <div className="loader"></div>
      </div>
    )
}

export default EmotionDetection;