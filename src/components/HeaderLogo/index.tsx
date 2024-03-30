import styles from "./styles.module.scss";
import Image from 'next/image';
import Link from "next/link";
import logo from "../../../public/logo.png";

const HeaderLogo: React.FC = (...rest) => {
  return (
    <Link href="/home" className={styles.link} {...rest} >
      <div className={styles.headerLogo}>
        <Image className={styles.logo} src={logo} alt="doa-pix logo" height={130} />
        <h1 className={styles.headerTitle}>Doa Pix</h1>
      </div>
    </Link>
  );
};

export default HeaderLogo;
