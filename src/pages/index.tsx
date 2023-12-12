import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavbarTools from '@/components/navbarTools/NavbarTools'
import SidebarTools from '@/components/sidebarTools/SidebarTools'
import Board from '@/components/board/Board'
import { Provider } from 'react-redux'
import store from '@/reduxStore/store'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main className="relative">
            <Provider store={store}>
                <NavbarTools />
                <SidebarTools />
                <Board />
            </Provider>
        </main>
    )
}
