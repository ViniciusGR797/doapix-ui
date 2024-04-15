import Head from "next/head";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Link from "next/link";
import Router from 'next/router';
import { FiLogOut, FiSearch } from "react-icons/fi";
import { Dropdown } from "@/components/Dropdown";
import Card from "@/components/Card";
import HeaderLogo from "@/components/HeaderLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useToastFromCookie } from "@/contexts/HookToast";
import { useOptions } from "@/contexts/OptionsContext";
import { toast } from "react-toastify";
import DonationService from '../../services/donationService';

export default function Home() {
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingCreateDonation, setLoadingCreateDonation] = useState(false);

    const { logout } = useAuth();
    const { optionsState, optionsTime, optionsCategory } = useOptions();

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

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterState, setFilterState] = useState<string>(optionsState[0]);
    const [filterTime, setFilterTime] = useState<string>(optionsTime[0]);
    const [filterCategory, setFilterCategory] = useState<string>(optionsCategory[0]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleOptionStateChange = (option: string) => {
        setFilterState(option);
    };

    const handleOptionTimeChange = (option: string) => {
        setFilterTime(option);
    };

    const handleOptionCategoryChange = (option: string) => {
        setFilterCategory(option);
    };

    const handleButtonDonationClick = (donation_id: string) => {
        Router.push(`/donation/${donation_id}`)
    };

    const [data, setData] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await DonationService.getAllDonations()
            if (!response) {
                toast.error("Erro ao consumir API")
            } else if (response.status === 200) {
                setData(response.data);
            } else {
                toast.error(response.data.msg)
            }
        };

        fetchData();
    }, []);

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
                        <HeaderLogo />
                        <div className={styles.headerButton}>
                            <Button type="button" loading={loadingProfile} onClick={handleButtonProfileClick} >Editar perfil</Button>
                            <button type="button" className={styles.search}>
                                <FiSearch size={20} />
                                <input className={styles.inputSearch} placeholder="Pesquisa" value={searchTerm} onChange={handleSearchChange} />
                            </button>
                            <Button type="button" loading={loadingCreateDonation} onClick={handleButtonCreateDonationClick} >Criar doação</Button>
                            <button onClick={logout} className={styles.buttonLeave}>
                                <FiLogOut color='#000' size={40} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.filter}>
                        <Dropdown options={optionsState} defaultOption={optionsState[0]} onSelect={handleOptionStateChange} />
                        <Dropdown options={optionsTime} defaultOption={optionsTime[0]} onSelect={handleOptionTimeChange} />
                        <Dropdown options={optionsCategory} defaultOption={optionsCategory[0]} onSelect={handleOptionCategoryChange} />
                    </div>
                </div>
                <div className={styles.listCards}>
                    {data && Array.isArray(data) && data
                            .filter((item: any) =>
                                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.description.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .filter((item: any) => !filterState || item.state === filterState || optionsState[0] === filterState)
                            .filter((item: any) => !filterCategory || item.category === filterCategory || optionsCategory[0] === filterCategory)
                            .sort((a: any, b: any) => {
                                const dateA = new Date(a.created_at);
                                const dateB = new Date(b.created_at);
                                if (filterTime === 'Recentes') {
                                    return dateB.getTime() - dateA.getTime();
                                } else if (filterTime === 'Antigos') {
                                    return dateA.getTime() - dateB.getTime();
                                }
                                return 0;
                            })
                            .map((item: any, index: number) => (
                                <Card
                                    urlImage={item.url_image}
                                    name={item.name}
                                    description={item.description}
                                    percentage={Math.round((parseFloat(item.amount_raised.replace('$', '')) / parseFloat(item.goal.replace('$', ''))) * 100)}
                                    onClick={() => handleButtonDonationClick(item.id)}
                                />
                            ))}
                </div>
            </div>
        </>
    );
}
