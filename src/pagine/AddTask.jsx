import { useState, useRef } from "react"
import TaskList from "./TaskList"


export default function AddTask() {
	const [title, setTitle] = useState("")
	const descriptionRef = useRef()
	const statusRef = useRef()
	return (
		<>
			<div className="add-task">
				<h1>
					Agiungi Task
				</h1>
				<div className="form-add-task">
					<form >
						<div>
							<label>
								<p>Nome Task:</p>
								<input
									type="text"
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</label>
						</div>
						<div>
							<label>
								<p>Descrizione:</p><textarea ref={descriptionRef} />

							</label>
						</div>
						<div>
							<p>Stato:</p>
							<select ref={statusRef} defaultValue="" >
								<option value="" disabled>Seleziona uno stato</option>
								<option>To do</option>
								<option>Doing</option>
								<option>Done</option>
							</select>
						</div>
					</form>
				</div>
			</div>

		</>
	)
}