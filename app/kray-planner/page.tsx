import Header from '@/components/kray-planner/Header'
import NavBar from '@/components/kray-planner/NavBar'

const KPlanPage = () => {
    return (
        <div className='bg-(--color-white-grey) w-full h-screen px-[50px] pb-[20px] pt-[20px] flex flex-col'>
            <Header />
            <div className='flex flex-1 mt-[30px]'>
                <NavBar />
                <div>

                </div>
            </div>
        </div>
    )
}

export default KPlanPage