import { ViewAllIcon } from '../Icons/Icons'

const ViewAllButton = (props) => {
  return (
    <button onClick={props.onClick} className="flex items-center justify-center h-10 font-bold transition-colors duration-200 border-2 rounded-md hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-25 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-25 focus:outline-none w-28 gap-x-2 border-WSAI-Indigo-500 text-WSAI-Indigo-500">
      <ViewAllIcon className="w-5 h-5 fill-current" />
      <span>See All</span>
    </button>
  )
}

export default ViewAllButton
