import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import { ProjectType } from "../types";
import ProjectCard from "./ProjectCard";

type Props = {};

const Projects: React.FC<Props> = ({}) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong fetching projects :(</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <>
          <div className="row mt-4">
            {data.projects.map((project: ProjectType) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      ) : (
        <p>No Projects...</p>
      )}
    </>
  );
};

export default Projects;
