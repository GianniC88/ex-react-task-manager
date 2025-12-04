import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
	const { id } = useParams();
	const { tasks, removeTask, updateTask } = useContext(GlobalContext)
	const navigate = useNavigate()
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const task = tasks.find(t => t.id === parseInt(id))

	if (!task) {
		return (

			<p className="error-detail">Task non trovata.</p>
		)
	}


	const handleDelete = async () => {
		try {

			await removeTask(task.id)
			alert(`"Task ${task.id} eliminata"`)
			navigate("/")
		} catch (error) {
			console.error(error)
			alert(error.message)
		}
		setShowDeleteModal(false)
	}

	const handleUpdate = async (update) => {
		try {
			await updateTask(update)
			setShowEditModal(false)
		} catch {
			console.error(error.message)
			alert(error.message)
		}
	}


	return (
		<>
			<div className="container">
				<div className="body-detail">
					<h1>Dettaglio task</h1>
				</div>
				<div className="task-details" >
					<h2>{task.title}</h2>
					<p><strong>Descrzione</strong>{task.description}</p>
					<p><strong>Stato:</strong>{task.status}</p>
					<p><strong>Data di creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
					<div className="action">
						<button className="modifica" onClick={() => setShowEditModal(true)}>Modifica</button>
						<button className="dangerous" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
					</div>
				</div>

				<Modal

					title="Conferma eliminazione della  Task "
					content={`La Task n°${task.id} verrà eliminata, sei sicuro di procedere?`}
					show={showDeleteModal}
					onClose={() => setShowDeleteModal(false)}
					onConfirm={handleDelete}
					confirmText="Elimina"

				/>
				<EditTaskModal
					task={task}
					show={showEditModal}
					onClose={() => setShowEditModal(false)}
					onSave={handleUpdate}
				/>
			</div >

		</>
	)
}