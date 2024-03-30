import styles from "./styles.module.scss";
import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import LoadingBar from "@/components/LoadingBar";
import { Button } from "@/components/Button";
import { useState } from "react";
import Router from 'next/router';
import Image from "next/image";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import KeyValueDisplay from "@/components/KeyValueDisplay";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import ButtonCopy from "@/components/ButtonCopy";

const inter = Inter({ subsets: ["latin"] });

export default function Donation() {
    const [loadingCreatePayment, setLoadingCreatePayment] = useState(false);

    const handleButtonCreatePaymentClick = () => {
        setLoadingCreatePayment(true);
        Router.push('/create-payment')
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

    const data = {
        "id": "f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca",
        "url_image": "data:image/jpeg;base64,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",
        "name": "World Wide Fund for Nature",
        "description": "Dia 24, mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente mano no meio ambiente ONG internacional trente",
        "goal": 500.00,
        "amount_raised": 3.00, // Tratar no back, somar valor de transações pagas por doação
        "state": "AC",
        "created_at": "2024-03-24T19:34:02.090Z",
        "deadline": "2024-03-30T19:34:02.090Z",
        "category": "Projetos Sociais / Voluntariado",
        "transactions": 165, // Tratar no back, contar quantas transações pagas por doação
        "comments": [
            { "João": "🎁 Acabei de fazer uma doação para a sua causa incrível. Continue com o bom trabalho!" },
            { "Maria": "🤝 Fiz uma contribuição. Espero que ajude a fazer a diferença!" },
            { "Pedro": "💕 Doei para apoiar a sua missão. Vamos mudar o mundo juntos!" },
            { "": "🌱 Acabei de fazer uma doação. Que possamos crescer juntos nesta jornada!" },
            { "Jonas": "💪 Enviei uma doação para ajudar a alcançar nosso objetivo. Vamos lá!" },
            { "João": "🎁 Acabei de fazer uma doação para a sua causa incrível. Continue com o bom trabalho!" },
            { "Maria": "🤝 Fiz uma contribuição. Espero que ajude a fazer a diferença!" },
            { "Pedro": "💕 Doei para apoiar a sua missão. Vamos mudar o mundo juntos!" },
            { "": "🌱 Acabei de fazer uma doação. Que possamos crescer juntos nesta jornada!" },
            { "Jonas": "💪 Enviei uma doação para ajudar a alcançar nosso objetivo. Vamos lá!" },
        ],
    };

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
                                        <KeyValueDisplay attribute={"Arrecadado"} value={formatCurrency(data.amount_raised)} />
                                        <KeyValueDisplay attribute={"Meta"} value={formatCurrency(data.goal)} />
                                        <KeyValueDisplay attribute={"Apoiadores"} value={data.transactions} />
                                    </div>

                                </div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.name}>
                                    <h2 className={styles.nameText} >{data.name}</h2>
                                    <Link href="/" className={styles.link} >
                                        <FiX size={50} className={styles.exit} />
                                    </Link>
                                </div>
                                <div>

                                    <div className={styles.detailsNormal}>
                                        <div className={styles.description}>
                                            <p>{data.description}</p>
                                        </div>
                                        <div className={styles.comments}>
                                            {data.comments.map((comentario, index) => (
                                                <div key={index}>
                                                    {Object.entries(comentario).map(([nome, texto]) => (
                                                        <KeyValueDisplay attribute={nome ? nome : 'Anônimo'} value={texto} />
                                                    ))}
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
                                {data.comments.map((comentario, index) => (
                                    <div key={index}>
                                        {Object.entries(comentario).map(([nome, texto]) => (
                                            <KeyValueDisplay attribute={nome ? nome : 'Anônimo'} value={texto} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className={styles.metrics}>

                                <div className={styles.metricsNormal}>
                                    <KeyValueDisplay attribute={"Arrecadado"} value={formatCurrency(data.amount_raised)} />
                                    <KeyValueDisplay attribute={"Meta"} value={formatCurrency(data.goal)} />
                                    <KeyValueDisplay attribute={"Apoiadores"} value={data.transactions} />
                                    <ButtonCopy attribute={"Compartilhar doação"} value={data.id} />
                                </div>
                                <div className={styles.metricsMedia}>
                                    <ButtonCopy attribute={"Compartilhar doação"} value={data.id} />
                                </div>

                            </div>
                            <div>

                                <div className={styles.footerNormal}>
                                    <div className={styles.loadingBar}>
                                        <LoadingBar percentage={Math.round((data.amount_raised / data.goal) * 100)} />
                                    </div>
                                    <div className={styles.button}>
                                        <Button type="button" loading={loadingCreatePayment} style={{ width: '100%' }} onClick={handleButtonCreatePaymentClick} >Doar</Button>
                                    </div>
                                </div>
                                <div className={styles.footerMedia}>
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
    )
}
