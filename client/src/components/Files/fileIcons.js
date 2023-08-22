import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const iconStyle = {
    fontSize: '80px', // Adjust the icon size here
    color: '#3f51b5', // Adjust the icon color here
};

const fileIcons = {
    pdf: <PictureAsPdfIcon style={iconStyle} />,
    png: <ImageOutlinedIcon style={iconStyle} />,
    jpeg: <ImageOutlinedIcon style={iconStyle} />,
    jpg: <ImageOutlinedIcon style={iconStyle} />,
    xls: <InsertDriveFileOutlinedIcon style={iconStyle} />,
    xlsx: <InsertDriveFileOutlinedIcon style={iconStyle} />,
    doc: <DescriptionOutlinedIcon style={iconStyle} />,
    docx: <DescriptionOutlinedIcon style={iconStyle} />,
    txt: <DescriptionOutlinedIcon style={iconStyle} />,
    mp4: <MovieOutlinedIcon style={iconStyle} />,
    mov: <MovieOutlinedIcon style={iconStyle} />,
    ppt: <SlideshowOutlinedIcon style={iconStyle} />,
    pptx: <SlideshowOutlinedIcon style={iconStyle} />,
    zip: <ArchiveOutlinedIcon style={iconStyle} />,
    rar: <ArchiveOutlinedIcon style={iconStyle} />,
    else: <InsertDriveFileOutlinedIcon style={iconStyle} />,
    folder: <FolderOpenIcon style={iconStyle} />,
    // Add more extensions and icons as needed
};

export { fileIcons };
