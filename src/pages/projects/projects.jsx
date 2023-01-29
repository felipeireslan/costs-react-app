import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Message,
  Container,
  LinkButton,
  ProjectCard,
  Loader,
} from "../../components";

import styles from "./projects.module.css";

function Projects() {
  const [isLoading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [pMessage, setPMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }, 1000);

    return () => clearTimeout(timer)
  }, []);

  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
        setPMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={styles.project_container}>
      {message && <Message message={message} type="success" />}
      {pMessage && <Message message={pMessage} type="success" />}
      <div className={styles.title_container}>
        <h1>Projetos</h1>
        <LinkButton to="/projects/new-project" text="Criar Projeto" />
      </div>
      <Container customClass="start">
        {projects?.length > 0 &&
          projects.map(({ id, name, category, budget }) => (
            <ProjectCard
              key={id}
              id={id}
              name={name}
              category={category.name}
              budget={budget}
              handleRemove={removeProject}
            />
          ))}
        {isLoading && <Loader />}
        {!isLoading && projects.length <= 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
