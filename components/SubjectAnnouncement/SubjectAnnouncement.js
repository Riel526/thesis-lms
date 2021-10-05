const SubjectAnnouncement = ({ title, content, onClick, createdAt }) => {
  return (
    <article
      onClick={onClick}
      tabIndex={0}
      className='w-56 overflow-hidden rounded-lg cursor-pointer bg-WSAI-Indigo-50 h-52 text-WSAI-JetBlack'
    >
      <header className='flex justify-between p-2 text-sm border-b border-b-WSAI-Indigo-200 bg-WSAI-Indigo-500 text-WSAI-Indigo-25 '>
        <h1 className='font-bold uppercase truncate'>{title}</h1>
        {createdAt.toString().split('T')[0]}
      </header>
      <p className='p-2 text-gray-700 break-words line-clamp-5 '>{content}</p>
    </article>
  )
}

export default SubjectAnnouncement
