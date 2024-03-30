import styles from "./styles.module.scss";

interface KeyValueDisplayProps {
  attribute: string;
  value: string | number;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ attribute, value, ...rest }) => {
  return (
    <div {...rest}>
      <span className={styles.bold} >{attribute}<br /></span>
      <span className={styles.text} >{value}</span>
    </div>
  );
};

export default KeyValueDisplay;
