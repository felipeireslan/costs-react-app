import React, { useState } from "react";
import { Input, Submit } from "./../";
import styles from "./../project-form/project-form.module.css";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }
  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          text="Nome do Serviço"
          name="name"
          placeholder="Insira o nome do serviço"
          handleChange={handleChange}
        />
        <Input
          type="number"
          text="Custo do Serviço"
          name="cost"
          placeholder="Insira o custo do serviço"
          handleChange={handleChange}
        />
        <Input
          type="text"
          text="Descrição do Serviço"
          name="description"
          placeholder="Descreva o serviço"
          handleChange={handleChange}
        />
        <Submit text={btnText} />
      </form>
    </div>
  );
}

export default ServiceForm;
