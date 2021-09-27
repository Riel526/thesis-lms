import { useState, useEffect } from 'react'
import Image from 'next/image'

const AvatarUpload = props => {
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

  const showImage = e => {
    setImage(e.target.result)
  }

  return (
    <>
      <label
        htmlFor={props.id}
        className={`${props.className ? props.className : 'w-64 h-64 '} relative flex items-center justify-center mb-4 overflow-hidden transition-colors duration-200 ease-in-out shadow-md cursor-pointer rounded-xl bg-default-900 group ring-trans `}
      >
        <div className={`absolute flex items-center uppercase opacity-0 justify-center z-50 w-full h-full transition-opacity hover:bg-default-1000 group-focus:opacity-70 group-hover:opacity-70  text-default-100
          ${image ? 'font-bold' : ''}`}>Upload a picture</div>

        {image && (
          <Image src={image} objectFit='cover' layout='fill' alt='subject' />
        )}
      </label>

      <input
        name={props.name}
        id={props.id}
        className='hidden'
        type='file'
        accept='image/*'
        onChange={props.onChange}
      />
    </>
  )
}

export default AvatarUpload
