import { Routes, Route  } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import Search from './components/Search.jsx'
import NotFound from './components/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
