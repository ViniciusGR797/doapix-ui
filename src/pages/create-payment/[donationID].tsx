import styles from "./styles.module.scss";
import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import { Button } from "@/components/Button";
import { FormEvent, useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import { toast } from "react-toastify";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/Input";
import { validateFields } from "@/utils/validate";
import Image from "next/image";
import DonationService from '../../services/donationService';
import TransactionService from '../../services/transactionService';
import { FaSpinner } from 'react-icons/fa';
import { InputMonetary } from "@/components/InputMonetary";

const inter = Inter({ subsets: ["latin"] });

export default function CreateDonation() {
    interface Donation {
        id: string;
        url_image: string;
        name: string;
        description: string;
        goal: string;
        amount_raised: string;
        state: string;
        created_at: string;
        deadline: string;
        category: string;
        transactions: number;
        comments: { [key: string]: string }[];
        user_id: string;
    }

    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const [loadingCreateTransaction, setLoadingCreateTransaction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Donation | null>(null);

    const router = useRouter()
    const { donationID } = router.query;

    useEffect(() => {
        if (alias.length > 255) {
            toast.warning("Atingiu o limite de caracteres para a apelido")
            setAlias(alias.substring(0, 255));
        }
    }, [alias]);

    useEffect(() => {
        if (email.length > 255) {
            toast.warning("Atingiu o limite de caracteres para o email")
            setEmail(email.substring(0, 255));
        }
    }, [email]);

    useEffect(() => {
        const numericValue = parseFloat(amount.replace(/[^0-9,]/g, '').replace(',', '.'));
        if (numericValue > 999999999999.99) {
            setAmount('R$  999 999 999 999,99');
        }
    }, [amount]);

    useEffect(() => {
        if (message.length > 2000) {
            toast.warning("Atingiu o limite de caracteres para a mensagem")
            setMessage(message.substring(0, 2000));
        }
    }, [message]);

    async function handleCreateTransaction(event: FormEvent) {
        event.preventDefault();

        const errorMessage = validateFields({
            alias: alias,
            email: email,
            amount: amount,
            message: message
        });
        if (errorMessage !== null) {
            toast.warning(errorMessage);
            return;
        }

        setLoadingCreateTransaction(true);

        const response = await TransactionService.createTransaction(
            alias,
            email,
            amount.replace(/[^0-9,]/g, '').replace(',', '.'),
            message,
            donationID as string
        )
        if (!response) {
            toast.error("Erro ao consumir API")
        } else if (response.status === 201) {
            toast.success("Doação criada com sucesso, faça o pagamento");
            Router.push(`/payment/${response.data.id}`)
        } else {
            toast.error(response.data.msg)
        }

        setLoadingCreateTransaction(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (donationID !== undefined && typeof donationID === 'string') {
                setIsLoading(true);
                const response = await DonationService.getDonation(donationID)
                if (!response) {
                    toast.error("Erro ao consumir API")
                } else {
                    switch (response.status) {
                        case 200:
                            setData(response.data);
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
    }, [donationID]);

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
                            <div className={styles.headerBody}>
                                <h2 className={styles.title} >Seja um doador</h2>
                                <div className={styles.horizontalLine}></div>
                            </div>
                            <Link href="/home" className={styles.link} >
                                <FiX size={50} className={styles.exit} />
                            </Link>
                            <div className={styles.body}>
                                <div className={styles.uploadImage}>
                                    <div className={styles.image}>
                                        <Image src={data.url_image} alt={data.name} width={300} height={300} style={{ objectFit: "cover" }} />
                                    </div>
                                    <h3>{data.name}</h3>
                                </div>
                                <div className={styles.inputCenter}>
                                    <Input className={styles.input} placeholder="Apelido (opcional)" type="text" value={alias} onChange={(e) => setAlias(e.target.value)} />
                                    <Input className={styles.input} placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <InputMonetary className={styles.input} placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <div className={styles.inputRight}>
                                    <textarea className={styles.inputArea} placeholder="Mensagem (opcional)" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.button}>
                                    <Button type="button" loading={loadingCreateTransaction} style={{ width: '100%' }} onClick={handleCreateTransaction} >Doar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
