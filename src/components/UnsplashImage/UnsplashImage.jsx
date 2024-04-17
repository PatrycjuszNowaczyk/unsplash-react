import PropTypes from 'prop-types'
import UnsplashImageInfo from '@components/UnsplashImage/UnsplashImageInfo'
import './UnsplashImage.scss'
import { useState } from 'react'

/**
 * UnsplashImage component to show image packed with extras like showing tooltip
 * and some other information
 * @param {Object} image - Object with image data
 * @param {Array[Object]} image.urls - Object of urls to image
 * @returns {JSX.Element}
 * @constructor
 */
const UnsplashImage = ({ image }) => {
  
  const initialStateTooltip = {
    show: false,
    content: '',
    position: { x: 0, y: 0 },
  }
  
  // console.log(image)
  
  const [tooltip, setTooltip] = useState(initialStateTooltip)
  const [timeoutId, setTimeoutId] = useState(null)
  
  /**
   * Show tooltip on mouse move after some time
   * @param e - An event object of mouse move
   * @param {string} description - Description of the image
   */
  const handleMouseMove = (e, description) => {
    clearTimeout(timeoutId)
    
    // hide tooltip on move
    setTooltip(prevState => ({
      ...prevState,
      show: false,
      content: '',
      position: { x: 0, y: 0 },
    }))
    
    // show tooltip after some time
    const id = setTimeout(() => {
      setTooltip(prevState => ({
        ...prevState,
        show: true,
        content: description,
        position: { x: e.clientX, y: e.clientY },
      }))
    }, 500)
    
    setTimeoutId(id)
  }
  
  /**
   * Hide tooltip on mouse out
   * @returns {void}
   */
  const handleMouseOut = () => {
    clearTimeout(timeoutId)
    
    setTooltip(prevState => ({
      ...prevState,
      show: false,
      content: '',
      position: { x: 0, y: 0 },
    }))
  }
  
  return (
    <div
      // key={image.id ?? image.slug}
      className="UnsplashImage__wrapper"
    >
      <a href={image.links.html} target="_blank" rel="noreferrer">
        <img
          src={image.urls.regular}
          alt={image.alt_description ?? null}
          className="UnsplashImage__image"
          onMouseMove={(e) => handleMouseMove(e, image.alt_description)}
          onMouseOut={handleMouseOut}
          style={{
            aspectRatio: `${image.width}/${image.height}`
          }}
        />
      </a>
      {tooltip.show && (
        <div
          className="UnsplashImage__tooltip"
          style={{
            top: tooltip.position.y + 10,
            left: tooltip.position.x + 10,
          }}
        >
          {tooltip.content ?? 'no description'}
        </div>
      )}
      <UnsplashImageInfo image={image} />
    </div>
  )
}

UnsplashImage.propTypes = {
  image: PropTypes.object.isRequired,
}

export default UnsplashImage