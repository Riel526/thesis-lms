const FloatingLabelInput = props => {
  return (
    <div className='relative self-center bg-transparent'>
      <input
        {...props}
        placeholder={props.id}
        name={props.name}
        id={props.id}
        className={`${props.className} peer h-10 border-b-2 border-WSAI-Indigo-50 text-WSAI-JetBlack placeholder-transparent focus:outline-none focus:border-yellow-400 bg-transparent`}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
      <label
        htmlFor={props.id}
        className='absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-default-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#B5B9DB] peer-focus:text-sm'
      >
        {props.id}
      </label>
    </div>
  )
}

export default FloatingLabelInput
