import PropTypes from 'prop-types'

/**
 * MainLayout component to render the main layout with children elements
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = ({ children }) => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          {children}
        </div>
      </div>
    </main>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default MainLayout