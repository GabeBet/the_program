import Project from "./Project"

const ProjectFeed = ({ projectList }) => {
  return (
    <>
        {projectList.map(project => (
            <Project key={project.id} project={project}/>
        ))}
    </>
  )
}

export default ProjectFeed