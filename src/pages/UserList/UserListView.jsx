import React from 'react';
import {
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Modal,
    Typography,
    Alert
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {ROLE_LABELS} from '../../constants/roles.jsx';
import Footer from "../../components/layout/Footer.jsx";
// import Sidebar from "../../components/layout/Sidebar.jsx";

const UserListView = ({
                          t,
                          navigate,
                          users,
                          currentUser,
                          searchInputs,
                          handleSearchChange,
                          handleSearchSubmit,
                          alert,
                          page,
                          rowsPerPage,
                          totalCount,
                          handlePageChange,
                          handleRowsPerPageChange,
                          deleteModalOpen,
                          setDeleteModalOpen,
                          setSelectedUserId,
                          handleDeleteUser,
                          handleLogout
                      }) => {
    return (<>
            <Box sx={{p: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" color="error" startIcon={<LogoutIcon/>} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Box>
                <Typography variant="h5" gutterBottom>
                    {t('userList.title')}
                </Typography>

                <Box sx={{mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                    <TextField label={t('userList.userName')} name="userName" value={searchInputs.userName}
                               onChange={handleSearchChange}/>
                    <TextField label={t('userList.fullName')} name="fullName" value={searchInputs.fullName}
                               onChange={handleSearchChange}/>
                    <TextField label={t('userList.role')} name="role" value={searchInputs.role}
                               onChange={handleSearchChange}/>
                    <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
                        {t('userList.search')}
                    </Button>
                </Box>

                {alert.message && <Alert severity={alert.type} sx={{mb: 2}}>{alert.message}</Alert>}

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('userList.fullName')}</TableCell>
                                <TableCell>{t('userList.userName')}</TableCell>
                                <TableCell>{t('userList.dob')}</TableCell>
                                <TableCell>{t('userList.role')}</TableCell>
                                <TableCell>{t('userList.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, idx) => (<TableRow key={user._id || idx}>
                                    <TableCell>{user.fullName || ''}</TableCell>
                                    <TableCell>{user.userName || ''}</TableCell>
                                    <TableCell>{user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : ''}</TableCell>
                                    <TableCell>{ROLE_LABELS[user.role]}</TableCell>
                                    <TableCell>
                                        {currentUser.role === '1' ? (<>
                                                <Button variant="contained" color="primary"
                                                        onClick={() => navigate(`/users/edit/${user._id}`)}>{t('userList.edit')}</Button>
                                                <Button variant="contained" color="secondary" onClick={() => {
                                                    setDeleteModalOpen(true);
                                                    setSelectedUserId(user._id);
                                                }} sx={{ml: 2}}>{t('userList.delete')}</Button>
                                            </>) : (<>
                                                <Button variant="contained" disabled>{t('userList.edit')}</Button>
                                                <Button variant="contained" disabled color="secondary"
                                                        sx={{ml: 2}}>{t('userList.delete')}</Button>
                                            </>)}
                                    </TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                    <Box sx={{
                        p: 4, maxWidth: 400, mx: 'auto', mt: '20vh', bgcolor: 'white', borderRadius: 2, boxShadow: 24
                    }}>
                        <Typography variant="h6" gutterBottom>
                            {t('userList.confirmDelete')}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleDeleteUser}>
                            {t('userList.confirm')}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setDeleteModalOpen(false)}
                                sx={{ml: 2}}>
                            {t('userList.cancel')}
                        </Button>
                    </Box>
                </Modal>
            </Box>
            <Footer/>
        </>);
};

export default UserListView;