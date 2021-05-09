import React from 'react'
import Button from '@material-ui/core/Button'

export default function ImageSelector({onChange}) {
    return (
        <div>
            <Button
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange = {(e)=> onChange(e)}
                />
            </Button>
        </div>
    )
}
