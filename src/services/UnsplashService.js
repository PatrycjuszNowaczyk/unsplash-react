/**
 * Fetch images from Unsplash API using the provided term.
 * @param term
 * @returns {Promise<*>}
 */
export async function fetchImages (term, page = 1) {
  await new Promise(resolve => {
    setTimeout(() => {resolve()}, 1000)
  })
  
  return await fetch(`https://api.unsplash.com/search/photos?query=${term}&page=${page}`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .catch((error) => {
      throw new Error(`Error fetching images: ${error}`)
    })
}