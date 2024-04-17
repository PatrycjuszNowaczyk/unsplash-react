import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Loader from '@components/Loader/Loader'
import './SearchBar.scss'

/**
 * SearchBar component to render a search bar form element with a label and input field
 * @param {function} onSubmit - function to handle searching for a term passed from the parent component
 * @param {string} name - name attribute for the input field
 * @param {string} placeholder - text to display in the input field
 * @param {boolean} isLoading - flag to disable the input field and button while loading
 * @returns {JSX.Element}
 */
const SearchBar = ({
  onSubmit,
  setTerm,
  name = 'SearchBar',
  placeholder = 'Search...',
  isLoading = false
}) => {
  
  // const [isDisabled] = useState(isLoading)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if ('' === event.target[name].value) {
      toast('Please enter a search term')
      return
    }
    setTerm(event.target[name].value)
    const formData = new FormData(event.target)
    const term = formData.get(name)
    onSubmit(term)
  }
  
  const handleInputOnClick = (event) => {
    event.target.select()
  }
  
  return (
    <form
      className="SearchBar"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor={name}
        className="SearchBar__label"
      >
        Search for a term:
      </label>
      <div className="SearchBar__inputWrapper">
        <input
          id={name}
          name={name}
          className="SearchBar__input"
          placeholder={placeholder}
          type="text"
          onClick={handleInputOnClick}
          disabled={isLoading}
        />
        <button
          className="SearchBar__button"
          disabled={isLoading}
        >
          <span className='material-symbols-sharp'>
            search
          </span>
          {isLoading && <Loader />}
        </button>
      </div>
    </form>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setTerm: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default SearchBar