import { useEffect, useState } from "react";
import styles from "./project-form.module.css";
import Input from "../form/input";
import Select from "../form/select";
import Submit from "../form/submit";

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  function submit(e) {
    e.preventDefault();
    handleSubmit(project);
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        name="name"
        text="Nome do projeto"
        placeholder="Insira o nome do projeto"
        handleChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        name="budget"
        text="Orçamento do Projeto"
        placeholder="Insira o orçamento total"
        handleChange={handleChange}
        value={project.budget ? project.budget : 0}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleSelect={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      <Submit text={btnText} />
    </form>
  );
}

export default ProjectForm;
