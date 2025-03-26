import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {resolveField} from "../utils/Utils";
import {makeStyles} from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

const useStyles = makeStyles(theme => ({
    root: {
        "& > .MuiTableCell-sizeSmall": {
            padding: theme.spacing(0, 3, 1, 0)
        }
    }
}));

export default function BasicTable({
                                       data,
                                       columns,
                                       tableContainerProps,
                                       headerCellProps = {style: {fontWeight: 'bold'}},
                                       rowsCellProps
                                   }) {

    const classes = useStyles();

    return (
        <TableContainer {...tableContainerProps} style={{overflow: "hidden"}}>
            <SimpleBar style={{ maxHeight: "100%" }} autoHide={false}>
                <Table stickyHeader aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow className={classes.root}>
                            {columns.map((x, i) => (
                                <TableCell key={i} {...headerCellProps} align={x.align ? x.align : "left"}>{x.title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && (Array.isArray(data) ? data : [data]).map((row, i) => (
                            <TableRow key={i} className={classes.root}>
                                {columns.map(col => (
                                    <TableCell {...rowsCellProps} key={col.field + i} component="th" scope="row"
                                               align={col.align ? col.align : "left"}>
                                        {col.renderValue ? col.renderValue(resolveField(row, col.field)) : resolveField(row, col.field)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SimpleBar>
        </TableContainer>
    );
}