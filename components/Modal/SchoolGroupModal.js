import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from '../Buttons/FilledButton'
import { Dialog } from '@headlessui/react'
import Multiselect from 'multiselect-react-dropdown'
import AvatarUpload from './../AvatarUpload/AvatarUpload'
import { useState, useEffect } from 'react'

export default function CreateGroupModal({
  setModalAttributes,
  setIsOpen,
  isOpen,
  isJoinGroup,
  teacherOptions,
  studentOptions,
  uploadFiles,
  session,
}) {
  const [groupDetails, setGroupDetails] = useState({
    image: null,
    groupName: '',
    studentMembers: [],
    teacherMembers: [],
    inviteCode: '',
  })

  const [tempImage, setTempImage] = useState()

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    setGroupDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSelectStudent = (selectedItem) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      studentMembers: [...prevState.studentMembers, selectedItem._id],
    }))
  }

  const handleDiselectStudent = (selectedItem) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      studentMembers: prevState.studentMembers.filter(
        (prevMem) => prevMem._id != selectedItem._id
      ),
    }))
  }

  const handleSelectTeacher = (selectedItem) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      teacherMembers: [...prevState.teacherMembers, selectedItem._id],
    }))
  }

  const handleDiselectTeacher = (selectedItem) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      teacherMembers: prevState.teacherMembers.filter(
        (prevMem) => prevMem._id != selectedItem._id
      ),
    }))
  }

  const resetFields = () => {
    setTempImage('')
    setGroupDetails({
      image: null,
      groupName: '',
      studentMembers: [],
      teacherMembers: [],
      inviteCode: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      ...groupDetails,
      createdBy: session.user._id,
    }
    
    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    if (!isJoinGroup) {
      uploadFiles(
        `${process.env.BASE_URL}/api/groups?role=teacher`,
        data,
        tempImage,
        'Groups',
        false
      )
    } else if (isJoinGroup) {
      //patch request to the group
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          resetFields()
          setIsOpen(false)
        }}
        className="fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80" />

        <div className={`relative z-50 `}>
          <div
            className={` bg-WSAI-Indigo-25 ${
              !isJoinGroup ? 'min-h-[40rem]' : 'h-52'
            } text-WSAI-JetBlack flex flex-col w-[30rem] rounded-md`}
          >
            <header className="w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100">
              {!isJoinGroup ? 'Create' : 'Join'} Group
            </header>
            {!isJoinGroup ? (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col p-2 gap-y-4"
              >
                <div className="flex flex-col items-center gap-y-1">
                  <AvatarUpload
                    id="groupImage"
                    name="groupImage"
                    newImage={groupDetails.image}
                    onChange={(e) => setTempImage(e.target.files[0])}
                    oldImage={tempImage}
                  />
                  <label htmlFor="Group Image">*Group Image:</label>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Group Name">*Group Name:</label>
                  <input
                    required
                    onChange={(e) => handleChange(e)}
                    value={groupDetails.groupName}
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5  shadow-inner bg-WSAI-Indigo-100"
                    name="groupName"
                    id="Group Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="Select Student">Student Members:</label>
                    <Multiselect
                      id="Select Student"
                      onSelect={(selectedList, selectedItem) =>
                        handleSelectStudent(selectedItem)
                      }
                      onRemove={(selectedList, selectedItem) =>
                        handleDiselectStudent(selectedItem)
                      }
                      displayValue="name"
                      avoidHighlightFirstOption={true}
                      options={studentOptions}
                      style={{
                        multiselectContainer: {
                          color: '#585A6B',
                          padding: '0px',
                        },
                        searchBox: {
                          backgroundColor: '#D3D6ED',
                          border: 'none',
                          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                        },
                        optionContainer: {
                          backgroundColor: '#EDE9FE',
                        },
                        chips: {
                          background: '#2a379f',
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="Select Teacher">Teacher Members:</label>
                    <Multiselect
                      id="Select Teacher"
                      onSelect={(selectedList, selectedItem) =>
                        handleSelectTeacher(selectedItem)
                      }
                      onRemove={(selectedList, selectedItem) =>
                        handleDiselectTeacher(selectedItem)
                      }
                      avoidHighlightFirstOption={true}
                      displayValue="name"
                      options={teacherOptions}
                      style={{
                        multiselectContainer: {
                          color: '#585A6B',
                          padding: '0px',
                        },
                        searchBox: {
                          backgroundColor: '#D3D6ED',
                          border: 'none',
                          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                        },
                        optionContainer: {
                          backgroundColor: '#EDE9FE',
                        },
                        chips: {
                          background: '#2a379f',
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Invite Code">*Invite Code:</label>
                  <input
                    value={groupDetails.inviteCode}
                    onChange={(e) => handleChange(e)}
                    maxLength={6}
                    required
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5  shadow-inner bg-WSAI-Indigo-100"
                    name="inviteCode"
                    id="Invite Code"
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                  <BorderedButton
                    colors={
                      'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      resetFields()
                      setIsOpen(false)
                    }}
                    className="relative z-50 "
                  >
                    Cancel
                  </BorderedButton>
                  <FilledButton>Submit</FilledButton>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col p-2 gap-y-4"
              >
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Invite Code">*Invite Code:</label>
                  <input
                    required
                    onChange={(e) => handleChange(e)}
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 shadow-inner bg-WSAI-Indigo-150"
                    name="inviteCode"
                    id="Invite Code"
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                  <BorderedButton
                    colors={
                      'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      resetFields()
                      setIsOpen(false)
                    }}
                    className="relative z-50 "
                  >
                    Cancel
                  </BorderedButton>
                  <FilledButton>Submit</FilledButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </Dialog>
    </>
  )
}
