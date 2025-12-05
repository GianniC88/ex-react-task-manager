import { useContext, useState, useMemo, useCallback } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/taskRow"

//funzione debounce
function debounce(callback, delay) {
	let timer;
	return (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(value)
		}, delay)
	}
}


export default function TaskList() {
	const { tasks } = useContext(GlobalContext)
	console.log('Tasks:', tasks)

	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState(1)
	const sortIcon = sortOrder === 1 ? "↑" : "↓"
	const [searchQuery, setSearchQuery] = useState("")

	const [selectedTaskIds, setSelectedTaskIds] = useState([])

	const toggleSelection = taskId => {
		if (selectedTaskIds.includes(taskId)) {
			setSelectedTaskIds(prev => prev.filter(id => id !== taskId))
		} else {
			setSelectedTaskIds(prev => [...prev, taskId])
		}

	}

	// const debouneSearch = debounce(setSearchQuery,500);
	// const memorizedDebounceSearch = useCallback(debouneSearch,[])
	const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 500), [])


	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(prev => prev * -1)
		} else {
			setSortBy(field);
			setSortOrder(1)
		}
	}

	const filteredAndSortedTask = useMemo(() => {
		let comparison
		return [...tasks]
			.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
			.sort((a, b) => {
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
	}, [tasks, sortBy, sortOrder, searchQuery])


	return (
		<>

			<h1>Sezione Task</h1>
			<div className="task-list">
				<div>
					<input className="search-query"
						type="text"
						placeholder="Cerca Task"
						//value={searchQuery}
						onChange={e => debouncedSetSearchQuery(e.target.value)}

					/>
					<table >
						<thead>
							<tr className="table-row">
								<th></th>
								<th onClick={() => handleSort('title')}>Nome <span className="sort-arrow">{sortBy === "title" && sortIcon}</span></th>
								<th onClick={() => handleSort('status')}>Status <span className="sort-arrow">{sortBy === "status" && sortIcon}</span></th>
								<th onClick={() => handleSort('createdAt')}>Data di Creazione <span className="sort-arrow">{sortBy === "createdAt" && sortIcon}</span></th>
							</tr>
						</thead>
						<tbody>
							{filteredAndSortedTask.map(task => (
								<TaskRow
									key={task.id}
									task={task}
									cecked={selectedTaskIds.includes(task.id)}
									onToggle={toggleSelection}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div >
		</>
	)

}