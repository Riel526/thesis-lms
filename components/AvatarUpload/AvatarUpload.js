import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const AvatarUpload = (props) => {
  const [image, setImage] = useState('')

  useEffect(() => {
    setImage('')
    props.newImage && setImage(props.newImage)
  }, [props.newImage])

  //To show image to the DOM
  useEffect(() => {
    setImage('')
    if (props.oldImage) {
      const reader = new FileReader()
      reader.onloadend = showImage
      reader.readAsDataURL(props.oldImage)
    }
  }, [props.oldImage])

  const showImage = (e) => {
    setImage(e.target.result)
  }

  const filePickerRef = useRef()

  return (
    <>
      <label
        htmlFor={props.id}
        tabIndex={0}
        onKeyDown={(e) => {
          if(e.key == ('Enter')){
            console.log(filePickerRef.current.click())
          }
          
        }}
        className={`${
          props.className ? props.className : 'w-40 h-40 '
        } focus:outline-none focus:ring focus:ring-inset relative flex items-center justify-center mb-4 overflow-hidden transition-colors duration-200 ease-in-out cursor-pointer rounded-xl bg-WSAI-Indigo-100 shadow-inner group ring-trans `}
      >
        <div
          className={`absolute flex items-center uppercase opacity-0 justify-center z-50 w-full h-full transition-opacity hover:bg-default-1000 group-focus:opacity-70 group-hover:opacity-70   text-xs 
          ${image ? 'text-xs bg-WSAI-Indigo-900 text-WSAI-Indigo-25' : ' text-WSAI-JetBlack'}`}
        >
          Upload a picture
        </div>

        {image && (
          <Image src={image} objectFit="cover" layout="fill" alt="subject" />
        )}
      </label>
      <input
        name={props.name}
        id={props.id}
        className="hidden"
        type="file"
        accept="image/*"
        ref={filePickerRef}
        onChange={props.onChange}
      />
    </>
  )
}

export default AvatarUpload
