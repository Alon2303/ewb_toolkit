import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PeopleIcon from '@mui/icons-material/People';
import DraftsIcon from '@mui/icons-material/Folder';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ScienceIcon from '@mui/icons-material/Science';
import {
  useNavigate,
} from "react-router-dom";

export default function BasicList() {
  let navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#1976d' }}>
      <nav aria-label="options">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/volunteers");
              }}
            >
              <ListItemIcon>
                <PeopleIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Volunteers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/folder");
              }}
            >
              <ListItemIcon>
                <DraftsIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Knowledge Base" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Email" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VideoCallIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Video Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ScienceIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Matlab" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
