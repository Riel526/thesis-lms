import { useReducer } from 'react'
import * as ACTIONS from './AppActions'
import AppContext from './AppContext'
import AppReducer from './AppReducer'
import { useRouter } from 'next/router'

const AppState = ({ children }) => {


	const router = useRouter()

	const initialState = {
		selectedStudents: [],
		selectedTeachers: [],
		selectedSubjects: [],
		selectedSections: [],
		selectedUsers: [],
		clipboardText: '',
		modalAttributes: {
			status: '',
			isOpen: false,
			customMessage: ''
		},
		searchResults: []
	}

	const [state, dispatch] = useReducer(AppReducer, initialState)

	const refreshData = () => {
		router.replace(router.asPath)
	}

	const saveData = async (fetchURL, data) => {
		try {
			let response = await fetch(fetchURL, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(data),
				signal: controller.signal
			})

			if (response.ok) {

			} else if (!response.ok) {

			}
			refreshData()
		} catch (error) {

		}
	}

	const updateData = async (fetchURL, data) => {

		try {
			let response = await fetch(fetchURL, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PATCH',
				body: JSON.stringify(data),
				signal: controller.signal
			})

			if (response.ok) {
				setModalAttributes({
					status: 'success',
					customMessage: ''
				})
				refreshData()
			} else if (!response.ok) {
				const json = await response.json()
				setModalAttributes({
					status: 'error',
					customMessage: json.message
				})
			}
		} catch (error) {
			setModalAttributes({
				status: 'error',
				customMessage: error
			})
		}
	}

	const deleteData = async (fetchURL, data, rowType) => {
		if (rowType) {
			fetchURL = `${process.env.BASE_URL}/api/${rowType}s`
		}
		fetch(fetchURL, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			signal: controller.signal
		})
			.then(res => {

			})
			.catch(error => {

			})

	}

	const setModalAttributes = modalAttributes => {
		dispatch({ type: ACTIONS.SET_MODAL_ATTRIBUTES, payload: modalAttributes })
	}



	return (
		<AppContext.Provider
			value={{
				modalAttributes: state.modalAttributes,
				refreshData,
				saveData,
				updateData,
				deleteData,
				setModalAttributes,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppState
