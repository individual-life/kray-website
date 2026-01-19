import { navData } from '@/lib/constant/nav-data'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    showIconSend?: boolean
}

const Header = ({ showIconSend = true }: Props) => {
    return (
        <header className='mx-[9vw] grid grid-cols-12 gap-x-5 pt-[15px]'>
            <Link
                href="/"
                className='col-span-1 cursor-pointer bg-white size-[45px] flex justify-center items-center rounded-full'>
                <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
            </Link>
            <nav className='col-start-3 col-span-2 bg-white rounded-full h-[45px] flex justify-center items-center gap-[40px]'>
                {
                    navData.map((item, index) => (
                        <Link key={index} href={item.href} className='flex justify-center items-center text-[14px] font-normal  cursor-pointer text-(--color-grey) hover:text-black duration-300 ease-in-out'>
                            {item.name}
                        </Link>
                    ))
                }
            </nav>
            {
                showIconSend && <Link
                    href="/login"
                    className='col-start-12 bg-white h-[45px] w-[60px] flex justify-center items-center rounded-full cursor-pointer'>
                    <div className='bg-(--color-orange) h-[35px] w-[50px] flex justify-center items-center rounded-full'>
                        <Image src="/icons/send.svg" alt="Send" width={20} height={20} />
                    </div>
                </Link>
            }
        </header>
    )
}

export default Header