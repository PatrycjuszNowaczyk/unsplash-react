import PropTypes from 'prop-types'

/**
 * FooterLayout component to render the footer layout with children elements
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const FooterLayout = ({ children }) => {
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="container py-md">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            {children}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            &copy; {import.meta.env.VITE_APP_AUTHOR} {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

FooterLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FooterLayout