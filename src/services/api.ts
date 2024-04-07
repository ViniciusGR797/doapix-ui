import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";
import Router from 'next/router';

export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: 'http://localhost:8080',
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