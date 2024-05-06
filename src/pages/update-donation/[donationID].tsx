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
import { Dropdown } from "@/components/Dropdown";
import { useOptions } from "@/contexts/OptionsContext";
import DonationService from '../../services/donationService';
import { FaSpinner } from 'react-icons/fa';
import default_image from "../../../public/upload.png";
import imageCompression from 'browser-image-compression';
import { InputMonetary } from "@/components/InputMonetary";
import { FaRegTrashAlt } from "react-icons/fa";

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

    const { optionsState, optionsCategory } = useOptions();

    const [url_image, setUrlImgage] = useState('');
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [state, setState] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [loadingCreateDonation, setLoadingCreateDonation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Donation | null>(null);

    const router = useRouter()
    const { donationID } = router.query;

    const handleOptionStateChange = (option: string) => {
        setState(option);
    };

    const handleOptionCategoryChange = (option: string) => {
        setCategory(option);
    };

    async function handleUpdateDonation(event: FormEvent) {
        event.preventDefault();

        const errorMessage = validateFields({
            name: name,
            goal: goal,
            deadline: deadline,
            state: state,
            category: category,
            description: description
        });
        if (errorMessage !== null) {
            toast.warning(errorMessage);
            return;
        }

        setLoadingCreateDonation(true);

        const response = await DonationService.updateDonation(
            name,
            goal.replace(/[^0-9,]/g, '').replace(',', '.'),
            url_image,
            deadline,
            state,
            category,
            description,
            donationID as string
        )
        if (!response) {
            toast.error("Erro ao consumir API")
        } else if (response.status === 200) {
            toast.success("Campanha solidária atualizada com sucesso");
            Router.push('/home')
        } else {
            toast.error(response.data.msg)
        }

        setLoadingCreateDonation(false);
    }

    async function handleDeleteDonation(event: FormEvent) {
        event.preventDefault();

        const response = await DonationService.deleteDonation(donationID as string)
        if (!response) {
            toast.error("Erro ao consumir API")
        } else if (response.status === 200) {
            toast.success("Campanha solidária excluída com sucesso");
            Router.push('/home')
        } else {
            toast.error(response.data.msg)
        }
    }

    const today = new Date().toISOString().split('T')[0];

    const MAX_BASE64_SIZE = 70000;

    const handleImageUpload = async (event: any) => {
        let file = event.target.files[0];
        let options = {
            maxSizeMB: 10,
            useWebWorker: true,
        };

        try {
            let compressedFile = await imageCompression(file, options);
            let reader = new FileReader();

            reader.onloadend = async () => {
                if (typeof reader.result === 'string') {
                    while (btoa(reader.result).length > MAX_BASE64_SIZE) {
                        options.maxSizeMB /= 1.2;
                        compressedFile = await imageCompression(compressedFile, options);
                        reader.readAsDataURL(compressedFile);
                    }
                    setUrlImgage(reader.result);
                }
            };

            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (name.length > 255) {
            toast.warning("Atingiu o limite de caracteres para a nome")
            setName(name.substring(0, 255));
        }
    }, [name]);

    useEffect(() => {
        const numericValue = parseFloat(goal.replace(/[^0-9,]/g, '').replace(',', '.'));
        if (numericValue > 999999999999.99) {
            setGoal('R$  999 999 999 999,99');
        }
    }, [goal]);

    useEffect(() => {
        if (description.length > 2000) {
            toast.warning("Atingiu o limite de caracteres para a descrição")
            setDescription(description.substring(0, 2000));
        }
    }, [description]);

    useEffect(() => {
        if (data) {
            setUrlImgage(data.url_image)
            setName(data.name)
            setGoal(data.goal.replace(/[\$,]/g, ''))
            setDeadline(data.deadline.substring(0, 10))
            setState(data.state)
            setCategory(data.category)
            setDescription(data.description)
        }
    }, [data]);

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
                    <title>Editar doação</title>
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
                                <h2 className={styles.title} >Editar doação</h2>
                                <div className={styles.horizontalLine}></div>
                            </div>
                            <Link href="/home" className={styles.link} >
                                <FiX size={50} className={styles.exit} />
                            </Link>
                            <div className={styles.body}>
                                <div className={styles.uploadImage}>
                                    <label htmlFor="fileInput">
                                        <div className={styles.image}>
                                            <Image src={url_image || default_image} alt="Clique para selecionar uma nova imagem" width={300} height={300} style={{ objectFit: "cover" }} />
                                        </div>
                                    </label>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </div>
                                <div className={styles.inputCenter}>
                                    <Input className={styles.input} placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    <InputMonetary className={styles.input} placeholder="Meta" value={goal} onChange={(e) => setGoal(e.target.value)} />
                                    <Input className={styles.input} placeholder="Data Limite" type="date" min={today} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                                    <div className={styles.dropDownCustom}>
                                        <Dropdown className={styles.styleDropDown} styleDropdownToggle={styles.styleDropdownToggle} styledropdownMenu={styles.styledropdownMenu} options={optionsState.slice(1)} defaultOption={state} onSelect={handleOptionStateChange} />
                                    </div>
                                </div>
                                <div className={styles.inputRight}>
                                    <div className={styles.dropDownCustom}>
                                        <Dropdown className={styles.styleDropDown} styleDropdownToggle={styles.styleDropdownToggle} styledropdownMenu={styles.styledropdownMenu} options={optionsCategory.slice(1)} defaultOption={category} onSelect={handleOptionCategoryChange} />
                                    </div>
                                    <textarea className={styles.inputArea} placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.deleteDonation} onClick={handleDeleteDonation} >
                                    <FaRegTrashAlt size={40} className={styles.delete} />
                                </div>
                                <div className={styles.button}>
                                    <Button type="button" loading={loadingCreateDonation} style={{ width: '100%' }} onClick={handleUpdateDonation} >Atualizar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
