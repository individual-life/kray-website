import Image from 'next/image'

interface Props {
    icon: string,
    title: string,

}


const SignInThirdParty = ({ icon, title }: Props) => {
    return (
        <div className='cursor-pointer w-full h-[45px] border border-[rgba(0,0,0,0.1)] rounded-[10px] gap-x-[10px] flex justify-center items-center'>
            <div>
                <Image src={icon} alt={title} width={20} height={20} />
            </div>
            <span className='text-(--color-grey) text-[14px] font-normal'>{title}</span>
        </div>
    )
}

export default SignInThirdParty