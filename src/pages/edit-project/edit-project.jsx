import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader, Container, ProjectForm, Message } from "./../../components";

import styles from "./edit-project.module.css";

function EditProject() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();

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
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor do que o custo do projeto!");
      setMessageType("error");
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

  function toggleState() {
    setShowForm(!showForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {message && <Message type={messageType} message={message} />}
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name} </h1>
              <button className={styles.btn} onClick={toggleState}>
                {showForm ? "Fechar" : "Editar"}
              </button>
              {!showForm ? (
                <div className={styles.project_info_container}>
                  <div>
                    <p>
                      <span>Categoria: </span> {project.category.name}
                    </p>
                    <p>
                      <span>Orçamento Total: </span> R$ {project.budget}
                    </p>
                    <p>
                      <span>Utilizado: </span>R$ {project.cost}
                    </p>
                  </div>
                </div>
              ) : (
                <ProjectForm
                  handleSubmit={submit}
                  btnText="Salvar"
                  projectData={project}
                />
              )}
            </div>
          </Container>
        </div>
      ) : null}
      {isLoading && <Loader />}
    </>
  );
}

export default EditProject;
