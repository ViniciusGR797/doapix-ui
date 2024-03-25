import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import logo from "../../public/logo.png";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

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
      
        <div className={styles.containerCenter}>
          <Image src={logo} alt="doa-pix logo" height={200}/>
          <div className={styles.login}>
            <form className={styles.form}>
                <h1>Login</h1>
                <Input placeholder="Email" type="text" value={email} onChange={ (e) => setEmail(e.target.value)} />
                <Input placeholder="Senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                <Button type="submit" loading={false}>Entrar</Button>
                <a>Ou continue como</a>
                <button className={styles.buttonAnonimo}>Doador anonimo</button>

                <div>
                  <button className={styles.touchableOpacity}>Criar Conta</button>
                  <button className={styles.touchableOpacity}>Esqueci senha</button>
                </div>
            </form>
          </div>
          </div>
          
    </>
  );
}
