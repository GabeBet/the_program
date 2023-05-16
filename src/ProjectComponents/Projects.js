import { Link } from "react-router-dom"
import ProjectFeed from "./ProjectFeed"

const Projects = ({ projectList }) => {
  return (
    <main className='Projects'>
      <h2>Projects</h2> 
      <Link to={'/add-project'}><button className="addButton">Add Project</button></Link>

      {projectList.length ? (
        <ProjectFeed projectList={projectList} />
      ) : (
        <p style={{ marginTop: "2rem"}}>
          No Projects Yet
        </p>
      )}
    </main>
  )
}

export default Projects