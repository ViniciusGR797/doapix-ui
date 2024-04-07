import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import logo from "../../public/logo.png";
import { Input } from "../components/Input";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { FiUser, FiMail } from "react-icons/fi";
import children from "../../public/children.jpg";
import donation from "../../public/donation.jpg";
import Link from "next/link";
import { validateFields } from "@/utils/validate";
import { toast } from "react-toastify";
import UserService from '../services/userService';
import { useAuth } from "@/contexts/AuthContext";
import Router from 'next/router';
import { useToastFromCookie } from "@/contexts/HookToast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    const errorMessage = validateFields({
      email: email,
      pwd: pwd,
    });

    if (errorMessage !== null) {
      toast.warning(errorMessage);
      return;
    }

    setLoading(true);

    const response = await UserService.loginUser(email, pwd)
    if (!response) {
      toast.error("Erro ao consumir API")
    } else if (response.status === 200) {
      login(response.data.id, email, response.data.access_token)
      toast.success("Logado com sucesso");
      Router.push('/home')
    } else {
      toast.error(response.data.msg)
    }

    setLoading(false);
  }

  useToastFromCookie(null, 'loginToast');

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mainDiv}>
        <div className={styles.rightBackground}>
          <Image src={donation} alt="donation" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.leftBackground}>
          <Image src={children} alt="children-smiling" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.containerCenter}>
          <Image className={styles.logo} src={logo} alt="doa-pix logo" height={130} />
          <div className={styles.login}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSignIn}>
              <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Senha" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              <Button type="submit" loading={loading} style={{ marginTop: '1.5%' }}>Entrar</Button>
            </form>
            <div className={styles.areaAnonimo}>
              <a>Ou continue como</a>
              <button className={styles.buttonAnonimo}><Link className={styles.linkAnonimo} href="/home">Doador anônimo</Link></button>
              <div className={styles.line}></div>
            </div>
            <div className={styles.footer}>
              <Link href="/sign-up" className={styles.touchableOpacity}> <FiUser size={20} style={{ verticalAlign: 'middle', marginBottom: '1px' }} /> Criar Conta</Link>
              <button className={styles.touchableOpacity}> <FiMail size={20} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Esqueci senha</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
