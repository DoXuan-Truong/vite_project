import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <Box sx={{ width: 200, backgroundColor: '#eee', height: '100vh' }}>
        <List>
            <ListItem button component={Link} to="/users">
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
            </ListItem>
        </List>
    </Box>
);

export default Sidebar;