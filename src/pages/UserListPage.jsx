import React, { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchUserLists, userDelete } from "../api/api.jsx";

export default function UserListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    userName: "",
    fullName: "",
    role: "",
  });
  const [searchParams, setSearchParams] = useState({
    userName: "",
    fullName: "",
    role: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/login');
    }
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      const res = await fetchUserLists({ page, limit: rowsPerPage, searchParams });
      const { docs = [], totalDocs = 0 } = res.data || {};
      setUsers(docs);
      setTotalCount(totalDocs);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
      setAlert({ type: "error", message: "I0002: Lỗi khi tải dữ liệu" });
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !selectedUserId) {
      setAlert({ type: "error", message: "I0003: Vui lòng đăng nhập lại" });
      return;
    }
    try {
      const res = await userDelete(selectedUserId);
      if (res.code === 200) {
        setAlert({ type: "success", message: "I0001: Xóa người dùng thành công" });
        setDeleteModalOpen(false);

        // Sau khi xóa thành công, gọi lại fetchUsers để cập nhật danh sách
        await fetchUsers();
      }
    } catch (err) {
      console.error("Lỗi khi xóa người dùng:", err);
      setAlert({ type: "error", message: "I0002: Lỗi khi xóa người dùng" });
    }
  };


  const handleSearchSubmit = () => {
    setPage(0);
    setSearchParams(searchInputs);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, JSON.stringify(searchParams)]);

  return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom>
          {t("userList.title")}
        </Typography>

        <Box sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
              label={t("userList.userName")}
              name="userName"
              value={searchInputs.userName}
              onChange={handleSearchChange}
          />
          <TextField
              label={t("userList.fullName")}
              name="fullName"
              value={searchInputs.fullName}
              onChange={handleSearchChange}
          />
          <TextField
              label={t("userList.role")}
              name="role"
              value={searchInputs.role}
              onChange={handleSearchChange}
          />
          <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
            {t("userList.search")}
          </Button>
        </Box>

        {alert.message && (
            <Alert severity={alert.type} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("userList.fullName")}</TableCell>
                <TableCell>{t("userList.userName")}</TableCell>
                <TableCell>{t("userList.dob")}</TableCell>
                <TableCell>{t("userList.role")}</TableCell>
                <TableCell>{t("userList.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => (
                  <TableRow key={user._id || idx}>
                    <TableCell>{user.fullName || ""}</TableCell>
                    <TableCell>{user.userName || ""}</TableCell>
                    <TableCell>
                      {user.dob ? new Date(user.dob).toLocaleDateString("vi-VN") : ""}
                    </TableCell>
                    <TableCell>
                      {Number(user.role) === 1 ? "Quản trị viên" : "Nhân viên"}
                    </TableCell>
                    <TableCell>
                      {(currentUser.role === '1'  ? (
                          <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/users/edit/${user._id}`)}
                            >
                              {t("userList.edit")}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  setDeleteModalOpen(true);
                                  setSelectedUserId(user._id);
                                }}
                                sx={{ ml: 2 }}
                            >
                              {t("userList.delete")}
                            </Button>
                          </>
                      ) :(
                          <>
                            <Button
                                variant="contained"
                                disabled
                                color="primary"
                                onClick={() => navigate(`/users/edit/${user._id}`)}
                            >
                              {t("userList.edit")}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled
                                onClick={() => {
                                  setDeleteModalOpen(true);
                                  setSelectedUserId(user._id);
                                }}
                                sx={{ ml: 2 }}
                            >
                              {t("userList.delete")}
                            </Button>
                          </>
                      )
                      )}
                    </TableCell>
                  </TableRow>
              ))}
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
          <Box
              sx={{
                p: 4,
                maxWidth: 400,
                mx: "auto",
                mt: "20vh",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
              }}
          >
            <Typography variant="h6" gutterBottom>
              {t("userList.confirmDelete")}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteUser}
            >
              {t("userList.confirm")}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDeleteModalOpen(false)}
                sx={{ ml: 2 }}
            >
              {t("userList.cancel")}
            </Button>
          </Box>
        </Modal>
      </Box>
  );
}
