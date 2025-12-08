import Header from '@/components/common/Header'
import LoginSection from '@/components/login/LoginSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kray - Login    ',
    description: 'Login to your Kray account to access exclusive features and personalized content.',
    openGraph: {
        title: 'Kray - Login',
        description: 'Login to your Kray account to access exclusive features and personalized content.',
        type: 'website',
    },
}

const LoginPage = () => {
    return (
        <>
            <Header showIconSend={false} />
            <main>
                <LoginSection />
            </main>
        </>
    )
}

export default LoginPage