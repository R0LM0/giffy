const apiKey = 'Tv6Ybqzpl4BppqGPfLglaZmPofwggTTh'


export default async function getGifs({ keyword = 'morty' } = {}) {
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
    return await fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const { data = [] } = response // Por si data biene Undefined
            if (Array.isArray(data)) {
                const gifs = data.map(image => {
                    const { images, title, id } = image
                    const { url } = images.downsized_medium
                    return { title, id, url }
                })
                return gifs
            }

        })
        .catch((err) => console.error(err));
}