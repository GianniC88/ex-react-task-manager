import { useRef, useState } from "react";
import Modal from "./Modal"


export default function EditTaskModal({ show, onClose, task, onSave }) {

	const [editTask, setEditTask] = useState(task);
	const formSubmitRef = useRef();
	const handleSubmit = e => {
		e.preventDefault();
		onSave(editTask)
	}


	const changeEditTask = (key, event) => {
		setEditTask(prev => ({ ...prev, [key]: event.target.value }))
	}
	const { title, description, status } = editTask
	return (
		<Modal
			title="modifica Task"
			content={
				<form ref={changeEditTask} onSubmit={handleSubmit}>
					<label>
						Nome Task
						<input
							type="text"
							value={title}
							onChange={e => changeEditTask('title', e)}
						/>
					</label>
					<label >
						Descrizione:
						<textarea
							value={description}
							onChange={e => changeEditTask('description', e)}
						/>
					</label>
					<label >
						Stato:
						<select
							value={status}
							onChange={e => changeEditTask('status', e)}
							required
						>
							{["To do", "Doing", "Done"].map((value, index) => (
								<option key={index} value={value}>{value}</option>
							))}
						</select>
					</label>
				</form>

			}
			confirmText="Salva"
			show={show}
			onCLose={onClose}
			onConfirm={() => formSubmitRef.current.requestSubmit()}
		/>
	)
}












// Creare il componente EditTaskModal.jsx:

// Deve accettare i seguenti props:
// show(boolean): determina se la modale è visibile.
// 	onClose(function): funzione per chiudere la modale.
// 		task(object): oggetto che rappresenta il task da modificare.
// 			onSave(function): funzione che viene chiamata al salvataggio con il task aggiornato.
// Utilizzare il componente Modal per creare la modale di modifica, passandogli i seguenti valori:
// title: "Modifica Task".
// 	content: un form contenente i campi del task da modificare.
// 		confirmText: "Salva".
// 			onConfirm: deve attivare il submit del form.


// 💡 Importante:
// Per attivare il submit del form, dobbiamo ottenere un riferimento diretto al form all'interno del componente. Creiamo una ref con useRef() e associamola al form.
// Questo ci permette di chiamare il metodo editFormRef.current.requestSubmit() quando l'utente clicca su "Salva" nella modale, simulando il comportamento di un normale submit.