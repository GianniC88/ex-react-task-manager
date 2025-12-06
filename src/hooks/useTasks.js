import { useEffect, useState } from "react";

const { VITE_API_URL } = import.meta.env


export default function useTasks() {

	const [tasks, setTasks] = useState([])

	useEffect(() => {
		fetch(`${VITE_API_URL}/tasks`)
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch(error => console.error(error))
	}, [])


	const addTask = async newTask => {
		const taskExist = tasks.some(t => t.title.toLowerCase() === newTask.title.toLowerCase())
		if (taskExist) {
			throw new Error("Cambiare nome Task perchè già esistente!")
		}


		const response = await fetch(`${VITE_API_URL}/tasks`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask)
		})
		const { success, message, task } = await response.json()
		if (!success) throw new Error(message);
		setTasks(prev => [...prev, task])
	}

	const removeTask = async taskID => {
		const response = await fetch(`${VITE_API_URL}/tasks/${taskID}`, {
			method: 'DELETE'
		})
		const { success, message } = await response.json()
		if (!success) throw new Error(message);
		setTasks(prev => prev.filter(task => task.id !== taskID))
	}


	const removeMultipleTask = async taskIds => {
		const deleteRequests = taskIds.map(taskId =>
			fetch(`${VITE_API_URL}/tasks/${taskId}`, { method: 'DELETE' })
				.then(res => res.json())
		)


		const results = await Promise.allSettled(deleteRequests)

		const fullfieldDeletions = []
		const rejectedDeletions = []

		results.forEach((result, index) => {
			const taskId = taskIds[index]
			if (result.status === 'fulfilled' && result.value.success) {
				fullfieldDeletions.push(taskId)
			} else {
				rejectedDeletions.push(taskId)
			}
		})
		if (fullfieldDeletions.length > 0) {
			setTasks(prev => prev.filter(t => !fullfieldDeletions.includes(t.id)))
		}

		if (rejectedDeletions.length > 0) {
			throw new Error(`Errore nell'eliminazione delle task con id:${rejectedDeletions.join(",")}`)
		}



		console.log(results)
	}

	const updateTask = async updatedTask => {
		const taskWithSameTitle = tasks.find(t => t.title.toLowerCase() === updatedTask.title.toLowerCase())
		if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
			throw new Error("Cambiare nome Task perchè già esistente!")
		}

		const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedTask)
		});
		const { success, message, task: newTask } = await response.json()
		if (!success) throw new Error(message);

		setTasks(prev => prev.map(
			oldTask => oldTask.id === newTask.id ? newTask : oldTask))

		return { success: true, message: "Task modificata correttamente" }
	}

	return { tasks, addTask, removeTask, updateTask, removeMultipleTask }
}