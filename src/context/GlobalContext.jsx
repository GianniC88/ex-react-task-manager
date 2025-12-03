import { createContext } from "react";
import useTasks from "../hooks/useTasks";
export const GlobalContext = createContext()



export function GlobalContextProvider({ children }) {
	const tasksData = useTasks()


	return (
		<GlobalContext.Provider value={{ ...tasksData }}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext