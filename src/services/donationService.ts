import axios from "axios";
import { api } from "./api";

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

    async getDonation(donation_id: string): Promise<any> {
        try {
            const response = await api.get(`/donations/${donation_id}`);
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

    async updateDonation(name: string, goal: string, url_image: string, deadline: string, state: string, category: string, description: string, donation_id: string): Promise<any> {
        try {
            const response = await api.put(`/donations/${donation_id}`, { name, goal, url_image, deadline, state, category, description });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }

    async deleteDonation(donation_id: string): Promise<any> {
        try {
            const response = await api.delete(`/donations/${donation_id}`);
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