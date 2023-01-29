import load from "./../../img/loading.svg";

import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={load} alt="Loading..." />
    </div>
  );
}

export default Loader;
