import React from 'react'

interface Label{
    label:string;
}
const NavItems:React.FC<Label> = ({label}) => {
  return (
    <div className='text-white cursor-pointer hover:text-red-300 transition duration-500'>{label}</div>
  )
}

export default NavItems