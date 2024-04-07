import axios from "axios";
import { api } from "./api";
import { setCookie } from "nookies";
import { toast } from "react-toastify";


class DonationService {
    async getAllDonations(): Promise<any> {
        try {
            const response = await api.get('/donations');
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }

    async createDonation(name: string, goal: string, url_image: string, deadline: string, state: string, category: string, description: string): Promise<any> {
        try {
            const response = await api.post('/donations', { name, goal, url_image, deadline, state, category, description });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }
}

export default new DonationService();