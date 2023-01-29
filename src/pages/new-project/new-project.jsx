import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../../components";
import styles from "./new-project.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createProject(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then(() =>
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso" },
        })
      )
      .catch((err) => console.error(err));
  }

  return (
    <div className={styles.new_project_container}>
      <h1>Projetos</h1>
      <p>Crie seu projeto</p>
      <ProjectForm btnText={"Criar Projeto"} handleSubmit={createProject} />
    </div>
  );
}

export default NewProject;
