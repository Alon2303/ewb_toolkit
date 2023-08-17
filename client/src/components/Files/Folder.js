import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import './Folder.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out"
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)"
  }
});

const Folder = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  const handleClick = (event) => {
    if (event.detail < 2) return; // TODO - Highlight folder / Other actions
    
    if (event.detail >= 2) props.folderClicked(props.folderData.name); 
  };
  

  
  const setRaised = (value) => {
    setState({ raised: value, shadow: value ? 3 : 1 });
  };

  return (
    <Card
      className={`${classes.root} ${state.raised ? classes.cardHovered : ""}`}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      raised={state.raised}
      zdepth={state.shadow}
      onDoubleClick={handleClick}
      style={{ width: "200px", height: "180px", margin: "6px" }}
    >
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Checkbox
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,  
              color: "#bdbdbd",
              opacity: state.raised ? 1 : 0, // Set opacity based on hover state
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <FolderIcon color="primary" sx={{ fontSize: 120 }} />
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {props.folderData.name}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.previewFile(props.foldername)}>
          Preview
        </Button>
        <Button size="small" onClick={() => props.downloadFile(props.foldername)}>
          Download
        </Button>
        <Button size="small" onClick={() => props.deleteFile(props.foldername)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Folder;
