import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder'; // Material-UI Folder icon

import axios from 'axios';

import './BreadcrumbBar.css'; // Custom CSS file for styles

const BreadcrumbBar = ({ currentPath, handleBreadcrumbClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/search?query=${searchQuery}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="breadcrumb-container"> {/* Added a container for styling */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" onClick={() => handleBreadcrumbClick([])}>
                    Home
                </Link>
                {currentPath.map((folder, index) => (
                    <Link
                        color="inherit"
                        key={index}
                        onClick={() => handleBreadcrumbClick(currentPath.slice(0, index + 1))}
                    >
                        <span className="breadcrumb-icon"> {/* Added a span for styling */}
                            <FolderIcon /> {/* Material-UI Folder icon */}
                        </span>
                        {folder} 
                    </Link>
                ))}
            </Breadcrumbs>
            <div className="breadcrumb-search">
                <input
                    type="text"
                    placeholder="Search in this path"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <SearchIcon />
                </button>
                {searchResults.length > 0 && (
                    <button onClick={clearSearch}>Clear Search</button>
                )}
            </div>
        </div>
    );
};

export default BreadcrumbBar;
