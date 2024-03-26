import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import logo from "../../public/logo.png";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FiUser, FiMail } from "react-icons/fi";
import children from "../../public/children.jpg";
import donation from "../../public/donation.jpg";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>DoaPix - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mainDiv}>
        

        <div className={styles.containerCenter}>
          <Image src={logo} alt="doa-pix logo" height={200}/>
          <div className={styles.login}>
            <form className={styles.form}>
              <h1>Login</h1>
              <Input placeholder="Email" type="text" value={email} onChange={ (e) => setEmail(e.target.value)} />
              <Input placeholder="Senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
              <Button type="submit" loading={false} style={{ marginTop: '4%' }}>Entrar</Button>
              <a>Ou continue como</a>
              <button className={styles.buttonAnonimo}>Doador anonimo</button>
              <div className={styles.linha}>
                <Link href="/sign-up" className={styles.touchableOpacity}> <FiUser size={20} style={{ verticalAlign: 'middle', marginBottom: '1px' }}/> Criar Conta</Link>
                <button className={styles.touchableOpacity}> <FiMail size={20} style={{ verticalAlign: 'middle', marginBottom: '2px' }}/> Esqueci senha</button>
              </div>
            </form>
          </div>
        </div>
        
        <div className={styles.rightBackground}>
          <Image src={donation} alt="donation" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.leftBackground}>
          <Image src={children} alt="children-smiling" layout="fill" objectFit="cover" />
        </div>

        
      </div>
    </>
  );
}
