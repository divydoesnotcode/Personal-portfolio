import { selectedWork } from "../../data/selectedWork";
import { track } from "../../lib/analytics";

export function SelectedWork({ source }) {
  return (
    <section className="connect-section" aria-labelledby="connect-work-heading">
      <h2 id="connect-work-heading">Selected Work</h2>
      <ul className="connect-work">
        {selectedWork.map((project) => (
          <li key={project.title}>
            <a
              className="connect-work-item"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("project_click", { source, title: project.title })}
            >
              <div>
                <p className="connect-work-title">{project.title}</p>
                <p className="connect-work-copy">{project.description}</p>
                <p className="connect-work-meta">{project.category}</p>
              </div>
              <span className="connect-work-go">View</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
