import React from 'react'
import { LinkButton } from "../../components";

import styles from "./home.module.css";
import savings from "./../../img/savings.svg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comere a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/projects/new-project" text="Criar Projeto" />
      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
