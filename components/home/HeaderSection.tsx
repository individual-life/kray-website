import { gajrajOne } from '@/app/fonts'
import Image from 'next/image'

const HeaderSection = () => {
    return (
        <article className='h-[calc(100vh-60px)] mx-[9vw] flex flex-col items-end pb-[50px] '>
            <div className='w-full  flex-1 '>

            </div>
            <div className='w-full grid grid-cols-12 gap-5 items-end'>
                <section className='col-span-2 flex items-start'>
                    <p className={`${gajrajOne.className} text-[50px] text-(--color-grey)`}>
                        Kray
                    </p>
                    <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
                </section>
                <section className='col-start-9 col-span-4 '>
                    <h1 className='text-[20px] font-semibold text-right line-clamp-1'>Let’s Build Your Website & Application Together.</h1>
                    <p className='text-[16px] text-(--color-grey) font-normal text-right mt-[8px] line-clamp-2'>Make technology simple and useful for your business. You have the idea, K-RAY makes it happen.</p>
                </section>
            </div>
        </article>
    )
}

export default HeaderSection