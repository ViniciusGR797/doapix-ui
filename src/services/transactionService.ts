import axios from "axios";
import { api } from "./api";

class TransactionService {
    async getTransactionById(transaction_id: string): Promise<any> {
        try {
            const response = await api.get(`/transactions/${transaction_id}`);
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }

    async createTransaction(alias: string, email: string, amount: string, message: string, donation_id: string): Promise<any> {
        try {
            const response = await api.post('/transactions', { alias, email, amount, message, donation_id });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return error.response;
            }
            return null;
        }
    }
}

export default new TransactionService();