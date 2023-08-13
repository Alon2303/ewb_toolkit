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
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { Typography } from '@mui/material';

import {
  useNavigate,
} from 'react-router-dom';

export default function BasicList() {
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: theme.palette.sidebar.main }}>
        <nav aria-label="options">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/volunteers');
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
                    Volunteers
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/folder');
                }}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
                    Knowledge Base
                  </Typography>
                </ListItemText>
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
                  <VideoCallIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
                    Video Chat
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ScienceIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
                    Matlab
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </ThemeProvider>
  );
}
