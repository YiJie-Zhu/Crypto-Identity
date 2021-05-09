import React from 'react'
import Button from '@material-ui/core/Button'

export default function WebCamButton({onClick}) {
    return (
        <Button
                variant="contained"
                component="label"
                onClick = {() => onClick()}
                >
                Webcam
        </Button>
    )
}
