import React from 'react'
import Button from '@material-ui/core/Button'
import '../styles/WebCamButton.css'

export default function WebCamButton({onClick}) {
    return (
        <div className = 'button'>
        <Button
            className = 'webcam'
                variant="contained"
                component="label"
                size = 'large'
                color = 'primary'
                onClick = {() => onClick()}
                >
                Webcam
        </Button>
        </div>
    )
}
