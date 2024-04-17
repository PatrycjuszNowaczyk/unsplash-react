import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import UnsplashImage from '@components/UnsplashImage/UnsplashImage'
import ImageLazyLoader from '@components/ImageLazyLoader/ImageLazyLoader'
import './ImageList.scss'

/**
 * ImageList component to render the list of images
 * @param images
 * @param images.slug - unique identifier for the image
 * @returns {JSX.Element}
 * @constructor
 */
const ImageList = ({ images , loadMoreImages}) => {
  
  const loaderWrapper = useRef(null)
  const observer = useRef(null)
  const isLoading = useRef(false)
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    
    if (observer.current) {
      observer.current.disconnect()
    }
    
    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]
      const windowInnerHeight = window.innerHeight
      if ((firstEntry.boundingClientRect.top < windowInnerHeight) && 1 === images.page) {
        return
      }
      
      if ((firstEntry.isIntersecting && images.data.length > 0) && (false === isLoading.current)) {
        isLoading.current = true
        loadMoreImages(images.term, images.page)
          .finally(() => {
            isLoading.current = false
          })
      }
    }, observerOptions)
    
    observer.current.observe(loaderWrapper.current)
    
    return () => {
      observer.current.disconnect()
    }
  }, [images.page])
  
  return (
    <div className="ImageList__wrapper">
      {images.data.map((image) => {
        return (
          <UnsplashImage
            key={image.id ?? image.slug}
            image={image}
          />
        )
      })}
      <ImageLazyLoader ref={loaderWrapper}/>
    </div>
  )
}

ImageList.propTypes = {
  images: PropTypes.object.isRequired,
  loadMoreImages: PropTypes.func.isRequired
}

export default ImageList