import React from 'react'

interface Props {
    title: string
}

const Button = ({ title }: Props) => {
    return (
        <button className='text-[14px] w-full cursor-pointer h-[45px] text-white font-medium bg-(--color-orange) rounded-[10px]'>{title}</button>
    )
}

export default Button