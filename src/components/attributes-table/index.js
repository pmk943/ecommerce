import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const AttributesTable = (props) => {
const data = props.data;

    
    
      return (
        <TableContainer component={Paper} sx={{padding:"10px"}}>
          <Table sx={{ minWidth: 200, border:"none" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trait</TableCell>
                <TableCell align="center">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((traitObj, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {traitObj.trait_type}
                  </TableCell>
                  <TableCell align="center">{traitObj.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    
    


export default AttributesTable;