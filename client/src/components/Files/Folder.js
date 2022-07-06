import React from 'react'
import {MdFolder} from 'react-icons/lib/md';
import './Folder.css'
import axios from 'axios';

export default function File(props) {

    const folderName = props.foldername.substring(props.currentFolder.length, props.foldername.length-1);

    const handleClick = async(event) =>{
        if (event.detail < 2)
            return; //TODO - Highlight folder / Other actions
        if (event.detail >= 2)
            props.folderClicked(props.foldername);
    }

    return (
        <div className='folder' onClick={handleClick}>
            <MdFolder size={70}></MdFolder>
            <br/>
            <pre>{folderName}</pre>
        </div>
    )
}
