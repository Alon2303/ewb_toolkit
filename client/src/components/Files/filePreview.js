import React from 'react';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

function FilePreview({ fileContent, filename }) {
  let previewContent = null;

  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
    // Photo preview
    previewContent = <img src={fileContent} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} />;
  } else if (filename.endsWith('.mp4') || filename.endsWith('.mov')) {
    // Video preview
    previewContent = <ReactPlayer url={fileContent} controls width="100%" />;
  } else if (filename.endsWith('.txt')) {
    // Text preview
    previewContent = <pre style={{ maxHeight: '100%', overflowY: 'auto' }}>{fileContent}</pre>;
  } else if (filename.endsWith('.pdf')) {
    // PDF preview
    previewContent = (
      <Document file={fileContent}>
        <Page pageNumber={1} width="100%" />
      </Document>
    );
  }

  return (
    <div className="file-preview" style={{ width: '100%', height: '100%' }}>
      {previewContent ? (
        previewContent
      ) : (
        <p>No preview available for this file type</p>
      )}
    </div>
  );
}

export default FilePreview;
