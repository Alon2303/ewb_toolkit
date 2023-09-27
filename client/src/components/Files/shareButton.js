import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ShareButton({ fileName, downloadUrl }) {
    // console.log('ddsfsdf',fileName, downloadUrl);
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const textToCopy = `I'd like to share this ${fileName} with you from the EWB database. You can access the file by clicking the link below:\n\n${downloadUrl}\n\nBest regards!`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset copied status after 3 seconds
        });
    };

    return (
        <div>
            <IconButton onClick={handleCopyClick} aria-label="">
                <ContentCopyIcon />
            </IconButton>
            <span>{copied ? '' : ''}</span>
        </div>
    );
}

export default ShareButton;
