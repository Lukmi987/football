import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Avatar} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import Button from "../../../components/CustomButtons/Button";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        width: '55%',
        padding: '0 30px',
    },
});





function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

function Row(props) {
    const { row, handleAttendance } = props;
    const cr = row.creationTime;
    console.log('dopice', cr);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const timeStampToData = (timeStamp) => {
        const date =  new Date(timeStamp);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right">{row.eventId}</TableCell>
                <TableCell align="right">{timeStampToData(row.creationTime)}</TableCell>
                <TableCell>
                    <Button
                        id={row.id}
                        onClick={(ev) => handleAttendance(true, ev, cr)}
                    >
                        Ano
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        id={row.id}
                        onClick={(ev) => handleAttendance(false, ev, cr)}
                    >
                        Ne
                    </Button>
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Players
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                {/*<TableHead>*/}
                                {/*    <TableRow>*/}
                                {/*        <TableCell>Date</TableCell>*/}
                                {/*        <TableCell>Customer</TableCell>*/}
                                {/*        <TableCell align="right">Amount</TableCell>*/}
                                {/*        <TableCell align="right">Total price ($)</TableCell>*/}
                                {/*    </TableRow>*/}
                                {/*</TableHead>*/}
                                <TableBody>
                                    <ul id="table-attendance">
                                    {row.attendance.map((user) => (
                                        <li key={user?.userId}>
                                            <Avatar alt="Remy Sharp" src={user?.profileUrl} className={classes.large} />
                                        </li>
                                     ))}
                                    </ul>
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
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

const  CollapsibleTable = ({radek, handleAttendance}) => {
    console.log('jjjjjjjj',radek);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Ucast</TableCell>
                        <TableCell align="right">Event Id</TableCell>
                        <TableCell align="right">Zacatek</TableCell>
                        <TableCell align="right">Jdu na trening ?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {radek.map((row) => (
                        <Row key={row.creationTime} row={ row } handleAttendance={handleAttendance} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CollapsibleTable;