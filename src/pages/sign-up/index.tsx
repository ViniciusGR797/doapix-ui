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

const inter = Inter({ subsets: ["latin"] });

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    const errorMessage = validateFields({
      name: name,
      email: email,
      pwd: pwd,
    });
    if (errorMessage !== null) {
      toast.warning(errorMessage);
      return;
    }

    if (pwd !== repeatPwd) {
      toast.error("Senhas não coincidem!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      pwd
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
        <div className={styles.rightBackground}>
          <Image src={donation} alt="donation" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.leftBackground}>
          <Image src={children} alt="children-smiling" layout="fill" objectFit="cover" />
        </div>

        <div className={styles.containerCenter}>
          <Image className={styles.logo} src={logo} alt="doa-pix logo" height={130} />
          <div className={styles.login}>
            <h1>Cadastro</h1>
            <form className={styles.form} onSubmit={handleSignUp}>
              <Input placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Senha" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              <Input placeholder="Repita a senha" type="password" value={repeatPwd} onChange={(e) => setRepeatPwd(e.target.value)} />
              <Button type="submit" loading={loading} style={{ marginTop: '7%' }}>Criar</Button>
              <div className={styles.line}></div>
            </form>
            <div className={styles.footer}>
              <div>
                <FiUser size={20} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                <span> Já Possui uma conta?</span>
              </div>
              <Link href="/" className={styles.touchableOpacity} >Fazer Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
