import { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext()
const { VITE_API_URL } = import.meta.env


export function GlobalContextProvider({ children }) {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		fetch(`${VITE_API_URL}/tasks`)
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch(error => console.error(error))
	}, [])
	return (
		<GlobalContext.Provider value={{ tasks, setTasks }}>
			{children}
		</GlobalContext.Provider>
	)
}
