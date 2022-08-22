import React, { Component } from 'react'
import File from './File';
import './FilesContainer.css'
import Folder from './Folder'
import axios from 'axios'
import {FaLevelUp} from 'react-icons/lib/fa'
import FilesSidebar from './FilesSidebar';
import { CircularProgress, Fade } from '@mui/material';

const ROWSIZE = 4;

var updateLoop;

export default class FilesContainer extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            allContent : [],
            files : [],
            folders : [],
            filesArray : [],
            foldersArray : [],
            currentFolder :'',
            filesDict : {},
            selectedCount : 0,
            loading : false,
            // updateLoop : setInterval(()=>this.getFilesList(), 20*1000) //Update files list every 20 seconds - APP UPDATES AUTOMATICALLY -> CREATES MORE API CALLS = $$$
        }
        window.addEventListener('onselectionchange', (event) => {
            event.preventDefault();
        });
        this.inputRef = React.createRef();
    }

    

    async componentDidMount(){
        await this.getFilesList(); 
    }

    async getFilesList() {
        const fileNames = await axios.get(`http://localhost:3501/`);
        // console.log(fileNames.data);
        const allContent = fileNames.data;
        if (allContent) {
            var filesDict = {};
            allContent.map(filename => filesDict[filename] = { filename, selected: false });
            await this.setState(prevState => { return { ...prevState, allContent, filesDict }; });
            await this.mapItems();
        }
    }

     async mapItems(){
        var files = [];
        var folders = [];
        const folderLevel = this.state.currentFolder.split("/").length - 1;
        for (var i = 0; i< this.state.allContent.length; i++){
            var item = this.state.allContent[i];
            var itemLevel = item.split("/").length - 1;
            if (itemLevel < folderLevel || !item.includes(this.state.currentFolder) || item == this.state.currentFolder)
                continue;
            if (itemLevel <= folderLevel && item[item.length-1] != '/'){
                files.push(item);
            }
            if (itemLevel <= folderLevel + 1 && item[item.length-1] == '/' ){
                folders.push(item);
            }
        }
        const filesArray = this.createTableArray(files);
        const foldersArray = this.createTableArray(folders);
        await this.setState(prevState => {return {...prevState, files, folders, filesArray, foldersArray}});
    }

    createTableArray(array, rowSize=ROWSIZE){
        var split = [];
        const newArr = [...array]
        while(newArr.length) {
            split.push(newArr.splice(0,rowSize));
        }
        return split;
    }

    // async refreshFiles(){
    //     await this.getFilesList();
    // }

    async changeFolder(folderName){
        console.log('change folder ', folderName)
        const currentFolder = folderName;
        await this.setState({currentFolder})
        await this.mapItems();
        await this.resetSelection();
    }

    async resetSelection(ignoredFile=''){
        const filesDict = {...this.state.filesDict};
        var found = false;
        Object.entries(filesDict).map(([key, val])=> {
            if (key == ignoredFile){
                found = true;
                filesDict[key].selected = true;
                return;
            }
            filesDict[key].selected = false;
        });
        await this.setState({filesDict, selectedCount: found ? 1 : 0});
    }

    getShortFolderName(){
        var tree = this.state.currentFolder.split('/');
        var shortName =  this.state.currentFolder != '' ? tree[tree.length-2] : 'EWB' ;
        return shortName;
    }

    async levelUp(event){
        // if (event.detail >= 2 && this.state.currentFolder != ''){
        if (this.state.currentFolder != ''){
            var currentFolder = this.state.currentFolder;
            currentFolder = currentFolder.substring(0, currentFolder.length-1);
            var parentFolder = currentFolder.substring(0, currentFolder.lastIndexOf('/'));
            parentFolder = parentFolder == '' ? parentFolder : parentFolder+'/'
            console.log(parentFolder);
            await this.changeFolder(parentFolder);
        }
    }

    selectFile(filename, multiselect=false){
        const dict = this.state.filesDict;
        if (!dict[filename].selected)
            this.setState({selectedCount: this.state.selectedCount + 1})
        else
            this.setState({selectedCount: this.state.selectedCount - 1})
        
        if (!multiselect){
            if (this.state.selectedCount == 0 )
                dict[filename].selected = !dict[filename].selected;   
            else
                this.resetSelection(filename);
        }
        else{
            if (!(dict[filename].selected && this.state.selectedCount > 0 ))
                dict[filename].selected = !dict[filename].selected;
            else
                dict[filename].selected = false;
        }
        this.setState(prevState => {return {...prevState, filesDict : dict}});
        
    }

    downloadFiles = (event, filesList) => {
        console.log(filesList);
        filesList.map(async file => await this.handleFileClick(event, file, true));
    } 
    
    deleteFiles = async (event, filesList) => {
        this.setState({loading:true})
        filesList.map(async filename => {
            console.log('delete', filename);
            await axios.delete(`http://localhost:3501/${filename.replaceAll('/','%2F')}`);
        });
        this.resetSelection();
        setTimeout(async ()=>{
            await this.getFilesList(); 
            this.setState({loading:false}) 
        }, 1000);
    } 

    openFileDialog = () => {
        // console.log('upload click');
        this.inputRef.current.click();
    }

    handleFileChange = async event => {
        const fileObj = [...event.target.files];
        if (!fileObj) {
          return;
        }
        let filesDictionary = Object.assign({}, ...fileObj.map((x) => ({[this.state.currentFolder+x.name]: x})));
        console.log(filesDictionary);

        var fileKeys = fileObj.map(file => this.state.currentFolder+file.name);
        console.log(fileKeys);

        var urlsDictionary = (await axios.post(`http://localhost:3501/`, {fileKeys})).data;
        console.log(urlsDictionary);
        for(var key of fileKeys){
            this.uploadFile(key, urlsDictionary[key], filesDictionary[key])
        }
    };

    uploadFile = async(key, url, file) => {
        console.log(key, url, file);
        var response = await axios.put(url, {file});
        console.log(response);
    }
    
    

    handleFileClick = async(event, filename, force=false) =>{
        event.stopPropagation();
        if (force || event.detail >= 2){
            console.log(filename);    
            var url = await axios.get(`http://localhost:3501/${filename.replaceAll('/','%2F')}`);
            console.log(url.data)
            var response = await axios.get(url.data);
            fetch(
                url.data
              ).then((response) => {
                response.blob().then((blob) => {
                  let url = window.URL.createObjectURL(blob);
                  window.open(url);
                //   let a = document.createElement("a");
                //   a.href = url;
                //   a.download = filename.substring(this.state.currentFolder.length);
                //   a.click();
                });
            });
        }
        else if (event.detail == 1){
            console.log("file click");    
            this.selectFile(filename, event.ctrlKey);
        }
    }

    bgcolor = () => {return this.state.loading? '#b9b9b9' : 'white'}

    render() {
        return (
            <>
            <div className={`files-container${this.state.loading ? ' darken': ''}`}
            onClick={()=>this.resetSelection()} 
            // style={{backgroundColor:this.bgcolor()}}
            >
                <h2>
                    {this.state.currentFolder != '' && <FaLevelUp className='up-arrow' onClick={(e)=>this.levelUp(e)}></FaLevelUp>}
                    {this.getShortFolderName()}
                </h2>
                <Fade className='fade-box'
                    in={this.state.loading}
                    style={{
                        transitionDelay: this.state.loading ? '100ms' : '0ms',
                    }}
                    unmountOnExit
                    >
                    <CircularProgress />
                </Fade>
                <table>
                    <tbody>
                        {this.state.foldersArray.map((row, i) => {
                            return (
                                <tr key={`row_${i}`}>
                                    {row.map((folder, j)=>{
                                        return (
                                            <td key={`folder${i}_${j}`}>
                                                <Folder 
                                                    foldername={folder} 
                                                    currentFolder={this.state.currentFolder} 
                                                    folderClicked={(folderName)=> this.changeFolder(folderName)}
                                                >
                                                </Folder>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        {this.state.filesArray.map((row, i) => {
                            return (
                                <tr key={`row_${i}`}>
                                    {row.map((file, j)=>{
                                        if (this.state.filesDict[file])
                                        return (
                                            <td key={`file_${i}_${j}`}>
                                                <File filename={file} 
                                                currentFolder={this.state.currentFolder} 
                                                selected={this.state.filesDict[file].selected}
                                                selectFile = {(filename, multiselect)=> this.selectFile(filename, multiselect)}
                                                resetSelection = {(filename)=>this.resetSelection(filename)}
                                                handleFileClick = {(event)=>this.handleFileClick(event, file)}
                                                >
                                                </File>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <FilesSidebar show={this.state.selectedCount > 0} 
            files={this.state.filesDict} 
            currentFolder={this.state.currentFolder}
            downloadFiles={(event, filesList)=>this.downloadFiles(event, filesList)}
            deleteFiles={(event, filesList)=>this.deleteFiles(event, filesList)}
            uploadClick={()=>this.openFileDialog()}
            >
                <input
                    style={{display: 'none'}}
                    ref={this.inputRef}
                    type="file"
                    onChange={this.handleFileChange}
                    multiple
                />
            </FilesSidebar>
            </>
        )
    }
}
