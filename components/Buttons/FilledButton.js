const FilledButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${
        props.colors ? props.colors : 'bg-WSAI-Indigo-500 text-WSAI-Indigo-25'
      } ${props.className && props.className} ${
        props.transition
          ? props.transition
          : 'hover:-translate-y-0.5 focus:-translate-y-0.5 transition-transform duration-200'
      } overflow-hidden relative flex items-center justify-center py-1 px-2  rounded-md gap-x-2 focus:outline-none focus:ring `}
    >
      {props.icon}
      <span>{props.children}</span>
    </button>
  )
}

export default FilledButton
