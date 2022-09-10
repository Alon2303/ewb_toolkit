import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Grid from "@mui/material/Grid";
import SideBar from "../sidebar/SideBar";
import AppBar from "../appBar/AppBar";

const mockRows = [
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com' },
  { name: 'Israel', surname:  'Israeli', faculty:  'Electrical Engineering', phone:  '0528338256', email:  'Israel@gmail.com' },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com' },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com' },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com' },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com' },
]

function createData(name, surname, faculty, phone, email, id) {
  return {
    name,
    surname,
    faculty,
    ContactInfo: [
      {
        phone,
        email,
        id
      }
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.surname}</TableCell>
        <TableCell align="left">{row.faculty}</TableCell>
        <TableCell>{<ModeEditIcon color={"primary"} />}</TableCell>
        <TableCell>{<DeleteForeverIcon color={"primary"} />}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Contact Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ContactInfo.map((contactRow) => (
                    <TableRow key={contactRow.id}>
                      <TableCell component="th" scope="row">{contactRow.phone}</TableCell>
                      <TableCell>{contactRow.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    surname: PropTypes.number.isRequired,
    faculty: PropTypes.number.isRequired,
    ContactInfo: PropTypes.arrayOf(
      PropTypes.shape({
        phone: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired
      }),
    ).isRequired
  }).isRequired,
};

const rows = mockRows.map(row => createData(row.name, row.surname, row.faculty, row.phone, row.email));

export default function VolunteersTable() {
  return (
    <Grid container>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid container direction={'row'}> 
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Sur Name</TableCell>
            <TableCell align="left">Faculty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
        </Grid>
      </Grid>
  );
}
