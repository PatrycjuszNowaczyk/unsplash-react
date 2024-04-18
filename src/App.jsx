import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import MainLayout from '@layouts/MainLayout/MainLayout.jsx'
import FooterLayout from '@layouts/FooterLayout/FooterLayout.jsx'
import HeaderLayout from '@layouts/HeaderLayout/HeaderLayout.jsx'
import SearchBar from '@components/SearchBar/SearchBar'
import { fetchImages } from '@src/services/UnsplashService.js'
import ImageList from '@components/ImageList/ImageList'

/**
 * App component to render the main application layout
 * @returns {JSX.Element}
 */
const App = () => {

  const initialStateImages = {
    data: [],
    isLoading: true,
    error: null,
    term: 'random',
    page: 1,
    totalPages: 0,
    allLoaded: false
  }
  
  const [images, setImages] = useState(initialStateImages)
  
  /**
   * Handle searching for images using the provided term and update the state with the results
   * @param {string} term - search term to fetch images
   * @param {number} page - page number to fetch images
   * @returns {Promise<void>}
   */
  const getImages = async (term, page) => {
    const currentTerm = localStorage.getItem('term')
    
    if (currentTerm !== term) {
      localStorage.setItem('term', term)
      setImages(prevState => ({...prevState, data: [], isLoading: true, term: term, page: 1}))
    }
    
    const data = await toast.promise(fetchImages(term, page), {
      pending: 'Fetching images...',
      error: 'Error fetching images',
    })
    
    if (data.error) {
      setImages(prevState => ({
        ...prevState,
        isLoading: false,
        error: data.error,
      }))
      console.error(data.error)
      return
    }
    
    setImages(prevState => {
      const dataToSet = data.results.filter((el) => {
        if (!prevState.data.some((el2) => (
          el.id === el2.id
        ))) {
          return el
        }
      })
      
      return ({
        ...prevState,
        data: [...prevState.data , ...dataToSet],
        isLoading: false,
        error: null,
        page: prevState.page + 1,
        totalPages: data.total_pages,
        allLoaded: false
      })
    })
  }
  
  useEffect(() => {
    getImages(images.term, images.page)
  }, [])
  
  return (
    <>
      <ToastContainer
        position='top-right'
      />
      <HeaderLayout>
        <h1 className='text-center mb-xs'>Image search</h1>
        <SearchBar
          isLoading={images.isLoading}
          onSubmit={(term) => getImages(term)}
          setTerm={(term) => setImages(prevState => ({ ...prevState, term })) }
        />
      </HeaderLayout>
      <MainLayout>
        <div className="mb-lg">
        </div>
        <ImageList
          images={images}
          loadMoreImages={() => getImages(images.term, images.page)}
          setImages={setImages}
        />
      </MainLayout>
      <FooterLayout>
        <h3>Created with passion to learn.</h3>
      </FooterLayout>
    </>
  )
}

export default App