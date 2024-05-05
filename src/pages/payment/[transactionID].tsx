import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FiCopy, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import TransactionService from '../../services/transactionService';
import { FaSpinner } from 'react-icons/fa';
import moment from 'moment-timezone';
import Pusher from 'pusher-js';

const inter = Inter({ subsets: ["latin"] });

export default function Payment() {
    interface Transaction {
        id: string;
        txid: string;
        location: string;
        qr_code: string;
        pix_copy_paste: string;
        amount: string;
        alias: string;
        email: string;
        message: string;
        status: string;
        created_at: string;
        donation_id: string;
    }

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Transaction | null>(null);
    const [txid, setTxid] = useState('');
    const [socket, setSocket] = useState<any | null>(null);

    const router = useRouter()
    const { transactionID } = router.query;

    const handlePixCopy = (text: string): void => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Link copiado");
            })
            .catch(err => {
                toast.error("Erro ao copiar");
            });
    };

    const formatExpirationDate = (dateString: string): string => {
        const date = moment(dateString);
        date.subtract(3, 'hours');
        return date.add(1, 'hours').tz("America/Sao_Paulo").format('DD/MM/YYYY HH:mm:ss');
    };

    useEffect(() => {
        const paymentNotification = () => {
            if (txid !== '' && txid !== undefined && typeof txid === 'string') {
                const key = process.env.NEXT_PUBLIC_PUSHER_KEY || '1234567890abcdefghij';
                const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1';

                const pusher = new Pusher(key, {
                    cluster: cluster
                });

                const channel = pusher.subscribe('payment-notification-channel');
                channel.bind('payment', function (data: any) {
                    if (data.txid === txid) {
                        toast.success(data.message);
                    }
                });
            }
        };

        paymentNotification();
    }, [txid]);

    useEffect(() => {
        const fetchData = async () => {
            if (transactionID !== undefined && typeof transactionID === 'string') {
                setIsLoading(true);
                const response = await TransactionService.getTransactionById(transactionID)
                if (!response) {
                    toast.error("Erro ao consumir API")
                } else {
                    switch (response.status) {
                        case 200:
                            setData(response.data);
                            setTxid(response.data.txid);
                            break;
                        case 400:
                        case 404:
                            toast.error(response.data.msg)
                            Router.push('/home')
                            break;
                        default:
                            toast.error(response.data.msg)
                    }
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [transactionID]);

    if (isLoading) {
        return (
            <div className={styles.spinner}>
                <FaSpinner />
            </div>
        );
    } else if (data) {
        return (
            <>
                <Head>
                    <title>Criar transação</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>
                    <div className={styles.header}>
                        <HeaderLogo />
                    </div>
                    <div className={styles.mainDiv}>
                        <div className={styles.square}>
                            <h2 className={styles.title} >Pix gerado. Conclua sua contribuição</h2>
                            <Link href="/home" className={styles.link} >
                                <FiX size={50} className={styles.exit} />
                            </Link>
                            <div className={styles.uploadImage}>
                                <div className={styles.image}>
                                    <Image src={data.qr_code} alt={"Imagem do QR Code"} width={300} height={300} style={{ objectFit: "cover" }} />
                                </div>
                            </div>
                            <p className={styles.message}>Para finalizar seu contribuição é só <strong>escanear o código QR Code</strong>. Você também pode <strong>clicar em “Copiar código Pix” e colar no app</strong> ou site do seu banco utilizando a opção “Pix copia e cola”</p>
                            <p className={styles.message}>Esse código expira em <strong>{formatExpirationDate(data.created_at)}</strong></p>
                            <div className={styles.buttonCopy} onClick={() => handlePixCopy(data.pix_copy_paste)} >
                                <FiCopy size={50} className={styles.copy} />
                                <span>Copiar código Pix</span>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}