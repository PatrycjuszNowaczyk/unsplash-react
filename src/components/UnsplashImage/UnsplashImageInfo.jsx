import PropTypes from 'prop-types'
import './UnsplashImageInfo.scss'

/**
 * UnsplashImageInfo component to show image information like title and author
 * @param image
 * @returns {JSX.Element}
 * @constructor
 */
const UnsplashImageInfo = ({ image }) => {
  return (
    <div className="UnsplashImageInfo__wrapper">
      <div className="UnsplashImageInfo__details">
        {image.description && (
          <>
            <div
              className="UnsplashImageInfo__detail UnsplashImageInfo__detail--fullWidth">
              <span className="UnsplashImageInfo__detailTitle">Description:</span>
              <span className="UnsplashImageInfo__detailValue">
                {image.description}
              </span>
              <hr className="UnsplashImageInfo__divider"/>
            </div>
          
          </>
        )}
        
        <div className="UnsplashImageInfo__detail">
          <span className="UnsplashImageInfo__detailTitle">Author:</span>
          <span className="UnsplashImageInfo__detailValue">
            {image.user.name}
          </span>
        </div>
        
        {null !== image.user.portfolio_url && (
          <div className="UnsplashImageInfo__detail">
            <span className="UnsplashImageInfo__detailTitle">Author&apos;s portfolio:</span>
            <span className="UnsplashImageInfo__detailValue">
              <a
                className="UnsplashImageInfo__detailLink"
                href={`${image.user.portfolio_url}`}
                target="_blank"
                rel="noreferrer"
              >
                click to go
              </a>
            </span>
          </div>
        )}
        
        <div className="UnsplashImageInfo__detail">
          <span className="UnsplashImageInfo__detailTitle">Likes:</span>
          <span className="UnsplashImageInfo__detailValue">
            {image.likes}
          </span>
        </div>
      </div>
    </div>
  )
}

UnsplashImageInfo.propTypes = {
  image: PropTypes.object.isRequired,
}

export default UnsplashImageInfo