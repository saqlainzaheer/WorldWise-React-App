import styles from "./Button.module.css";
function Button({ children, onClickHandle, type }) {
  return (
    <button onClick={onClickHandle} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
