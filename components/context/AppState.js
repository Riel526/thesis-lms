import { useReducer } from 'react'
import * as ACTIONS from './AppActions'
import AppContext from './AppContext'
import AppReducer from './AppReducer'
import { useRouter } from 'next/router'

const AppState = ({ children }) => {
  const router = useRouter()
  const controller = new AbortController()

  const initialState = {
    clipboardText: '',
    modalAttributes: {
      status: '',
      isOpen: false,
      customMessage: '',
    },
    moduleFile: null,
    searchResults: [],
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const saveData = async (fetchURL, data) => {
    let response = await fetch(fetchURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message == 'success') {
          setModalAttributes({
            status: 'success',
            customContent: null,
            customMessage: '',
          })
          refreshData()
        } else if (json.message == 'failed') {
          setModalAttributes({
            status: 'error',
            customMessage: json.err,
          })
        }
      })
      .catch((err) => {
        console.log(err)
        setModalAttributes({
          status: 'error',
          customMessage: err,
        })
      })
  }

  const setModuleFile = (files) => {
    dispatch({
      type: ACTIONS.SET_MODULE_FILE,
      payload: files,
    })
  }

  const updateData = async (fetchURL, data) => {
    await fetch(fetchURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message == 'success') {
          setModalAttributes({
            status: 'success',
            customContent: null,
            customMessage: '',
          })
          refreshData()
        } else if (json.message == 'failed') {
          setModalAttributes({
            status: 'error',
            customMessage: json.err,
          })
        }
      })
      .catch((err) => {
        console.log(err)
        setModalAttributes({
          status: 'error',
          customMessage: err,
        })
      })
  }

  const uploadModule = async (
    fetchURL,
    data,
    resource,
    folderName,
    isUpdate
  ) => {
    //where resource = to the module file
    const cloudinaryData = new FormData()

    cloudinaryData.append('file', resource)
    cloudinaryData.append('upload_preset', 'wp02goop')
    cloudinaryData.append('folder', folderName)

    let response = await fetch(
      `https://api.cloudinary.com/v1_1/edwin-thesis/auto/upload`,
      {
        method: 'POST',
        body: cloudinaryData,
        signal: controller.signal,
      }
    )
    let json = await response.json()

    let url = await json.url

    data = {
      ...data,
      attachedFile: url,
    }

    if (isUpdate) {
      updateData(fetchURL, data)
    } else {
      saveData(fetchURL, data)
    }
  }

  const changeProfilePhoto = async (fetchURL, image, folderName) => {
    const cloudinaryData = new FormData()

    cloudinaryData.append('file', image)
    cloudinaryData.append('upload_preset', 'wp02goop')
    cloudinaryData.append('folder', folderName)

    let response = await fetch(
      'https://api.cloudinary.com/v1_1/edwin-thesis/image/upload',
      {
        method: 'POST',
        body: cloudinaryData,
        signal: controller.signal,
      }
    )
    let json = await response.json()

    let url = await json.url

    const data = {
      image: url,
    }

    updateData(fetchURL, data)
  }

  const deleteData = async (fetchURL, data, rowType) => {
    if (rowType) {
      fetchURL = `${process.env.BASE_URL}/api/${rowType}s`
    }
    fetch(fetchURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then((res) => {})
      .catch((error) => {})
  }

  const setModalAttributes = (modalAttributes) => {
    dispatch({ type: ACTIONS.SET_MODAL_ATTRIBUTES, payload: modalAttributes })
  }

  return (
    <AppContext.Provider
      value={{
        modalAttributes: state.modalAttributes,
        moduleFile: state.moduleFile,
        refreshData,
        saveData,
        updateData,
        deleteData,
        setModalAttributes,
        changeProfilePhoto,
        setModuleFile,
        uploadModule,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppState
