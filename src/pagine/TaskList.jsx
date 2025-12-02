import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
export default function TaskList() {
	const { tasks } = useContext(GlobalContext)
	console.log('Tasks:', tasks)
	return <div className="task-list">
		<h1>Sezione Task</h1>
		<p>Task disponibili</p>
	</div>
}