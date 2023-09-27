import React, { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import './File.css';
import { fileIcons } from './fileIcons';

import ContextMenu from './ContextMenu';

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


function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

export default function File(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 1,
    });
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [fileContextMenuVisible, setFileContextMenuVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const contextMenuRef = useRef(null); // Ref for the context menu

    const CLOSE_THRESHOLD = 7000; // Adjust as needed


    // Define a ref to hold the timeout ID
    const contextMenuTimeoutRef = useRef(null);

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

        } catch (error) {
            console.log('Error occurred while downloading:', error);
        }
    };

    const handleDelete = async (event, filename) => {
        event.stopPropagation(); // Prevent the click event from triggering a preview
        const fullPath = `${props.fullPath}/${filename}`; // Create the full path of the file

        // Send a request to delete the file using axios or any other method you're using
        try {
            await axios.post(`http://localhost:3501/delete`, [fullPath]);
            console.log('File deleted successfully');
            await props.getFilesList(props.fullPath); // Refresh the file list in the current folder after deletion
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };


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

    //     event.preventDefault();
    //     props.onContextMenu(event, filename);

    //     // Clear any existing timeout
    //     if (contextMenuTimeoutRef.current !== null) {
    //         clearTimeout(contextMenuTimeoutRef.current);
    //         console.log('Cleared existing timeout:', contextMenuTimeoutRef.current);
    //     }

    //     setContextMenuVisible(false);
    //     props.setAnyContextMenuOpen(false); // Close the context menu and update the state

    //     // Set the context menu as visible and update its position
    //     setContextMenuPosition({ x: event.clientX, y: event.clientY });
    //     setContextMenuVisible(true);

    //     // Insert 'this' context menu into the global state
    //     props.setContextMenuRef(contextMenuRef);

    //     // Set a timeout to automatically close the context menu after 3 seconds
    //     contextMenuTimeoutRef.current = setTimeout(() => {
    //         setContextMenuVisible(false);
    //         props.setAnyContextMenuOpen(false); // Also update anyContextMenuOpen state here
    //     }, 3000); // Adjust the timeout duration as needed

    //     console.log('Setting timeout:', contextMenuTimeoutRef.current);
    // };

    const handleContextMenu = (event, filename) => {
        event.preventDefault();
        props.onContextMenu(event, filename);

        // TODO: FIX THIS
        // Close the currently open context menu (if any)
        // if (contextMenuTimeoutRef.current !== null) {
        //     clearTimeout(contextMenuTimeoutRef.current);
        // }
        
        setContextMenuVisible(false);
        props.setAnyContextMenuOpen(false); // Close the context menu and update the state

        // Set the context menu as visible and update its position
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setContextMenuVisible(true);
        

        // Insert 'this' context menu into the global state
        props.setContextMenuRef(contextMenuRef);

        // Set a timeout to automatically close the context menu after X seconds
        const newTimeout = setTimeout(() => {
            setContextMenuVisible(false);
            props.setAnyContextMenuOpen(false);

        }, 3000); // Adjust the timeout duration as needed

        contextMenuTimeoutRef.current = newTimeout;
    };

    const handleClickOutsideContextMenu = () => {
        setContextMenuVisible(false);
        props.setAnyContextMenuOpen(false); // Close the context menu and update the state
    };


    useEffect(() => {
        if (contextMenuVisible) {
            // console.log('Adding event listeners');
            document.body.addEventListener('click', handleClickOutsideContextMenu);
            // document.body.addEventListener('mousemove', handleMouseMove); // Add mousemove event listener
        } else {
            document.body.removeEventListener('click', handleClickOutsideContextMenu);
            // document.body.addEventListener('mousemove', handleMouseMove); // Add mousemove event listener
        }

        return () => {
            document.body.removeEventListener('click', handleClickOutsideContextMenu);
            // document.body.addEventListener('mousemove', handleMouseMove); // Add mousemove event listener

        };
    }, [contextMenuVisible, contextMenuPosition]);

    return (
        <Card
            className={`${classes.root} ${state.raised ? classes.cardHovered : ""}`}
            onMouseOver={() => {
                if (!contextMenuVisible) {
                    setState({ raised: true, shadow: 3 });
                }
            }}
            onMouseOut={() => setState({ raised: false, shadow: 1 })}

            onDoubleClick={handlePreview}
            onContextMenu={(event) => {
                setState({ raised: false, shadow: 1 });
                handleContextMenu(event, props.fileData.name);
            }}

            raised={state.raised}
            zdepth={state.shadow}
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
                    {/* if fileicon exists, use it, otherwise use the default file icon */}
                    
                    {fileIcons[getFileExtension(props.fileData.name)] || fileIcons['else'] }
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
            {contextMenuVisible && props.openContextMenu && (
                <ContextMenu
                    x={contextMenuPosition.x}
                    y={contextMenuPosition.y}
                    // onClose={() => {
                    //     setContextMenuVisible(false);
                    //     props.onCloseContextMenu();
                    //     // props.setAnyContextMenuOpen(false); // Close the context menu and update the state
                    // }}
                    handleDownload={handleDownload} // Pass the handleDownload function
                    handlePreview={handlePreview} // Pass the handlePreview function
                    handleShare={() => { }} // Implement handleShare if needed
                    handleDelete={(event) => handleDelete(event, props.fileData.name)} // Pass the handleDelete function
                    // visible={fileContextMenuVisible}
                    
                    
                />
            )}
        </Card>
    );
}
