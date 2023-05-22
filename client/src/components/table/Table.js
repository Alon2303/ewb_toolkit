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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Grid from "@mui/material/Grid";
import SideBar from "../sidebar/SideBar";
import AppBar from "../appBar/AppBar";
import Avatar from '@mui/material/Avatar';

const IMG = "data:image/jpeg;base64,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"

const mockRows = [
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com', img: IMG },
  { name: 'Israel', surname:  'Israeli', faculty:  'Electrical Engineering', phone:  '0528338256', email:  'Israel@gmail.com', img: IMG },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com', img: IMG },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com', img: IMG },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com', img: IMG },
  { name: 'Alon', surname: 'Ofir', faculty: 'Computer Science', phone: '0523883652', email: 'alonof27@gmail.com', img: IMG },
]

function createData(name, surname, faculty, phone, email, id, img) {
  return {
    name,
    surname,
    faculty,
    ContactInfo: [
      {
        phone,
        email,
        id,
        img
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
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={contactRow.img} />
                      </TableCell>
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

const rows = mockRows.map(row => createData(row.name, row.surname, row.faculty, row.phone, row.email, row.img));

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
