import PropTypes from 'prop-types'
import './HeaderLayout.scss'


/**
 * HeaderLayout component to render the header layout with children elements
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const HeaderLayout = ({ children }) => {
  return (
    <header className="py-sm HeaderLayout__wrapper">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-column">
            {children}
          </div>
        </div>
      </div>
    </header>
  )
}

HeaderLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HeaderLayout