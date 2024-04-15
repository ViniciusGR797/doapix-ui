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
import { useAuth } from "@/contexts/AuthContext";
import { Dropdown } from "@/components/Dropdown";
import { useOptions } from "@/contexts/OptionsContext";
import { InputPixKey } from "@/components/InputPixKey";
import { FaSpinner } from 'react-icons/fa';
import UserService from '../../services/userService';

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
    interface User {
        id: string;
        name: string;
        email: string;
        pwd: string;
        pix_key: string;
        pix_key_type: string;
        created_at: string;
    }

    const { optionsPixKey } = useOptions();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pix_key, setPixKey] = useState('');
    const [pix_key_type, setPixKeyType] = useState('');
    const [pwd, setPwd] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<User | null>(null);

    const handleoptionsPixKeyChange = (option: string) => {
        setPixKeyType(option);
    };

    const getFormat = (option: string) => {
        switch (option) {
            case 'CPF':
                return '###.###.###-##';
            case 'CNPJ':
                return '##.###.###/####-##';
            case 'Telefone':
                return '(##) # ####-####';
            default:
                return '';
        }
    }

    async function handleUpdateProfile(event: FormEvent) {
        event.preventDefault();

        const errorMessage = validateFields({
            name: name,
            email: email,
            pwd: pwd,
            pix: {
                pix_key: pix_key,
                pix_key_type: pix_key_type
            }
        });
        if (errorMessage !== null) {
            toast.warning(errorMessage);
            return;
        }
        if (pwd !== repeatPwd) {
            toast.error("Senhas não coincidem");
            return;
        }

        setLoadingUpdateUser(true);

        const response = await UserService.updateUser(
            name,
            email,
            pwd,
            pix_key,
            pix_key_type
        )
        if (!response) {
            toast.error("Erro ao consumir API")
        } else if (response.status === 200) {
            toast.success("Perfil atualizado com sucesso");
            Router.push('/home')
        } else {
            toast.error(response.data.msg)
        }

        setLoadingUpdateUser(false);
    }

    useEffect(() => {
        if (name.length > 255) {
            toast.warning("Atingiu o limite de caracteres para o nome")
            setName(name.substring(0, 255));
        }
    }, [name]);

    useEffect(() => {
        if (email.length > 255) {
            toast.warning("Atingiu o limite de caracteres para o email")
            setEmail(email.substring(0, 255));
        }
    }, [email]);

    useEffect(() => {
        if (pix_key && pix_key.length > 255) {
            toast.warning("Atingiu o limite de caracteres para a chave pix")
            setPixKey(pix_key.substring(0, 255));
        }
    }, [pix_key]);

    useEffect(() => {
        if (pwd.length > 255 || repeatPwd.length > 255) {
            toast.warning("Atingiu o limite de caracteres para a senha")
            setPwd(pwd.substring(0, 255));
            setPwd(repeatPwd.substring(0, 255));
        }
    }, [pwd, repeatPwd]);

    useEffect(() => {
        if (pix_key) {
            setPixKey(pix_key.replace(/\.|_|-|\//g, ""))
            switch (pix_key_type) {
                case "CPF":
                case "Telefone":
                    setPixKey(pix_key.replace(/\D/g, "").substring(0, 11))
                    break;
                case "CNPJ":
                    setPixKey(pix_key.replace(/\D/g, "").substring(0, 14))
                    break;
            }
        }
    }, [pix_key_type]);

    useEffect(() => {
        if (data) {
            setName(data.name)
            setEmail(data.email)
            setPixKey(data.pix_key)
            setPixKeyType(data.pix_key_type)
        }
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await UserService.getUserMe()
            if (!response) {
                toast.error("Erro ao consumir API")
            } else {
                switch (response.status) {
                    case 200:
                        setData(response.data);
                        break;
                    case 404:
                        toast.error(response.data.msg)
                        Router.push('/home')
                        break;
                    default:
                        toast.error(response.data.msg)
                }
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

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
                    <title>Perfil</title>
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
                                <h2 className={styles.title} >Editar Perfil</h2>
                                <div className={styles.horizontalLine}></div>
                            </div>
                            <Link href="/home" className={styles.link} >
                                <FiX size={50} className={styles.exit} />
                            </Link>
                            <div className={styles.body}>
                                <div className={styles.updateInfo}>
                                    <Input className={styles.input} placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    <Input className={styles.input} placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                                    <div className={styles.pixKey}>
                                        <InputPixKey className={styles.input} placeholder="Chave Pix" format={getFormat(pix_key_type)} type="text" value={pix_key} onChange={(e) => setPixKey(e.target.value)} />
                                        <Dropdown styleDropdownToggle={styles.styleDropdownToggle} styledropdownMenu={styles.styledropdownMenu} options={optionsPixKey} defaultOption={pix_key_type} onSelect={handleoptionsPixKeyChange} />
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.updatePwd}>
                                    <Input className={styles.input} placeholder="Senha" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                                    <Input className={styles.input} placeholder="Repita a senha" type="password" value={repeatPwd} onChange={(e) => setRepeatPwd(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.button}>
                                    <Button type="button" loading={loadingUpdateUser} style={{ width: '100%' }} onClick={handleUpdateProfile} >Salvar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
