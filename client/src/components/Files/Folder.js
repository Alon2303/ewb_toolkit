import React from 'react'
// import {MdFolder} from 'react-icons/lib/md';
import FolderIcon from '@mui/icons-material/Folder';
import './Folder.css';

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
            <FolderIcon color="primary"/>
            <br/>
            <pre>{folderName}</pre>
        </div>
    )
}
