import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";
import ProjectDetails from "../../components/project-details/project-details";
import {
  Loader,
  Container,
  ProjectForm,
  Message,
  ServiceForm,
  ServiceList,
} from "./../../components";

import styles from "./edit-project.module.css";

function EditProject() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
          setLoading(false);
        })
        .catch((err) => console.err(err));
    }, 1000);

    return () => clearTimeout(timer);
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

  function addService(project) {
    setMessage("");

    const lastService = project.services[project.services.length - 1];
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    lastService.id = uuidv4();

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setMessageType("error");
      project.services.pop();
      return;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => setShowServiceForm(false))
      .catch((err) => console.error(err));
  }

  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost - parseFloat(cost));

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso");
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
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={addService}
                  btnText="Adicionar Serviço"
                  projectData={project}
                />
              )}
            </div>
            <div>
              <h2>Serviços</h2>
              <Container customClass="start">
                <ServiceList services={services} handleRemove={removeService} />
              </Container>
            </div>
          </Container>
        </div>
      ) : null}
      {isLoading && <Loader />}
    </>
  );
}

export default EditProject;
