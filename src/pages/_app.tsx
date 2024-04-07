import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "@/contexts/AuthContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OptionsProvider } from "@/contexts/OptionsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <OptionsProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={5000} />
      </OptionsProvider>
    </AuthProvider>
  );
}