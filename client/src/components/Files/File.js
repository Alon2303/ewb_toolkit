import React from 'react'
import {IoDocument} from 'react-icons/lib/io';
import './File.css'
import axios from 'axios';


const LINE_LEN = 9;
export default function File(props) {

    const selected = props.selected;

    const getName = (name) => {
        // console.log(name);
        if (name.length <=LINE_LEN){
            return name;
        }
        else if (name.length > LINE_LEN && name.length < 25 ){
            return name.substring(0,LINE_LEN)+'...\n'+name.substring(name.length-(name.length-LINE_LEN));
        } 
        else{
            return name.substring(0,LINE_LEN)+'...\n'+name.substring(name.length-LINE_LEN);
        } 
    }

    const shortName = props.filename ? getName(props.filename.substring(props.currentFolder.length)) : '' ;
    const handleClick = async(event) =>{
        if (event.detail >= 2){
            console.log(props.filename);    
            var url = await axios.get(`http://localhost:3501/${props.filename.replaceAll('/','%2F')}`);
            console.log(url.data);
            props.resetSelection(props.filename);

            const ref = window.URL.createObjectURL(new Blob([url.data]));
            const link = document.createElement('a');
            link.href = ref;
            link.setAttribute('download', props.filename.substring(props.currentFolder.length));
            document.body.appendChild(link);
            link.click();

            return;    
        }
        else if (event.detail == 1){
            props.selectFile(props.filename, event.ctrlKey);
            return;
        }
    }

    const openContextMenu = event => {
        event.preventDefault();
        console.log('context');
    }

    return (
        <div className={`file${selected ? ' selected' : ''}`} onClick={handleClick} onContextMenu={openContextMenu}>
            <IoDocument size={60}></IoDocument>
            <br/>
            <pre>{shortName}</pre>
        </div>
    )
}
