import { useState } from 'react'

import Nav from './comps/Nav'
import Blog from './comps/Blog'

function App() {

  const [searchValue, setSearchValue] = useState('');
  
  return (
    <>
      <Nav setSearchValue={setSearchValue}/>
      <Blog searchValue={searchValue}/>
    </>
  )
}

export default App
