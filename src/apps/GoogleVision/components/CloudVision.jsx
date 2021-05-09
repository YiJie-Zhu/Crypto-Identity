import React from 'react'
import axios from 'axios'

const CloudVision = ({image}) => {

    const takenImage = {
        "requests":[
          {
            "image":{
              "content":{image}
            },
            "features":[
              {
                "type":"FACE_DETECTION",
                "maxResults":10
              }
            ]
          }
        ]
      };

    

    
    return (
        <div>
            
        </div>
    )
}

export default CloudVision;