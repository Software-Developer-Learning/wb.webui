import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Backdrop } from '@mui/material';
import DetailTransaction from './DetailTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { Transaction } from 'types/transaction.type';
import { useEffect, useRef } from 'react';
import http from 'untils/http';
import { error } from 'console';

function Row(props: { row: Transaction }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpen}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <DetailTransaction/>
          </Backdrop>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.time}
        </TableCell>
        <TableCell>{row.transactionId}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.phoneNumber}</TableCell>
        <TableCell>{row.store}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function TransactionList() {
  const dispatch = useDispatch()
  const effectRan = useRef(false)


  useEffect(()=>{
    if(effectRan.current === false){
      http
      .get('bill')
      .then(res => {
        console.log(res)
        dispatch({
          type: "transaction/getTransactionListSuccess",
          payload: res.data
        })
      })
      .catch(error => {
        console.log("error", error)
      })

      return () => {
        effectRan.current = true
      }
    }
  },[])

  const transactionList = useSelector((state: RootState) => state.transaction.transactionList)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date & Time</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Store Address</TableCell>
            <TableCell align="right">Total ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList.map((row) => (
            <Row key={row.transactionId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}