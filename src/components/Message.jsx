import styles from "./Message.module.css";

function Message({ children, type }) {
  return (
    <p className={styles[type]}>
      <span role="img">👋</span> {children}
    </p>
  );
}

export default Message;
