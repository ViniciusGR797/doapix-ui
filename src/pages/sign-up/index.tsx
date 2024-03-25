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
import hands from "../../../public/hands.jpg";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent){
      event.preventDefault();
  
      if(name === '' || email === '' || password === '' || repeatPassword === ''){
        console.log("name: " + name)
        console.log("email: " + email)
        console.log("password: " + password)
        console.log("repeat: " + repeatPassword)
        toast.warning("Preencha todos os campos para continuar!");
        return;
      }

      if(password !== repeatPassword){
        toast.error("Senhas não coincidem!");
        return;
      }
  
      setLoading(true);
  
      let data = {
        name,
        email,
        password
      }
  
      await signUp(data);
  
      setLoading(false);
    }

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
            <form className={styles.form} onSubmit={handleSignUp}>
              <h1>Cadastro</h1>
              <Input placeholder="Nome" type="text" value={name} onChange={ (e) => setName(e.target.value)} />
              <Input placeholder="Email" type="text" value={email} onChange={ (e) => setEmail(e.target.value)} />
              <Input placeholder="Senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
              <Input placeholder="Repita a senha" type="password" value={repeatPassword} onChange={ (e) => setRepeatPassword(e.target.value)} />
              <Button type="submit" loading={loading} style={{ marginTop: '7%' }}>Criar</Button>
              <div className={styles.linha}>
              <FiUser size={20} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                <span> Já Possui uma conta?</span>
                <Link href="/" className={styles.touchableOpacity} >Fazer Login</Link>
              </div>
            </form>
          </div>
        </div>
        
        <div className={styles.rightBackground}>
          <Image src={hands} alt="hands" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.leftBackground}>
          <Image src={children} alt="children-smiling" layout="fill" objectFit="cover" />
        </div>

        
      </div>
    </>
  );
}
