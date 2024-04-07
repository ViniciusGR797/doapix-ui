import axios from "axios";
import { api } from "./api";
import { setCookie } from "nookies";
import { toast } from "react-toastify";


class UserService {
    async loginUser(email: string, pwd: string): Promise<any> {
        try {
            const response = await api.post('/users/login', { email, pwd });
            const access_token = response.data.access_token

            api.defaults.headers['Authorization'] = `Bearer ${access_token}`
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }

    async createUser(name: string, email: string, pwd: string): Promise<any> {
        try {
            const response = await api.post('/users', { name, email, pwd });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }
}

export default new UserService();