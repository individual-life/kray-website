import { krayPlannerSideLogoutData, krayPlannerSideNavData } from '@/lib/constant/kray-planner'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='h-full flex flex-col justify-between'>
            <div>

            </div>
            <div className='py-[15px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[15px]'>
                {
                    krayPlannerSideNavData.map((item, index) => (
                        <Link key={index} href={item.href} className='flex justify-center items-center text-[14px] font-normal  cursor-pointer text-(--color-grey) hover:text-black duration-300 ease-in-out'>
                            <div className='size-[30px] rounded-full flex justify-center items-center'>
                                <Image src={item.icon} alt="Logo" width={22} height={22} />
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className='py-[15px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[15px]'>
                {
                    krayPlannerSideLogoutData.map((item, index) => (
                        <Link key={index} href={item.href} className='flex justify-center items-center text-[14px] font-normal  cursor-pointer text-(--color-grey) hover:text-black duration-300 ease-in-out'>
                            <div>
                                <Image src={item.icon} alt="Logo" width={22} height={22} />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default NavBar