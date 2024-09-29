import React from 'react'

const Device = (props) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-2xl mb-8 font-bold'>{props.title}</h2>
      <img src={props.img} alt="" className='w-[20rem] object-contain' />
    </div>
  )
}

export default Device