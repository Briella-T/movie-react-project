import { Routes, Route  } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Details from './components/DetailsPage.jsx'
import Gallery from './components/Gallery.jsx'
import Search from './components/Search.jsx'
import NotFound from './components/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="details/:imdbId" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
