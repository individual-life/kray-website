'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Modal from '../common/Modal';

const StatsGrid = () => {
    const [isShowModal, setShowModal] = useState(false);

    return (
        <div className='mt-[30px]'>
            <div className='grid grid-cols-4 gap-[20px]'>
                <div
                    onClick={() => setShowModal(true)}
                    className='flex items-center justify-between bg-white rounded-[10px] px-[20px] py-[10px]'>
                    <div className='flex items-center gap-[15px] cursor-pointer'>
                        <div className='size-[40px] rounded-full flex justify-center items-center bg-[rgba(0,0,0,0.05)]'>
                            <Image src="/icons/plus.svg" alt="" width={20} height={20} />
                        </div>
                        <div>
                            <p className='text-[14px] font-normal'>Add New Folder</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between bg-white rounded-[10px] px-[20px] py-[10px]'>
                    <div className='flex items-center gap-[15px]'>
                        <div className='size-[40px] rounded-full flex justify-center items-center bg-[rgba(0,0,0,0.05)]'>
                            <Image src="/icons/file.svg" alt="" width={20} height={20} />
                        </div>
                        <div>
                            <span className='text-[14px] font-medium'>54 Files</span>
                            <p className='text-[13px] font-normal text-(--color-grey)'>My Portfolio</p>
                        </div>
                    </div>
                    <Image src="/icons/detail-dot.svg" alt="" width={20} height={20} />
                </div>

            </div>

            <Modal isOpen={isShowModal} onClose={() => setShowModal(false)} title="Add New Folder" description="Make changes to your profile here. Click save when you're done.">
                <div className='mt-4'>
                    <label htmlFor="email" className={` text-[14px] font-normal`}>Name <span className='text-(--color-orange)'>*</span></label>
                    <div className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[10px]'>
                        <input type="email" id="email" placeholder='My Folder' className='w-full h-full outline-none border-none text-[13px]' />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default StatsGrid