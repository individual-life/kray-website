'use client'
import { navData } from '@/lib/constant/nav-data'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
    showIconSend?: boolean
}

const Header = ({ showIconSend = true }: Props) => {
    const router = useRouter()

    const handleLogin = () => {
        router.push('/login')
    }

    const handleNavigate = (path: string) => {
        router.push(path)
    }

    return (
        <header className='mx-[9vw] grid grid-cols-12 gap-x-5 pt-[15px]'>
            <div
                onClick={() => router.push('/')}
                className='col-span-1 cursor-pointer bg-white size-[45px] flex justify-center items-center rounded-full'>
                <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
            </div>
            <nav className='col-start-3 col-span-2 bg-white rounded-full h-[45px] flex justify-center items-center gap-[40px]'>
                {
                    navData.map((item, index) => (
                        <div key={index} className='flex justify-center items-center'>
                            <p className='text-[14px] font-medium cursor-pointer text-(--color-grey) hover:text-black duration-300 ease-in-out'>{item}</p>
                        </div>
                    ))
                }
            </nav>
            {
                showIconSend && <div
                    onClick={handleLogin}
                    className='col-start-12 bg-white h-[45px] w-[60px] flex justify-center items-center rounded-full cursor-pointer'>
                    <div className='bg-(--color-orange) h-[35px] w-[50px] flex justify-center items-center rounded-full'>
                        <Image src="/icons/send.svg" alt="Send" width={20} height={20} />
                    </div>
                </div>
            }
        </header>
    )
}

export default Header