import { gajrajOne, poppins } from '@/app/fonts'
import Image from 'next/image'

const ChatModel = () => {

    const listTab = [
        {
            title: 'Go to Homepage',
            icon: '/icons/home.svg'
        },
        {
            title: 'Show Site Map',
            icon: '/icons/list.svg'
        },
        {
            title: 'Report Broken Link',
            icon: '/icons/danger.svg'
        }
    ]

    return (
        <div className='h-[calc(100vh-60px)] flex items-center mx-[9vw] '>
            <div className='w-full'>
                <div className='flex justify-center items-center'>
                    <span className={`${gajrajOne.className} text-[100px] text-[rgba(0,0,0,0.1)] text-center `}>
                        404
                    </span>
                </div>
                <div className='flex flex-col justify-center items-center gap-y-[10px]'>
                    <h6 className={`${poppins.className} text-[20px] font-medium text-center text-[rgba(0,0,0,0.7)]`}>I couldn't find that page</h6>
                    <p className='text-[14px] font-normal text-(--color-grey) text-center w-[28%]'>
                        But I can help you find what you need. Just ask or choose an option below.
                    </p>
                </div>
                <div className='flex justify-center items-center mt-[100px]'>
                    <div className='w-[50%] h-[50px] flex justify-center items-center bg-[rgba(0,0,0,0.05)] pl-5 pr-[6px] rounded-full'>
                        <input type="text" placeholder='Describe what you are looking for' className='h-full w-full outline-none border-none text-[14px]' />
                        <div className='h-[38px] w-[50px] bg-(--color-orange) rounded-full flex justify-center items-center cursor-pointer'>
                            <Image src="/icons/send.svg" alt="Send" width={20} height={20} />
                        </div>
                    </div>
                </div>
                <div className='mt-[40px] flex justify-center items-center gap-x-[20px]'>
                    {listTab.map((item, index) => (
                        <div key={index} className='flex items-center justify-center gap-x-[10px] cursor-pointer border border-[rgba(0,0,0,0.1)] text-[rgba(0,0,0,0.5)] rounded-full px-[15px] py-[5px]'>
                            <Image src={item.icon} alt={item.title} width={18} height={18} />
                            <span className='text-[13px] font-normal'>{item.title}</span>
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-center mt-[100px]'>
                    <p className='text-[14px] text-center font-normal text-(--color-grey) w-[28%] mt-[20px]'>Need human help? <span className='text-(--color-orange) cursor-pointer'>Contact us</span></p>
                </div>
            </div>
        </div>
    )
}

export default ChatModel