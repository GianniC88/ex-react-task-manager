import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/taskRow"



export default function TaskList() {
	const { tasks } = useContext(GlobalContext)
	console.log('Tasks:', tasks)

	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState(1)
	const sortIcon = sortOrder === 1 ? "↑" : "↓"

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(prev => prev * -1)
		} else {
			setSortBy(field);
			setSortOrder(1)
		}
	}
	return (
		<>

			<h1>Sezione Task</h1>
			<div className="task-list">
				<div>
					<table >
						<thead>
							<tr className="table-row">
								<th onClick={() => handleSort('title')}>Nome <span className="sort-arrow">{sortBy === "title" && sortIcon}</span></th>
								<th onClick={() => handleSort('status')}>Status <span className="sort-arrow">{sortBy === "status" && sortIcon}</span></th>
								<th onClick={() => handleSort('createdAt')}>Data di Creazione <span className="sort-arrow">{sortBy === "createdAt" && sortIcon}</span></th>
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