import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "John",
    'Doe',
    'JDow@test.test',
    'Lalibela',
    'V',
  ),
  createData(
    1,
    "Joan",
    'Doe',
    'JDow@test.test',
    'Newe paz',
    'V',
  ),
  createData(
    2,
    "Jane",
    'Doe',
    'JDow@test.test',
    'Mekelle',
    'V',
  ),
  createData(
    3,
    "John",
    'Doe',
    'JDow@test.test',
    'Wind',
    'X',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Sur Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Team</TableCell>
            <TableCell align="center">Valid volunteer form</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="center">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Send Email
      </Link>
    </React.Fragment>
  );
}
