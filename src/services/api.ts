import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";
import Router from 'next/router';

export function setupAPIClient(context = undefined) {
    const cookies = parseCookies(context);
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    const api = axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401 && typeof window !== undefined) {
            localStorage.removeItem('user');
            destroyCookie(undefined, '@nextauth.token')
            Router.push('/')
        }
        return Promise.reject(error);
    })

    return api;
}

export const api = setupAPIClient();