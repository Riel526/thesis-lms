import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from '../Buttons/FilledButton'
import { Dialog } from '@headlessui/react'
import Multiselect from 'multiselect-react-dropdown'
import AvatarUpload from './../AvatarUpload/AvatarUpload'
import { useState } from 'react'

export default function CreateGroupModal({
  setModalAttributes,
  setIsOpen,
  isOpen,
  isJoinGroup,
  options,
  selectedGroupMembers,
  handleSelect,
  handleDiselect,
}) {
  const [groupDetails, setGroupDetails] = useState({
    image: null,
    groupName: '',
    members: [],
    inviteCode: '',
  })

  const [tempImage, setTempImage] = useState()

  const handleSelectMember = (selectedList) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      members: [...prevState.members, ...selectedList],
    }))
  }

  const handleDiselectMember = (selectedItem) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      members: prevState.members.filter(
        (prevMem) => prevMem._id != selectedItem._id
      ),
    }))
  }

  const resetFields = () => {

    setTempImage('')
    setGroupDetails({
      image: null,
      groupName: '',
      members: [],
      inviteCode: '',
    })
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80" />

        <div className={`relative z-50 `}>
          <div
            className={` bg-WSAI-Indigo-25 min-h-[40rem] text-WSAI-JetBlack flex flex-col w-[30rem] rounded-md`}
          >
            <header className="w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100">
              {!isJoinGroup ? 'Create' : 'Join'} Group
            </header>
            {!isJoinGroup ? (
              <form className="flex flex-col p-2 gap-y-4">
                <div className="flex flex-col items-center gap-y-1">
                  <AvatarUpload
                    id="groupImage"
                    name="groupImage"
                    newImage={groupDetails.image}
                    onChange={(e) => setTempImage(e.target.files[0])}
                    oldImage={tempImage}
                  />
                  <label htmlFor="Announcement Title">*Group Image:</label>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Announcement Title">*Group Name:</label>
                  <input
                    required
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5  shadow-inner bg-WSAI-Indigo-100"
                    name="announcementTitle"
                    id="Announcement Title"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Select Member">*Members:</label>
                  <Multiselect
                    id="Select Member"
                    required
                    selectedValues={groupDetails.members}
                    avoidHighlightFirstOption={true}
                    onSelect={(selectedList) =>
                      handleSelectMember(selectedList)
                    }
                    onRemove={(selectedItem) =>
                      handleDiselectMember(selectedItem)
                    }
                    displayValue="name"
                    options={options}
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
                  <label htmlFor="Invite Code">Invite Code:</label>
                  <input
                    maxLength={6}
                    required
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5  shadow-inner bg-WSAI-Indigo-100"
                    name="inviteCode"
                    id="Invite COde"
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                  <BorderedButton
                    colors={
                      'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      resetFields();
                      setIsOpen(false);
                    }}
                    className="relative z-50 "
                  >
                    Cancel
                  </BorderedButton>
                  <FilledButton>Submit</FilledButton>
                </div>
              </form>
            ) : (
              <form className="flex flex-col p-2 gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="Announcement Title">Invite Code:</label>
                  <input
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 shadow-inner bg-WSAI-Indigo-150"
                    name="announcementTitle"
                    id="Announcement Title"
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                  <BorderedButton
                    colors={
                      'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      resetFields();
                      setIsOpen(false);
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
