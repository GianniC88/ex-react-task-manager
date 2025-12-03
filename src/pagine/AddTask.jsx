import { useState, useRef, useMemo, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
import TaskList from "./TaskList";



export default function AddTask() {
	const { addTask } = useContext(GlobalContext)
	const [title, setTitle] = useState("")
	const descriptionRef = useRef()
	const statusRef = useRef()
	const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

	const errorName = useMemo(() => {
		if (!title.trim())
			return "Assegna un nome alla Task."
		if ([...title].some(char => symbols.includes(char)))
			return "Il nome della Task non può contenere simboli"
		return ""
	}, [title])

	const handleSubmit = async event => {
		event.preventDefault()
		if (errorName)
			return;

		const newTask = {
			title: title.trim(),
			description: descriptionRef.current.value,
			status: statusRef.current.value
		}
		try {
			await addTask(newTask)
			alert("Task confermata")
			setTitle("")
			descriptionRef.current.value = "";
			statusRef.current.value = "";
		} catch (error) {
			alert(error.message)

		}
		console.log("Task aggiunta:", newTask)


		// const handeleSubmit = () => {
		// 	const task = {
		// 		title,
		// 		description: descriptionRef.current.value,
		// 		status: statusRef.current.value
		// 	}
		// 	console.log("task", task)

	}
	return (
		<>
			<div className="add-task">
				<h1>Agiungi Task</h1>
				<div className="form-add-task">
					<form onSubmit={handleSubmit} >
						<div>
							<label>
								<p>Nome Task:</p>
								<input
									type="text"
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</label>
							{errorName &&
								<p className="err-message">{errorName}</p>
							}
						</div>
						<div>
							<label>
								<p>Descrizione:</p><textarea ref={descriptionRef} />
							</label>
						</div>
						<div>
							<p>Stato:</p>
							<select ref={statusRef} defaultValue="To do" required>
								{["To do", "Doing", "Done"].map((value, index) => {
									return (
										<option key={index} value={value} >{value}</option>
									)
								})}
							</select>
							{/* <select ref={statusRef} defaultValue="" >
								<option value="" disabled>Seleziona uno stato</option>
								<option>To do</option>
								<option>Doing</option>
								<option>Done</option>
							</select> */}
						</div>
						<div>
							<button type="submit" disabled={errorName}>Aggiungi Task</button>
						</div>
					</form>
				</div>
			</div>

		</>
	)
}