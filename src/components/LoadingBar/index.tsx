import styles from "./styles.module.scss";

interface LoadingBarProps {
  percentage: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ percentage, ...rest }) => {
  const adjustedTextPercentage = Math.max(percentage, 0);
  const adjustedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div {...rest}>
      <span style={{ display: 'block', textAlign: 'right', marginBottom: '0.3rem' }}>{adjustedTextPercentage}%</span>
      <div className={styles.percentage}>
        <div className={styles.fillPercentage} style={{ width: `${adjustedPercentage}%` }} ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
