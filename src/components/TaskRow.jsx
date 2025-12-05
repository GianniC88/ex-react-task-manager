import { memo } from "react";
import { Link } from "react-router-dom"


const TaskRow = memo(({ task, checked, onToggle }) => {
	const statusClsssName = task.status.replace(" ", "").toLowerCase();

	return (
		<tr>
			<td>
				<input
					type="checkbox"
					checked={checked}
					onChange={() => onToggle(task.id)}

				/>
			</td>
			<td><Link to={`/task/${task.id}`}>{task.title}</Link> </td>
			<td className={statusClsssName}>{task.status}</td>
			<td>{new Date(task.createdAt).toLocaleDateString()}</td>
		</tr>
	)
})

export default TaskRow