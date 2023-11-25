import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import useTheme from './hooks/useTheme'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const App = () => {
  const { darkMode } = useTheme()

  return (
    <Routes>
      <Route path='/' element={<Navbar />} >
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Route >
    </Routes>
  )
}

export default App
