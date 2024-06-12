
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import LocationCard from './componets/LocationCard'
import ResidentCard from './componets/ResidentCard'

function App() {
   const randomId = Math.floor(Math.random() * 126) + 1;
const [inputValue, setInputValue] = useState(randomId)
  const [location, getLocation, isLoading, hasError] = useFetch()
 

useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  getLocation(url)
}, [inputValue])

const textInput = useRef();
const handleSubmit = (event) => {
  setInputValue(textInput.current.value.trim().toLowerCase())
  textInput.current.value = '';
event.preventDefault()
}

  return (
    <div className='app'>
      {
        isLoading ? 
        <h2>Loading...</h2>
        :
        <>
        <nav className='navBar'> 
          <img className='image' src="https://img.ecartelera.com/noticias/51300/51380-m.jpg" alt="" />
        </nav>
        <h1 className='app__title'>Rick and Morty</h1>
      <form className='app__form' onSubmit={handleSubmit}>
      <input className='app__form__input' ref={textInput} type="number" />
      <button className='app__form__btn'>Search</button>
      </form>
      {
        hasError || !+inputValue ?
        <h2>✖️Hey! yo must provide an id from 1 to 126😒</h2>
        :
        <>
        <LocationCard
      info={location}
      />
      <div className='app__container'>
       {
       location?.residents?.map((character) => (
        <ResidentCard 
         key={character.id}
        info={character}
          />
       ))}
      </div>
       </>
      }
        </>
      } 
    </div>
  )
}

export default App
