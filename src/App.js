import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import MovieDetail from './pages/movieDetail'
import MovieList from './pages/movielist'
import NotFound from './pages/pageNotfound'
const App = () => {
  
  return (
   <Router>
    <Routes>
      <Route path='/GSIV23_Raj_kumar' element={<MovieList/>}/>
      <Route path="/movie_detail/:movieId" element={<MovieDetail/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
   </Router>
  )
}

export default App