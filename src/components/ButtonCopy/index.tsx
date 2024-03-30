import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { FiCopy } from "react-icons/fi";
import KeyValueDisplay from "../KeyValueDisplay";

interface ButtonCopyProps {
  attribute: string;
  value: string;
}

const ButtonCopy: React.FC<ButtonCopyProps> = ({ attribute, value, ...rest }) => {
  const handleButtonCopyLinkClick = (text: string): void => {
    const formattedValue = "https://www.doapix.com.br/" + text

    if (!navigator.clipboard) {
      toast.warning("O navegador não suporta copiar link");
      return;
    }

    navigator.clipboard.writeText(formattedValue)
      .then(() => {
        toast.success("Link copiado");
      })
      .catch(err => {
        toast.error("Erro ao copiar");
      });
  };

  const formatLink = (str: string): string => {
    const formattedValue = "https://www.doapix.com.br/" + str.substring(0, 3) + "..."

    return formattedValue;
  };

  return (
    <div className={styles.buttonCopy} {...rest} onClick={() => handleButtonCopyLinkClick(value)} >
      <FiCopy size={50} className={styles.copy} />
      <KeyValueDisplay attribute={attribute} value={formatLink(value)} />
    </div>
  );
};

export default ButtonCopy;
