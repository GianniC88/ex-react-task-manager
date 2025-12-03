import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetail() {
	const { id } = useParams();
	const { tasks } = useContext(GlobalContext)

	const task = tasks.find(t => t.id === parseInt(id))

	if (!task) {
		return (

			<p className="error-detail">Task non trovata.</p>
		)
	}
	return (
		<>
			<div className="container">
				<div>
					<h1>Dettaglio task</h1>
				</div>
				<div className="task-details" >
					<h2>{task.title}</h2>
					<p><strong>Descrzione</strong>{task.description}</p>
					<p><strong>Stato:</strong>{task.status}</p>
					<p><strong>Data di creazione:</strong>{new Date(task.description).toLocaleDateString()}</p>
					<button onClick={() => console.log("Elimina Task")}>Elimina Task</button>

				</div>


			</div>

		</>
	)
}