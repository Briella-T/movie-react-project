import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Outlet } from 'react-router-dom'

library.add(fas, far, fab)

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      
      <header className="flex w-full bg-[#797d62] p-4 shadow-md justify-between items-center z-10 shrink-0">
          <div className="font-sans text-3xl font-black uppercase tracking-tight bg-[#ffd7ba] p-6 rounded-lg">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          </div>
        <div className="font-sans text-3xl font-black uppercase tracking-tight bg-[#ffd7ba] p-6 rounded-lg mx-4">
          Fireside Facts
        </div>
        <div className="font-sans text-3xl font-black uppercase tracking-tight bg-[#ffd7ba] p-6 rounded-lg">
          <FontAwesomeIcon icon="fa-solid fa-film" />
          </div>
      </header>
      
      <div className='flex flex-row grow overflow-hidden'> 
        
        <nav className="w-52 bg-[#9b9b7a] p-4 shadow-md shrink-0 overflow-y-auto">
            <a href="/" className="font-sans text-3xl font-black uppercase tracking-tight text-white hover:text-gray-200 block py-6">
              Home
            </a>
            <a href="/about" className="ffont-sans text-3xl font-black uppercase tracking-tight text-white hover:text-gray-200 block py-6">
              About
            </a>
            <a href="/gallery" className="font-sans text-3xl font-black uppercase tracking-tight text-white hover:text-gray-200 block py-6">
              Gallery
            </a>
        </nav>
        
        <main className="p-6 bg-[#997b66] w-full grow overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}
