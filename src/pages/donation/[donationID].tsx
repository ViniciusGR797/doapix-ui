import styles from "./styles.module.scss";
import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import LoadingBar from "@/components/LoadingBar";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import KeyValueDisplay from "@/components/KeyValueDisplay";
import ButtonCopy from "@/components/ButtonCopy";
import Router, { useRouter } from 'next/router';
import { toast } from "react-toastify";
import DonationService from '../../services/donationService';
import { FaSpinner } from 'react-icons/fa';
import { BiEdit } from "react-icons/bi";

const inter = Inter({ subsets: ["latin"] });

export default function Donation() {
    interface Comment {
        alias: string;
        message: string;
    }

    interface Donation {
        id: string;
        name: string;
        url_image: string;
        description: string;
        state: string;
        category: string;
        goal: string;
        amount_raised: string;
        deadline: string;
        created_at: string;
        user_id: string;
        transactions_count: number;
        comments: Comment[];
    }

    const [loadingCreatePayment, setLoadingCreatePayment] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Donation | null>(null);

    const router = useRouter()
    const { donationID } = router.query;

    const handleEditDonation = () => {
        Router.push(`/update-donation/${donationID}`)
    };

    const handleButtonCreatePaymentClick = () => {
        setLoadingCreatePayment(true);
        Router.push(`/create-payment/${donationID}`)
        setLoadingCreatePayment(false);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

        return formattedDate;
    };

    const formatCurrency = (value: number): string => {
        const formattedValue = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formattedValue;
    };

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
                    <title>Doação</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>
                    <div className={styles.header}>
                        <HeaderLogo />
                    </div>
                    <div className={styles.mainDiv}>
                        <div className={styles.donation}>
                            <div className={styles.body}>
                                <div className={styles.imageMetrics}>
                                    <div className={styles.image}>
                                        <Image src={data.url_image} alt={data.name} width={300} height={300} style={{ objectFit: "cover" }} />
                                    </div>
                                    <div >

                                        <div className={styles.metricsDateNormal}>
                                            <KeyValueDisplay attribute={"Criada"} value={formatDate(data.created_at)} />
                                            <KeyValueDisplay attribute={"Finaliza"} value={formatDate(data.deadline)} />
                                        </div>
                                        <div className={styles.metricsDateMedia}>
                                            <KeyValueDisplay attribute={"Criada"} value={formatDate(data.created_at)} />
                                            <KeyValueDisplay attribute={"Finaliza"} value={formatDate(data.deadline)} />
                                            <KeyValueDisplay attribute={"Arrecadado"} value={formatCurrency(parseFloat(data.amount_raised.replace('$', '')))} />
                                            <KeyValueDisplay attribute={"Meta"} value={formatCurrency(parseFloat(data.goal.replace('$', '')))} />
                                            <KeyValueDisplay attribute={"Apoiadores"} value={data.transactions_count} />
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        <h2 className={styles.nameText} >{data.name}</h2>
                                        <Link href="/home" className={styles.link} >
                                            <FiX size={50} className={styles.exit} />
                                        </Link>
                                    </div>
                                    <div>

                                        <div className={styles.detailsNormal}>
                                            <div className={styles.description}>
                                                <p>{data.description}</p>
                                            </div>
                                            <div className={styles.comments}>
                                                {data.comments.map((item, index) => (
                                                    <div key={index}>
                                                        <KeyValueDisplay attribute={item.alias ? item.alias : 'Anônimo'} value={item.message} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.detailsMedia}>
                                            <div className={styles.description}>
                                                <p>{data.description}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.commentsMedia}>
                                <div className={styles.comments}>
                                    {data.comments.map((item, index) => (
                                        <div key={index}>
                                            <KeyValueDisplay attribute={item.alias ? item.alias : 'Anônimo'} value={item.message} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className={styles.metrics}>

                                    <div className={styles.metricsNormal}>
                                        <KeyValueDisplay attribute={"Arrecadado"} value={formatCurrency(parseFloat(data.amount_raised.replace('$', '')))} />
                                        <KeyValueDisplay attribute={"Meta"} value={formatCurrency(parseFloat(data.goal.replace('$', '')))} />
                                        <KeyValueDisplay attribute={"Apoiadores"} value={data.transactions_count} />
                                        <ButtonCopy attribute={"Compartilhar doação"} value={window.location.href} />
                                    </div>
                                    <div className={styles.metricsMedia}>
                                        <ButtonCopy attribute={"Compartilhar doação"} value={window.location.href} />
                                    </div>

                                </div>
                                <div>

                                    <div className={styles.footerNormal}>
                                        <div className={styles.loadingBar}>
                                            <LoadingBar percentage={Math.round((parseFloat(data.amount_raised.replace('$', '')) / parseFloat(data.goal.replace('$', ''))) * 100)} />
                                        </div>
                                        <div className={styles.editDonation} onClick={handleEditDonation} >
                                            <BiEdit size={40} className={styles.edit} />
                                        </div>
                                        <div className={styles.button}>
                                            <Button type="button" loading={loadingCreatePayment} style={{ width: '100%' }} onClick={handleButtonCreatePaymentClick} >Doar</Button>
                                        </div>
                                    </div>
                                    <div className={styles.footerMedia}>
                                        <div className={styles.editDonation} onClick={handleEditDonation} >
                                            <BiEdit size={40} className={styles.edit} />
                                        </div>
                                        <div className={styles.button}>
                                            <Button type="button" loading={loadingCreatePayment} style={{ width: '100%' }} onClick={handleButtonCreatePaymentClick} >Doar</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
