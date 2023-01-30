import { React } from "react";
import { ProjectCard } from "./../";

function ProjectList({ projects, removeProject }) {
  return (
    <>
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
    </>
  );
}

export default ProjectList;
