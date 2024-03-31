import styles from "./styles.module.scss";
import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import { Button } from "@/components/Button";
import { FormEvent, useState } from "react";
import Router from 'next/router';
import { toast } from "react-toastify";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/Input";
import { validateFields } from "@/utils/validate";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pix_key, setPixKey] = useState('');
    const [pwd, setPwd] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);

    async function handleUpdateProfile(event: FormEvent) {
        event.preventDefault();

        const errorMessage = validateFields({
            name: name,
            email: email,
            pwd: pwd,
            pix_key: pix_key
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
        let data = {
            name,
            email,
            pwd,
            pix_key
        }

        console.log(data)

        // await updateUser(data);

        toast.success("Perfil atualizado")
        setLoadingUpdateUser(false);
    }

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
                                <Input className={styles.input} placeholder="Chave Pix" type="text" value={pix_key} onChange={(e) => setPixKey(e.target.value)} />
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
