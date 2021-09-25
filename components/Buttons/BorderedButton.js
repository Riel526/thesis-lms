import { ViewAllIcon } from '../Icons/Icons'

const BorderedButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${
        props.colors
          ? props.colors
          : 'hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-25 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-25 border-WSAI-Indigo-500 text-WSAI-Indigo-500'
      } flex items-center justify-center h-10 font-bold transition-colors duration-200 border-2 rounded-md focus:outline-none gap-x-2 py-1 px-2`}
    >
      {props.icon}
      <span>{props.children}</span>
    </button>
  )
}

export default BorderedButton
