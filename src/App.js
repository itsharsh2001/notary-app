import axios from 'axios';
import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);

  const buttonHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "http://demo2211087.mockable.io/mock"
      );
      if (status === 200) {
        setData(data.companies);
        setView(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <>
      <Button variant="contained" onClick={buttonHandler}>Click Me</Button>

      { view && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.email}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> }
    </>
  );
}

export default App;
