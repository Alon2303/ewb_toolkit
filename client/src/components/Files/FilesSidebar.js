import React from 'react'
import './FilesSidebar.css'
import {MdFileDownload, MdDeleteForever, MdFileUpload} from 'react-icons/md'
import Grid from "@mui/material/Grid";

export default function FilesSidebar(props) {
    const {show, files} = props;

    const selectedFiles = ()=> {
        var selected = []
        Object.entries(files).map(([key, val]) => {
            if (val.selected)
                selected.push(key);
        })
        return selected
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
        >
        <>
        <Grid item xs={12}>
        <div className='files-sidebar'>
            {/* download button */}
            {show ? <>
                <button className='download-button'
                    onClick={(e)=>props.downloadFiles(e, selectedFiles())}
                    ><MdFileDownload></MdFileDownload> Download
                </button>
                <button className='delete-button'
                    onClick={(e)=>props.deleteFiles(e, selectedFiles())}
                    ><MdDeleteForever></MdDeleteForever> Delete
                </button>
                
                {selectedFiles().map(filename => { var name = filename.substring(props.currentFolder.length); return <h4 key={`${name}_li`}>{name}</h4>} )} 
                </>
                :
                // Upload button
                <button className='upload-button'
                    onClick={props.uploadClick}
                    ><MdFileUpload></MdFileUpload> Upload
                </button>
                
            }
            {props.children}
        </div>
        </Grid>
        </>
        </Grid>
    )
}
