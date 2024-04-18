import React from 'react'
import PropTypes from 'prop-types'
import Loader from '@components/Loader/Loader'
import './ImageLazyLoader.scss'

function ImageLazyLoaderFunction({allImagesLoaded}, ref) {
  return (
    <div ref={ref} className='ImageLazyLoader__wrapper'>
      {true === allImagesLoaded ? 'All images are loaded' : (
        <div className="ImageLazyLoader__loaderContainer">
          <Loader />
        </div>
      ) }
    </div>
  )
}

ImageLazyLoaderFunction.propTypes = {
  allImagesLoaded: PropTypes.bool.isRequired
}

const ImageLazyLoader = React.forwardRef(ImageLazyLoaderFunction)

export default ImageLazyLoader