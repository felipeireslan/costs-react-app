import styles from "./container.module.css";

function Container({ children, customClass }) {
  return (
    <div className={`${styles.container} ${styles[customClass]}`}>
      {children}
    </div>
  );
}

export default Container;
