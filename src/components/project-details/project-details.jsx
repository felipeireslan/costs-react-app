import React from 'react'
import styles from "./project-details.module.css";

function ProjectDetails({ project }) {
  return (
    <>
      {project.name && (
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
      )}
    </>
  );
}

export default ProjectDetails;
