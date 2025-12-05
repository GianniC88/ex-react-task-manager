import { useContext, useState, useMemo } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/taskRow"



export default function TaskList() {
	const { tasks } = useContext(GlobalContext)
	console.log('Tasks:', tasks)

	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState(1)
	const sortIcon = sortOrder === 1 ? "↑" : "↓"
	const [searchQuery, setSearchQuery] = useState()


	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(prev => prev * -1)
		} else {
			setSortBy(field);
			setSortOrder(1)
		}
	}

	const sortedTask = useMemo(() => {
		let comparison
		return [...tasks].sort((a, b) => {
			if (sortBy === 'title') {
				comparison = a.title.localeCompare(b.title)

			} else if (sortBy === 'status') {
				const statusOption = ["To do", "Doing", "Done"];
				comparison = statusOption.indexOf(a.status) - statusOption.indexOf(b.status);
			} else if (sortBy === 'createdAt') {
				const dateA = new Date(a.createdAt).getTime()
				const dateB = new Date(b.createdAt).getTime()
				comparison = dateA - dateB


			}
			return comparison * sortOrder
		})
	}, [tasks, sortBy, sortOrder])


	return (
		<>

			<h1>Sezione Task</h1>
			<div className="task-list">
				<div>
					<input className="search-query"
						type="text"
						placeholder="Cerca Task"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}

					/>
					<table >
						<thead>
							<tr className="table-row">
								<th onClick={() => handleSort('title')}>Nome <span className="sort-arrow">{sortBy === "title" && sortIcon}</span></th>
								<th onClick={() => handleSort('status')}>Status <span className="sort-arrow">{sortBy === "status" && sortIcon}</span></th>
								<th onClick={() => handleSort('createdAt')}>Data di Creazione <span className="sort-arrow">{sortBy === "createdAt" && sortIcon}</span></th>
							</tr>
						</thead>
						<tbody>
							{sortedTask.map(task => (
								<TaskRow key={task.id} task={task} />
							))}
						</tbody>
					</table>
				</div>
			</div >
		</>
	)

}