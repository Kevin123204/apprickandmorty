import axios from "axios"
import { useState } from "react"

const useFetch = () => {
 const [apiData, setapiData] = useState()
 const [isLoading, setIsLoading] = useState()
 const [hasError, setHasError] = useState()

 const getApi = url => {
    axios.get(url)
    .then(res => {
    setHasError(false)  
   setapiData(res.data)
})
    .catch(err => {
     setHasError(true);
     console.log(err) 
   })
    .finally(() => {
     setTimeout(() => {
      setIsLoading(false)
     }, 500)
    })
 }
  return [apiData, getApi, isLoading, hasError];
}

export default useFetch
