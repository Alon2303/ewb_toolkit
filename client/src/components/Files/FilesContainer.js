import React, { Component } from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import SideBar from "../sidebar/SideBar";
import AppBar from "../appBar/AppBar";
import Button from '@mui/material/Button'; // Import Button component
import Fade from '@mui/material/Fade'; // Import Fade component
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component
import Folder from './Folder';
import File from './File';
import BreadcrumbBar from './BreadcrumbBar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the CloudUpload icon
import FilePreview from './filePreview';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import { resolvePath } from 'react-router-dom';

const ROWSIZE = 10;
const NUM_CHARS_DISPLAY = 19;

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
        };
        this.changeFolder = this.changeFolder.bind(this); // Bind the function
        this.handlePreview = this.handlePreview.bind(this); // Bind the function
        this.handleBreadcrumbClick = this.handleBreadcrumbClick.bind(this);
        this.resetSelection = this.resetSelection.bind(this); // Bind the function


    }

    async componentDidMount() {
        await this.getFilesList('');
    }


    async getFilesList(subdirectory) {
        try {
            const encodedSubdirectoryPath = encodeURIComponent(subdirectory);
            console.log('Encoded subdirectory path:', encodedSubdirectoryPath);
            const response = await axios.get(`http://localhost:3501/list/${encodedSubdirectoryPath}`);
            const data = response.data;
            // console.log('Data:', data);
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
                    allContent: [...data.files, ...data.folders], // Combine files and folders
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
        const { allContent, currentFolder, filesDict } = this.state;

        const itemsInCurrentFolder = allContent.filter(item => {
            const itemName = item.substring(currentFolder.length); // Remove the folder path prefix
            return itemName.startsWith('/') ? false : true; // Exclude items with subdirectories
        });

        const combinedItemsArray = this.createTableArray(itemsInCurrentFolder);

        const itemsArray = combinedItemsArray.map((row) => {
            return row.map((item) => {
                const { name, type } = filesDict[item];
                const truncatedName = name.length > NUM_CHARS_DISPLAY ? name.substring(0, NUM_CHARS_DISPLAY) : name;
                return {
                    shortName: truncatedName,
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

    // async downloadFiles() {
    //     const { filesDict } = this.state;
    //     const selectedFiles = Object.keys(filesDict).filter(
    //         (key) => filesDict[key].selected
    //     );
    //     const zipName = await axios.post(
    //         `http://localhost:3501/download`,
    //         selectedFiles
    //     );
    //     const url = await axios.get(
    //         `http://localhost:3501/${zipName.data.replaceAll('/', '%2F')}`
    //     );
    //     // Download the zip file
    //     window.open(url.data);
    // }

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


    handleUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const reader = new FileReader();

                reader.onload = async (event) => {
                    const formData = new FormData();
                    const encodedFileName = encodeURIComponent(file.name);
                    const path = this.state.currentPath.join('/');
                    console.log('encodedFileName:', encodedFileName);

                    formData.append('file', file, encodedFileName);
                    formData.append('path', this.state.currentFolder);

                    console.log('path:', path);
                    console.log('currentFolder:', this.state.currentFolder);
                    try {
                        const response = await axios.post(
                            `http://localhost:3501/upload/${path}`,
                            formData
                        );

                        if (response.data.message === 'File already exists') {
                            // Handle overwrite here
                            const overwriteConfirmed = window.confirm(
                                `The file "${file.name}" already exists. Do you want to overwrite it?`
                            );

                            if (overwriteConfirmed) {
                                // Overwrite the file
                                const overwriteResponse = await axios.post(
                                    `http://localhost:3501/upload/${this.state.currentPath}?overwrite=true`,
                                    formData
                                );
                                console.log('Overwrite response:', overwriteResponse.data);
                            }
                        } else {
                            console.log('Upload response:', response.data);
                        }
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }

                    // Perform any necessary updates after successful upload
                    await this.getFilesList(this.state.currentPath.join('/'));
                    // Refresh the file list
                };

                reader.readAsArrayBuffer(file);
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
            newFileName,
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
                                                        currentFolder={this.state.currentFolder}
                                                        fullPath={this.state.currentPath.join('/')}
                                                        resetSelection={this.resetSelection}
                                                        getFilesList={() =>
                                                            this.getFilesList(
                                                                this.state.currentPath.join('/')
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </Grid>
                                ))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <input
                    accept="/*"
                    id="upload-file-button"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.handleUpload}
                    name="file"
                />
                <label htmlFor="upload-file-button">
                    <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                </label>
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

}