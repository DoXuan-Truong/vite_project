// src/hooks/useAuth.jsx
import { getCurrentUser } from '../auth/auth';

const useAuth = () => {
    const user = getCurrentUser();
    const isLoggedIn = !!user;

    return {
        user,
        isLoggedIn,
        isAdmin: user?.role === '1',
        isStaff: user?.role === '2',
    };
};

export default useAuth;
