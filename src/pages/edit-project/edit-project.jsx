import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "../../components/project-details/project-details";
import { Loader, Container, ProjectForm, Message } from "./../../components";

import styles from "./edit-project.module.css";

function EditProject() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => console.err(err));
    }, 1000);
  }, [id]);

  function submit(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor do que o custo do projeto!");
      setMessageType("error");
      return;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowForm(false);
        setMessage("Projeto atualizado com sucesso!");
        setMessageType("success");
      })
      .catch((err) => console.error(err));
  }

  function toggleDetailsState() {
    setShowForm(!showForm);
  }

  function toggleServiceState() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {message && <Message type={messageType} message={message} />}
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name} </h1>
              <button className={styles.btn} onClick={toggleDetailsState}>
                {showForm ? "Fechar" : "Editar"}
              </button>
              {!showForm ? (
                <ProjectDetails project={project} />
              ) : (
                <ProjectForm
                  handleSubmit={submit}
                  btnText="Salvar"
                  projectData={project}
                />
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço: </h2>
              <button className={styles.btn} onClick={toggleServiceState}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
            </div>
            <div>
              <h2>Serviços</h2>
              <p>Itens...</p>
            </div>
          </Container>
        </div>
      ) : null}
      {isLoading && <Loader />}
    </>
  );
}

export default EditProject;
