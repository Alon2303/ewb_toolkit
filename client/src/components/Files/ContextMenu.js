import React, { Component } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PreviewIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

import './ContextMenu.css'; // Import your custom CSS file for styling

export default class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            style: {},
            rootWidth: 0,
            rootHeight: 0,
        };
    }

    componentDidMount() {
        document.addEventListener('contextmenu', this.handleContextMenu);
        document.addEventListener('click', this.handleClick);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.handleContextMenu);
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('scroll', this.handleScroll);
    }


    closeContextMenu = () => {
        this.setState({ visible: false });
    };

    handleContextMenu = (event) => {
        event.preventDefault();
        this.setState({ visible: true });

        const clickX = event.clientX;
        const clickY = event.clientY;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        const right = (screenW - clickX) > this.state.rootWidth;
        const left = !right;
        const top = (screenH - clickY) > this.state.rootHeight;
        const bottom = !top;

        const style = {
            position: 'fixed',
            zIndex: 1000,
            display: 'block',
        };

        if (right) {
            style.left = `${clickX + 5}px`;
        } else if (left) {
            style.left = `${clickX - this.state.rootWidth - 5}px`;
        }

        if (top) {
            style.top = `${clickY + 5}px`;
        } else if (bottom) {
            style.top = `${clickY - this.state.rootHeight - 5}px`;
        }

        this.setState({ style });
    };


    handleContextMenuLoad = () => {
        const rootWidth = this.root.offsetWidth;
        const rootHeight = this.root.offsetHeight;
        this.setState({ rootWidth, rootHeight });
    };


    
    render() {
        const { visible, style } = this.state;
        const { x, y, handleDownload, handlePreview, handleShare, handleDelete } = this.props;

        return (
            <>
                {visible && (
                    <div
                        ref={(ref) => { this.root = ref; }}
                        onLoad={this.handleContextMenuLoad}
                        // onMouseEnter={this.handleMouseEnter}
                        // onMouseLeave={this.handleMouseLeave}
                        style={{
                            ...style,
                            left: `${x}px`,
                            top: `${y}px`,
                            // Other styles...
                        }}
                        className="context-menu"
                    >
                        <MenuItem className="context-menu-item" onClick={handleDownload}>
                            <ListItemIcon>
                                <DownloadIcon />
                            </ListItemIcon>
                            <ListItemText primary="Download" />
                        </MenuItem>

                        <MenuItem className="context-menu-item" onClick={handlePreview}>
                            <ListItemIcon>
                                <PreviewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Preview" />
                        </MenuItem>

                        <MenuItem className="context-menu-item" onClick={handleShare}>
                            <ListItemIcon>
                                <ShareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Share" />
                        </MenuItem>

                        <MenuItem className="context-menu-item" onClick={handleDelete}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </MenuItem>
                    </div>
                )}
            </>
        );
    }
}
