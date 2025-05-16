import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const AppTable = ({ columns, data, renderActions }) => (
    <Table>
        <TableHead>
            <TableRow>
                {columns.map((col) => <TableCell key={col.key}>{col.label}</TableCell>)}
                {renderActions && <TableCell>Hành động</TableCell>}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row) => (
                <TableRow key={row.id}>
                    {columns.map((col) => (
                        <TableCell key={col.key}>{row[col.key]}</TableCell>
                    ))}
                    {renderActions && <TableCell>{renderActions(row)}</TableCell>}
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default AppTable;