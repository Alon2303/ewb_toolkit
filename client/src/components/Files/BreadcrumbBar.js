import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';


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
        <div className="breadcrumb-container">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" onClick={() => handleBreadcrumbClick([])}>
                    <span className="breadcrumb-icon">
                        <HomeIcon fontSize="small" />
                    </span>
                    <span className="breadcrumb-folder">
                        Home
                    </span>
                </Link>
                {currentPath.map((folder, index) => (
                    <Link
                        color="inherit"
                        key={index}
                        onClick={() => handleBreadcrumbClick(currentPath.slice(0, index + 1))}
                    >
                        <span className="breadcrumb-icon">
                            <FolderIcon fontSize="small" />
                        </span>
                        <span className="breadcrumb-folder">{folder}</span>
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
                <button className="search-button" onClick={handleSearch}>
                    <SearchIcon />
                </button>
                {searchResults.length > 0 && (
                    <button className="clear-search-button" onClick={clearSearch}>
                        <ClearIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BreadcrumbBar;
