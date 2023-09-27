import './FilesContainer.css';

import React, { Component } from 'react';

import axios from 'axios';
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import SideBar from "../sidebar/SideBar";
import AppBar from "../appBar/AppBar";
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component
import Folder from './Folder';
import File from './File';
import BreadcrumbBar from './BreadcrumbBar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the CloudUpload icon
import IconButton from '@mui/material/IconButton';

import FilePreview from './filePreview';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

const ROWSIZE = 10;
const NUM_CHARS_DISPLAY = 19;



function getFileExtension(filename) {
    try {
        return filename.split('.').pop().toLowerCase();
    }
    catch (err) {
        return '';
    }
}



function getShortName(name, maxLength) {
    if (name.length <= maxLength) {
        return name;
    } else {

        const fileExtension = getFileExtension(name);
        const nameWithoutExt = name.substr(0, name.length - fileExtension.length - 1);
        const charsToShow = maxLength - fileExtension.length - 3; // 3 for '...'
        const frontChars = Math.ceil(charsToShow / 2);
        const backChars = Math.floor(charsToShow / 2);

        const frontPart = nameWithoutExt.substr(0, frontChars);
        const backPart = nameWithoutExt.substr(name.length - backChars);
        return `${frontPart}...${backPart}.${fileExtension}`;
    }
}



export default class FilesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFolder: '',
            itemsArray: [],
            loading: false,
            filesDict: {},
            selectedCount: 0,
            previewOpen: false,
            previewContent: null,
            previewFilename: '',
            currentPath: [],
            allContent: [],
            anyContextMenuOpen: false,
            contextMenuOpen: false,
            ContextMenuRef: null,
        };

        // Define a function to set the context menu ref
        this.setContextMenuRef = (ref) => {
            this.setState({ ContextMenuRef: ref });
        };

        //Define a function to get the context menu ref
        this.getContextMenuRef = () => {
            return this.state.ContextMenuRef;
        };

        this.changeFolder = this.changeFolder.bind(this); // Bind the function
        this.handlePreview = this.handlePreview.bind(this); // Bind the function
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
        this.resetSelection = this.resetSelection.bind(this); // Bind the function
    }

    async componentDidMount() {
        await this.getFilesList('');
        window.addEventListener("resize", this.handleWindowSizeChange);

    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        const newDynamicRowSize = this.calculateDynamicRowSize();
        console.log('New dynamic row size:', newDynamicRowSize, 'Old dynamic row size:', this.state.dynamicRowSize);
        this.setState({ dynamicRowSize: newDynamicRowSize });
    };

    setOpenContextMenu = (filename) => {
        this.setState({ openContextMenu: filename });
    };

    calculateDynamicRowSize = () => {
        const screenWidth = window.innerWidth;
        // You can adjust the breakpoints and corresponding row sizes as needed
        if (screenWidth < 500) {
            return 1;
        } else if (screenWidth < 765) {
            return 2;
        } else if (screenWidth < 1018) {
            return 3;
        } else if (screenWidth < 1280) {
            return 4;
        } else if (screenWidth < 1400) {
            return 5;
        } else if (screenWidth < 1920) {
            return 6;
        } else {
            return 7;
        }
    };

    async getFilesList(subdirectory) {
        try {
            const encodedSubdirectoryPath = encodeURIComponent(subdirectory);
            // console.log('Encoded subdirectory path:', encodedSubdirectoryPath);
            const response = await axios.get(`http://localhost:3501/list/${encodedSubdirectoryPath}`);
            const data = response.data;
            const filesDict = {};
            // Set type property for files
            data.files.forEach((filename) => {
                filesDict[filename] = { name: filename, selected: false, type: 'file' };
            });
            // Set type property for folders
            data.folders.forEach((folderName) => {
                filesDict[folderName] = { name: folderName, selected: false, type: 'folder' };
            });

            this.setState(
                {
                    allContent: [...data.folders, ...data.files], // Combine files and folders
                    filesDict,
                },
                () => {
                    this.mapItems();
                }
            );
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
        }
    }

    async changeFolder(folderName) {
        console.log('changeFolder:', folderName);
        await this.setState({ currentFolder: folderName, currentPath: [...this.state.currentPath, folderName] });
        this.getFilesList(this.state.currentPath.join('/'));
        // Other logic    
    }

    handleOverwriteDialogOpen = () => {
        this.setState({ overwriteDialogOpen: true });
    };

    handleOverwriteDialogClose = () => {
        this.setState({ overwriteDialogOpen: false });
    };

    handleNewFileNameDialogOpen = () => {
        this.setState({ newFileNameDialogOpen: true });
    };

    handleNewFileNameDialogClose = () => {
        this.setState({ newFileNameDialogOpen: false });
    };

    handleNewFileNameChange = (event) => {
        this.setState({ newFileName: event.target.value });
    };

    handleOverwriteConfirm = () => {
        // Perform the necessary action, e.g., overwrite the file
        this.handleOverwriteDialogClose();
    };

    handleRenameConfirm = () => {
        // Perform the necessary action, e.g., update the file name
        this.handleNewFileNameDialogClose();
    };

    mapItems() {
        const { allContent, currentFolder, filesDict, dynamicRowSize } = this.state;

        const itemsInCurrentFolder = allContent.filter(item => {
            const itemName = item.substring(currentFolder.length); // Remove the folder path prefix
            return itemName.startsWith('/') ? false : true; // Exclude items with subdirectories
        });

        const combinedItemsArray = this.createTableArray(itemsInCurrentFolder, dynamicRowSize);

        const itemsArray = combinedItemsArray.map((row) => {
            return row.map((item) => {
                const { name, type } = filesDict[item];
                return {
                    shortName: getShortName(name, NUM_CHARS_DISPLAY),
                    name: name,
                    type: type === 'file' ? 'file' : 'folder'
                };
            });
        });

        this.setState({
            itemsArray
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentFolder !== this.state.currentFolder) {
            this.mapItems();
            this.resetSelection();
        }
    }

    createTableArray(array, rowSize = ROWSIZE) {
        const split = [];
        const newArr = [...array];
        while (newArr.length) {
            split.push(newArr.splice(0, rowSize));
        }
        return split;
    }
    closeOpenContextMenu = () => {
        console.log('closeOpenContextMenu1');
        this.setState({ anyContextMenuOpen: false });
    };

    handleFolderDoubleClick = async (event, name) => {
        event.stopPropagation();
        console.log('handleFolderDoubleClick:', name);
        const { filesDict } = this.state;

        const selectedItem = filesDict[name];
        // it is supposed to be a folder but just in case
        if (selectedItem.type === 'file') {
            // If it's a file, handle the preview

            console.log('Previewing file: handleFolderDC', name);
            // this.handlePreview(event, name);
        } else if (selectedItem.type === 'folder') {
            // If it's a folder, enter the folder
            console.log('Navigating to folder:', name);
            await this.changeFolder(name);
            console.log('Current folder after navigation:', this.state.currentFolder);
            // this.getFilesList(this.state.currentFolder);
        }
    };

    handleBreadcrumbClick = (index) => {
        const newPath = index.slice(); // Create a shallow copy of the array
        const newCurrentFolder = newPath[newPath.length - 1] || '';
        console.log('New current folder:', newCurrentFolder);
        console.log('New path:', newPath);

        // Construct the full path by joining the newPath array with '/'
        const fullNewPath = newPath.join('/');
        this.setState(
            {
                currentFolder: newCurrentFolder,
                currentPath: newPath,
            },
            () => this.getFilesList(fullNewPath) // Update the folder listing
        );
    };

    resetSelection = () => {
        const { filesDict } = this.state;
        const updatedFilesDict = { ...filesDict }; // Create a copy of the object
        Object.keys(updatedFilesDict).forEach((key) => {
            updatedFilesDict[key].selected = false;
        });
        this.setState({ filesDict: updatedFilesDict, selectedCount: 0 });
    };

    selectFile(filename) {
        const { filesDict } = this.state;
        filesDict[filename].selected = !filesDict[filename].selected;
        this.setState({
            filesDict,
            selectedCount: filesDict[filename].selected
                ? this.state.selectedCount + 1
                : this.state.selectedCount - 1
        });
    }

    async deleteFiles() {
        const { filesDict } = this.state;
        const selectedFiles = Object.keys(filesDict).filter(
            (key) => filesDict[key].selected
        );
        await axios.post(`http://localhost:3501/delete`, selectedFiles);
        await this.getFilesList();
    }

    handlePreview = async (event, path, filename) => {
        console.log('handlePreview called');
        console.log('filename:', filename);
        event.stopPropagation();

        let url;

        // Construct the URL for the preview route
        if (path === undefined || path === null || path === '') {
            url = `http://localhost:3501/content/${encodeURIComponent(filename)}`;
        } else {
            url = `http://localhost:3501/content/${path}/${encodeURIComponent(filename)}`;
        }


        console.log('url:', url);
        try {
            const response = await axios.get(url, { responseType: 'blob' }); // Set responseType to 'blob'
            const blob = response.data;

            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                const base64Content = event.target.result;
                // console.log('Base64 Content:', base64Content);

                this.setState({
                    previewOpen: true,
                    previewFilename: filename,
                    previewContent: base64Content,
                });
            };

            fileReader.readAsDataURL(blob); // Convert the Blob to base64

        } catch (error) {
            console.log('Error occurred while fetching file for preview:', error);
        }
    };

    handleClosePreview = () => {
        this.setState({
            previewOpen: false,
            previewContent: null
        });
    };

    handleOpenContextMenu = (event, filename) => {
        event.preventDefault();
        // console.log('handleOpenContextMenu called');
        if (!this.state.openContextMenu) {
            console.log('Opening context menu');
            const { clientX, clientY } = event;
            const newContextMenu = { x: clientX, y: clientY, filename };

            this.setState({
                openContextMenu: newContextMenu,
            });
        }
    };

    handleCloseContextMenu = () => {
        this.setState({
            openContextMenu: null,
        });
    };

    handleUpload = async (event) => {
        const files = event.target.files;
    
        if (files.length > 0) {
            try {
                for (const file of files) {
                    const formData = new FormData();
                    const encodedFileName = encodeURIComponent(file.name);
    
                    formData.append('file', file, encodedFileName);
                    formData.append('path', this.state.currentFolder);
    
                    try {
                        const response = await axios.post(
                            `http://localhost:3501/upload/${this.state.currentPath.join('/')}`,
                            formData
                        );
    
                        if (response.data.message === 'File already exists') {
                            const overwriteConfirmed = window.confirm(
                                `The file "${file.name}" already exists. Do you want to overwrite it?`
                            );
    
                            if (overwriteConfirmed) {
                                await axios.post(
                                    `http://localhost:3501/upload/${this.state.currentPath.join('/')}?overwrite=true`,
                                    formData
                                );
                            }
                        } else {
                            console.log('Upload response:', response.data);
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                }
    
                // Perform any necessary updates after successful upload
                await this.getFilesList(this.state.currentPath.join('/'));
                // Refresh the file list
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    render() {
        const {
            currentPath,
            itemsArray,
            loading,
            previewOpen,
            previewContent,
            previewFilename,
            overwriteDialogOpen,
            newFileNameDialogOpen,
            anyContextMenuOpen,
            // openContextMenu,
        } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <AppBar />
                <Grid container>
                    <Grid item xs={2}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={10}>
                        <div
                            className={`files-container${loading ? ' darken' : ''}`}
                            onClick={this.resetSelection}
                        >
                            {/* BreadcrumbBar */}
                            <BreadcrumbBar
                                currentPath={currentPath}
                                handleBreadcrumbClick={this.handleBreadcrumbClick}
                            />
                            <Fade
                                className="fade-box"
                                in={loading}
                                style={{ transitionDelay: loading ? '100ms' : '0ms' }}
                                unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>

                            <div className="row-container">
                                {itemsArray.map((row, rowIndex) => (
                                    <Grid container direction="row" key={`row_${rowIndex}`}>
                                        {row.map((item) => (
                                            <div
                                                key={item.name}
                                                className="item-wrapper"
                                                title={item.name}
                                            >
                                                {item.type === 'folder' ? (
                                                    <Folder
                                                        folderData={item}
                                                        foldername={item.shortName}
                                                        currentFolder={this.state.currentFolder}
                                                        onSelect={this.handleSelect}
                                                        onDoubleClick={this.handleFolderDoubleClick}
                                                        folderClicked={this.changeFolder}
                                                    />
                                                ) : (
                                                    <File
                                                        fileData={item}
                                                        filename={item.shortName}
                                                        fullName={item.name}
                                                        onSelect={this.handleSelect}
                                                        onDoubleClick={(event) =>
                                                            this.handlePreview(event, this.state.currentPath.join('/'), item.name)
                                                        }
                                                        onPreview={(event) =>
                                                            this.handlePreview(event, this.state.currentPath.join('/'), item.name)
                                                        }
                                                        setContextMenuRef={this.setContextMenuRef}
                                                        ContextMenuRef={this.getContextMenuRef}
                                                        currentFolder={this.state.currentFolder}
                                                        fullPath={this.state.currentPath.join('/')}
                                                        resetSelection={this.resetSelection}
                                                        getFilesList={() =>
                                                            this.getFilesList(
                                                                this.state.currentPath.join('/')
                                                            )
                                                        }
                                                        anyContextMenuOpen={anyContextMenuOpen}
                                                        setAnyContextMenuOpen={this.setAnyContextMenuOpen}
                                                        // openContextMenu={openContextMenu}
                                                        // setOpenContextMenu={this.setOpenContextMenu}

                                                        closeOpenContextMenu={this.closeOpenContextMenu}
                                                        onContextMenu={(event, filename) => this.handleOpenContextMenu(event, filename)}
                                                        onCloseContextMenu={this.handleCloseContextMenu}
                                                        openContextMenu={this.state.openContextMenu}

                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </Grid>
                                ))}
                                <input
                                    accept="/*"
                                    id="upload-file-button"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={this.handleUpload}
                                    name="file"
                                />
                                <div className="upload-button-container"> {/* Add the circular background */}
                                    <IconButton
                                        component="label"
                                        htmlFor="upload-file-button"
                                        color="primary"
                                        aria-label="Upload File"
                                        className="custom-upload-button"
                                    >
                                        <CloudUploadIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Dialog
                    open={previewOpen}
                    onClose={this.handleClosePreview}
                    aria-labelledby="preview-dialog-title"
                    aria-describedby="preview-dialog-description"
                >
                    <DialogTitle id="preview-dialog-title">Preview</DialogTitle>
                    <DialogContent>
                        {previewOpen && previewContent && (
                            <FilePreview fileContent={previewContent} filename={previewFilename} />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePreview} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Overwrite dialog */}
                <Dialog open={overwriteDialogOpen} onClose={this.handleOverwriteDialogClose}>
                    {/* ... Your overwrite dialog content ... */}
                </Dialog>

                {/* New file name dialog */}
                <Dialog open={newFileNameDialogOpen} onClose={this.handleNewFileNameDialogClose}>
                    {/* ... Your new file name dialog content ... */}
                </Dialog>
            </ThemeProvider>
        );
    }
    setAnyContextMenuOpen = (isOpen) => {
        this.setState({ anyContextMenuOpen: isOpen });
    }
}