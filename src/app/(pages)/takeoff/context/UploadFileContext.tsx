import { createContext } from "react"

export interface UploadFileContextProps {
	src: string,
	handleSrc: (data: string) => void
}

const UploadFileContext = createContext<UploadFileContextProps>({src: "", handleSrc: () => undefined})

export default UploadFileContext