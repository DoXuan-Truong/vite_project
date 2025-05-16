import axiosInstance from '../api/api';
export const fetchUserList = async ({ page = 0, limit = 20, searchParams = {} }) => {
    const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, v]) => v !== '')
    );

    const params = `?page=${page + 1}&limit=${limit}&sortName=userName&direction=ASC`;
    const response = await axiosInstance.post('/users/list' + params, filteredParams);

    if (response.data?.data === false) {
        throw new Error('Không có dữ liệu!');
    }

    return response.data;
};

export const getUserDetail = async (id) => {
    const response = await axiosInstance.post('/users/detail', { id });
    return response.data.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.post('/users/delete', { id });
    return response.data;
};

export const updateUser = async (userId, data, avatar) => {
    const formData = new FormData();
    const fields = {
        id: userId,
        userName: data.userName,
        fullName: data.fullName,
        dob: data.dob,
        gender: String(data.gender),
        role: String(data.role),
        phoneNumber: data.phoneNumber,
        description: data.description,
    };

    Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
    });

    if (avatar) {
        formData.append('file', avatar);
    }

    const response = await axiosInstance.post('/users/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};
