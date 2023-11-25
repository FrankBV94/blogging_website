import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  )

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export default ThemeContext
