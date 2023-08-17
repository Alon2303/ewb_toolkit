import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import './File.css';
import { fileIcons } from './fileIcons';

import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import ShareButton from './shareButton';

import DownloadIcon from '@mui/icons-material/CloudDownload';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out"
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    }
});

const LINE_LEN = 9;



function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

export default function File(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState(null);


    const getName = (name) => {
        // console.log(name);
        if (name.length <= LINE_LEN) {
            return name;
        }
        else if (name.length > LINE_LEN && name.length < 25) {
            return name.substring(0, LINE_LEN) + '...\n' + name.substring(name.length - (name.length - LINE_LEN));
        }
        else {
            return name.substring(0, LINE_LEN) + '...\n' + name.substring(name.length - LINE_LEN);
        }
    }

    const shortName = props.filename;



    
    const [downloadUrl, setDownloadUrl] = useState('');

    const generateDownloadUrl = () => {
        // Generate the download URL here based on your logic
        let generatedDownloadUrl = '';


        if (props.currentFolder !== undefined && props.currentFolder !== null && props.currentFolder !== '') {
            const subdirectory = encodeURIComponent(props.fullPath);
            const filename = encodeURIComponent(props.fileData.name);
            // console.log('subdirectory ', subdirectory);
            generatedDownloadUrl = `http://localhost:3501/download/${subdirectory}/${filename}`;
        } else {
            // console.log('props ', props);
            const filename = encodeURIComponent(props.fileData.name);
            generatedDownloadUrl = `http://localhost:3501/download/${filename}`;
        }
        return generatedDownloadUrl;
    };


    const handleDownload = async () => {
        // Download the file
        
        try {
            let downloadUrl;

            if (props.currentFolder !== undefined && props.currentFolder !== null && props.currentFolder !== '') {
                const subdirectory = encodeURIComponent(props.fullPath);
                console.log('subdirectory ', subdirectory);
                console.log('name ', props);
                const filename = encodeURIComponent(props.fileData.name);
                downloadUrl = `http://localhost:3501/download/${subdirectory}/${filename}`;
            } else {
                // console.log('props ', props);
                const filename = encodeURIComponent(props.fileData.name);
                downloadUrl = `http://localhost:3501/download/${filename}`;
            }

            console.log('Download URL:', downloadUrl);

            const response = await axios.get(downloadUrl, {
                responseType: 'arraybuffer',
            });
            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a link element to initiate the download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = props.fileData.name;
            link.click();

            // Clean up
            window.URL.revokeObjectURL(blobUrl);

            props.resetSelection(props.fileData.name);
            setDownloadUrl(downloadUrl);
            // console.log('File downloaded successfully', downloadUrl);

        } catch (error) {
            console.log('Error occurred while downloading:', error);
        }
    };

    const handleDelete = async (event, filename) => {
        event.stopPropagation(); // Prevent the click event from triggering a preview
        console.log('delete');

        const fullPath = `${props.fullPath}/${filename}`; // Create the full path of the file
        console.log('full path', fullPath, props.currentFolder);
        // Send a request to delete the file using axios or any other method you're using
        try {
            await axios.post(`http://localhost:3501/delete`, [fullPath]);
            console.log('File deleted successfully');
            console.log('current folder', props.fullPath);
            await props.getFilesList(props.fullPath); // Refresh the file list in the current folder after deletion
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        if (state.raised) {
            setIsChecked(!isChecked);
        }
    };
    const handlePreview = (event) => {
        if (props.onPreview) {
            props.onPreview(event, props.filename); // Pass the filename to the onPreview function
        }
    };

    const openContextMenu = event => {
        event.preventDefault();
        console.log('context');
    }
    return (
        <Card
            className={`${classes.root} ${state.raised ? classes.cardHovered : ""}`}
            onMouseOver={() => setState({ raised: true, shadow: 3 })}
            onMouseOut={() => setState({ raised: false, shadow: 1 })}
            onDoubleClick={handlePreview}
            raised={state.raised}
            zdepth={state.shadow}
            // onDoubleClick={handleClick}
            style={{ width: "200px", height: "180px", margin: "6px" }}
        >
            <CardContent>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Checkbox
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 1,
                            color: "#bdbdbd",
                            opacity: state.raised ? 1 : 0, // Set opacity based on hover state
                            transition: "opacity 0.3s ease-in-out",
                        }}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        onDoubleClick={handlePreview}
                    />

                    {fileIcons[getFileExtension(props.fileData.name)]}
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        {props.filename}
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <IconButton onClick={handleDownload}>
                        <DownloadIcon />
                    </IconButton>
                    <ShareButton fileName={props.fileData.name} downloadUrl={generateDownloadUrl()} />
                    <IconButton onClick={event => handleDelete(event, props.fileData.name)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}