import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import styles from "./styles.module.scss";
import { Input } from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import { FiCopy, FiX } from "react-icons/fi";
import { Button } from "@/components/Button";
import ButtonCopy from "@/components/ButtonCopy";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Payment() {

    const handlePixCopy = (text: string): void => {
        navigator.clipboard.writeText(text)
          .then(() => {
            toast.success("Link copiado");
          })
          .catch(err => {
            toast.error("Erro ao copiar");
          });
      };

    const qr_code = "data:image/png;base64,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"
    const pix_copy = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000 5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D"
    const expiration_date = "25/03/2024 03:25:20"

    return (
        <>
            <Head>
                <title>Criar transação</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <div className={styles.header}>
                    <HeaderLogo />
                </div>
                <div className={styles.mainDiv}>
                    <div className={styles.square}>
                        <h2 className={styles.title} >Pix gerado. Conclua sua contribuição</h2>
                        <Link href="/home" className={styles.link} >
                            <FiX size={50} className={styles.exit} />
                        </Link>
                        <div className={styles.uploadImage}>
                            <div className={styles.image}>
                                <Image src={qr_code} alt={"Imagem do QR Code"} width={300} height={300} style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <p className={styles.message}>Para finalizar seu contribuição é só <strong>escanear o código QR Code</strong>. Você também pode <strong>clicar em “Copiar código Pix” e colar no app</strong> ou site do seu banco utilizando a opção “Pix copia e cola”</p>
                        <p className={styles.message}>Esse código expira em <strong>{expiration_date}</strong></p>
                        <div className={styles.buttonCopy} onClick={() => handlePixCopy(pix_copy)} >
                            <FiCopy size={50} className={styles.copy} />
                            <span>Copiar código Pix</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}