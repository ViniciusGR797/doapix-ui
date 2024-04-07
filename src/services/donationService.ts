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
}

export default new DonationService();