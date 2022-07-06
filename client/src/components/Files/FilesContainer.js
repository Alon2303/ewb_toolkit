import React, { Component } from 'react'
import File from './File';
import './FilesContainer.css'
import Folder from './Folder'
import axios from 'axios'
import {FaLevelUp} from 'react-icons/lib/fa'

const ROWSIZE = 4;

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
            filesDict : {}
        }
        window.addEventListener('onselectionchange', (event) => {
            event.preventDefault();
        });
    }

    

    async componentDidMount(){
        const fileNames = await axios.get(`http://localhost:3501/`);
        // console.log(fileNames.data);
        const allContent = fileNames.data;
        if (allContent){
            var filesDict = {};
            allContent.map(filename => filesDict[filename] = {filename, selected:false});
            await this.setState(prevState => {return {...prevState, allContent, filesDict}});
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

    async changeFolder(folderName){
        console.log('change folder ', folderName)
        const currentFolder = folderName;
        await this.setState({currentFolder})
        await this.mapItems();
        await this.resetSelection();
    }

    async resetSelection(ignoredFile=''){
        const filesDict = {...this.state.filesDict};
        Object.entries(filesDict).map(([key, val])=> {
            if (key == ignoredFile)
                return;
            filesDict[key].selected = false;
        });
        await this.setState({filesDict});
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
        dict[filename].selected = !dict[filename].selected;    
        if (!multiselect){
            this.resetSelection(filename);
        }
        this.setState(prevState => {return {...prevState, filesDict : dict}});
        
    }

    render() {
        return (
            <div className='files-container'>
                <h2>
                    {this.state.currentFolder != '' && <FaLevelUp className='up-arrow' onClick={(e)=>this.levelUp(e)}></FaLevelUp>}
                    {this.getShortFolderName()}
                    </h2>
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
                                        return (
                                            <td key={`file_${i}_${j}`}>
                                                <File filename={file} 
                                                currentFolder={this.state.currentFolder} 
                                                selected={this.state.filesDict[file].selected}
                                                selectFile = {(filename, multiselect)=> this.selectFile(filename, multiselect)}
                                                resetSelection = {(filename)=>this.resetSelection(filename)}
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
        )
    }
}
