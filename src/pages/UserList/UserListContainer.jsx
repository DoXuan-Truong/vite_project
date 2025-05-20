import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
// import { fetchUserLists, userDelete } from '../../api/api';
import UserListView from './UserListView';
import {deleteUser, fetchUserList} from "../../services/userService.jsx";


const UserListContainer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [users, setUsers] = useState([]);
    const [searchInputs, setSearchInputs] = useState({userName: '', fullName: '', role: ''});
    const [searchParams, setSearchParams] = useState({userName: '', fullName: '', role: ''});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [alert, setAlert] = useState({type: '', message: ''});

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        const {name, value} = e.target;
        setSearchInputs((prev) => ({...prev, [name]: value}));
    };

    const handleSearchSubmit = () => {
        setPage(0);
        setSearchParams(searchInputs);
    };

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token || !selectedUserId) {
            setAlert({type: 'error', message: 'I0003: Vui lòng đăng nhập lại'});
            return;
        }
        try {
            const res = await deleteUser(selectedUserId);
            if (res.code === 200) {
                setAlert({type: 'success', message: 'I0001: Xóa người dùng thành công'});
                setDeleteModalOpen(false);
                await fetchUsers();
            }
        } catch (err) {
            console.error('Lỗi khi xóa người dùng:', err);
            setAlert({type: 'error', message: 'I0002: Lỗi khi xóa người dùng'});
        }
    };

    const handlePageChange = (e, newPage) => setPage(newPage);
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const fetchUsers = async () => {
        try {
            const res = await fetchUserList({page, limit: rowsPerPage, searchParams});
            const {docs = [], totalDocs = 0} = res.data || {};
            setUsers(docs);
            setTotalCount(totalDocs);
        } catch (err) {
            console.error('Lỗi khi tải danh sách người dùng:', err);
            setAlert({type: 'error', message: 'I0002: Lỗi khi tải dữ liệu'});
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, rowsPerPage, JSON.stringify(searchParams)]);

    return (
        <UserListView
            t={t}
            navigate={navigate}
            users={users}
            currentUser={currentUser}
            searchInputs={searchInputs}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            alert={alert}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={totalCount}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            deleteModalOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            setSelectedUserId={setSelectedUserId}
            handleDeleteUser={handleDeleteUser}
            handleLogout={handleLogout}
        />
    );
};

export default UserListContainer;