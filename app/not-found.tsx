import ChatModel from '@/components/404/ChatModel'
import Header from '@/components/common/Header'

const NotFound = () => {
    return (
        <>
            <Header showIconSend={false} />
            <main>
                <ChatModel />
            </main>
        </>
    )
}

export default NotFound