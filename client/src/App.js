import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import SideBar from "./components/sidebar/SideBar";
import AppBar from "./components/appBar/AppBar";
import VolunteersTable from "./components/table/Table";

function App(props) {
  const [state, setState] = useState('VolunteersTable');
  const test = () => {

  }

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid container direction={'row'}> 
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
