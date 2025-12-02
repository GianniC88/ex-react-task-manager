import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/taskRow"



export default function TaskList() {
	const { tasks } = useContext(GlobalContext)
	console.log('Tasks:', tasks)
	return (
		<>

			<h1>Sezione Task</h1>
			<div className="task-list">
				<div>
					<table >
						<thead>
							<tr className="table-row">
								<th>Nome</th>
								<th>Status</th>
								<th>Data di Creazione</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map(task => (
								<TaskRow key={task.id} task={task} />
							))}
						</tbody>
					</table>
				</div>
			</div >
		</>
	)

}