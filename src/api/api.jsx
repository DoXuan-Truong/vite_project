// import axios from "axios";
// import dayjs from "dayjs";
// import {getUserFromToken} from "../utils/auth";
// // Khởi tạo instance mặc định
// const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8080/api/v1",
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
// });
//
// // Thêm token vào mỗi request
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// export const login = async ({ email, password }) => {
//     const response   = await axiosInstance.post("/auth/login", { email, password });
//     const token = response.data.data.accessToken;
//     localStorage.setItem("accessToken", token);
//     const user = getUserFromToken(token);
//     localStorage.setItem('user', JSON.stringify(user));
//     return response.data;
// };
//
// export const registerForm = async (data) => {
//     const payload = {
//         ...data,
//         dob: dayjs(data.dob).format("YYYY-MM-DD"),
//         gender: Number(data.gender),
//         role: Number(data.role),
//         passwordCode: "1234",
//     };
//     delete payload.passwordConfirm;
//
//     const { data: resData } = await axiosInstance.post("/users/create", payload);
//     return resData;
// };
//
// export const forgotPassword = async ({ email }) => {
//     const { data } = await axiosInstance.post("/auth/forgot-password", { email });
//     return data;
// };
//
// export const confirmPassword = async ({ passwordCode }) => {
//     const email = localStorage.getItem("fp_email");
//     if (!email) {
//         alert("Không tìm thấy email, vui lòng quay lại bước trước.");
//         return;
//     }
//     const { data } = await axiosInstance.post("/auth/confirm-password-code", { email, passwordCode });
//     return data;
// };
//
// export const fetchUserLists = async ({ page, limit: rowsPerPage, searchParams = {} }) => {
//     const filteredParams = Object.fromEntries(
//         Object.entries(searchParams).filter(([, v]) => v !== "")
//     );
//
//
//     const params = `?page=${page+1}&limit=${rowsPerPage}&sortName=userName&direction=ASC`
//
//     const { data } = await axiosInstance.post("/users/list" + params, filteredParams);
//
//     if (data?.data === false) {
//         throw new Error("Không có dữ liệu!");
//     }
//     return data;
// };
// export const userDelete = async (id) => {
//     const { data } = await axiosInstance.post("/users/delete", { id });
//     return data;
// };
//
// export const userDetail = async (id) => {
//     const { data } = await axiosInstance.post("/users/detail", { id });
//     return data.data;
// };
//
// export const userUpdate = async (userId, data, avatar) => {
//     const formData = new FormData();
//     const fields = {
//         id: userId,
//         userName: data.userName,
//         fullName: data.fullName,
//         dob: data.dob,
//         gender: String(data.gender),
//         role: String(data.role),
//         phoneNumber: data.phoneNumber,
//         description: data.description,
//     };
//
//     Object.entries(fields).forEach(([key, value]) => {
//         formData.append(key, value);
//     });
//
//     if (avatar) {
//         formData.append("file", avatar);
//     }
//     console.log("Avatar file:", avatar);
//
//     const res = await axiosInstance.post("/users/update", formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });
//
//     return res.data;
// };
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;