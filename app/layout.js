import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog-Event',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="light" className='h-full w-full flex justify-start'>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}