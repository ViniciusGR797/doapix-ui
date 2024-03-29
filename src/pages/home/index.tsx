import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.png";
import { Input } from "../../components/ui/Input";
import { FormEvent, useContext, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FiUser, FiMail } from "react-icons/fi";
import children from "../../../public/children.jpg";
import donation from "../../../public/donation.jpg";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { validateFields } from "../../utils/validate";
import Router from 'next/router';
import { FiLogOut, FiSearch } from "react-icons/fi";
import { Dropdown } from "@/components/ui/Dropdown";
import Card from "@/components/ui/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

    //   const [name, setName] = useState('');
    //   const [email, setEmail] = useState('');
    //   const [pwd, setPwd] = useState('');
    //   const [repeatPwd, setRepeatPwd] = useState('');
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingCreateDonation, setLoadingCreateDonation] = useState(false);

    const handleButtonProfileClick = () => {
        setLoadingProfile(true);
        Router.push('/profile')
        setLoadingProfile(false);
    };

    const handleButtonCreateDonationClick = () => {
        setLoadingCreateDonation(true);
        Router.push('/create-donation')
        setLoadingCreateDonation(false);
    };


    const [selectedOptionState, setSelectedOptionState] = useState<string | null>(null);
    const [selectedOptionTime, setSelectedOptionTime] = useState<string | null>(null);
    const [selectedOptionCategory, setSelectedOptionCategory] = useState<string | null>(null);

    const optionsState = ['Todos estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    const optionsTime = ['Recentes', 'Antigos'];
    const optionsCategory = ['Todas categórias', 'Casa / Moradia', 'Animais / Pets'];

    const handleOptionStateChange = (option: string) => {
        setSelectedOptionState(option);
        toast.warning(option);
    };

    const handleOptionTimeChange = (option: string) => {
        setSelectedOptionTime(option);
        toast.warning(option);
    };

    const handleOptionCategoryChange = (option: string) => {
        setSelectedOptionCategory(option);
        toast.warning(option);
    };

    const data = [
        {
            "url_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvilainternacional.org.br%2Fas-ongs-e-o-terceiro-setor%2F&psig=AOvVaw1pQWU44BzkWutythwB6vPq&ust=1711835275994000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKi_nre5moUDFQAAAAAdAAAAABAD",
            "name": "Card 1",
            "description": "Description for card 1",
            "percentage": 50
        },
        {
            "url_image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvilainternacional.org.br%2Fas-ongs-e-o-terceiro-setor%2F&psig=AOvVaw1pQWU44BzkWutythwB6vPq&ust=1711835275994000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKi_nre5moUDFQAAAAAdAAAAABAD",
            "name": "Card 2",
            "description": "Description for card 2",
            "percentage": 75
        },
    ];

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <div className={styles.header}>
                    <div className={styles.headerMenu}>
                        {/* Virar componente */}
                        <div className={styles.headerLogo}>
                            <Image className={styles.logo} src={logo} alt="doa-pix logo" height={130} />
                            <h1>Doa Pix</h1>
                        </div>
                        <div className={styles.headerButton}>
                            <Button type="button" loading={loadingProfile} onClick={handleButtonProfileClick} >Editar perfil</Button>
                            <button type="button" className={styles.search}>
                                <FiSearch size={20} />
                                <input className={styles.inputSearch} value="Pesquisa" />
                            </button>
                            <Button type="button" loading={loadingProfile} onClick={handleButtonCreateDonationClick} >Pesquisa</Button>
                            <Button type="button" loading={loadingCreateDonation} onClick={handleButtonCreateDonationClick} >Criar doação</Button>
                            <FiLogOut size={150} />
                        </div>
                    </div>
                    <div className={styles.filter}>
                        <Dropdown options={optionsState} defaultOption={optionsState[0]} onSelect={handleOptionStateChange} />
                        <Dropdown options={optionsTime} defaultOption={optionsTime[0]} onSelect={handleOptionTimeChange} />
                        <Dropdown options={optionsCategory} defaultOption={optionsCategory[0]} onSelect={handleOptionCategoryChange} />
                    </div>
                </div>
                <div className={styles.listCards}>
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            urlImage={item.url_image}
                            name={item.name}
                            description={item.description}
                            percentage={item.percentage}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
