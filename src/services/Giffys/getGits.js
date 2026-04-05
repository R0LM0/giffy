const API_URL = process.env.REACT_APP_GIPHY_API_URL || 'https://api.giphy.com/v1/gifs';

const fromApiResponseToGifs = (apiResponse) => {
  const { data = [] } = apiResponse;
  if (Array.isArray(data)) {
    const gifs = data.map((image) => {
      const { images, title, id } = image;
      const { url } = images.downsized_medium;
      return { title, id, url };
    });
    return gifs;
  }
  return [];
};

const getApiKey = () => {
  const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
  if (!apiKey) {
    throw new Error('REACT_APP_GIPHY_API_KEY is not defined. Please check your .env file.');
  }
  return apiKey;
};

export default async function getGifs({
  keyword = 'morty',
  limit = 10,
  page = 0,
} = {}) {
  const apiKey = getApiKey();
  const offset = page * limit;
  const searchURL = `${API_URL}/search?api_key=${apiKey}&q=${encodeURIComponent(
    keyword
  )}&limit=${limit}&offset=${offset}&rating=g&lang=en`;

  const res = await fetch(searchURL);

  if (!res.ok) {
    throw new Error(`Failed to fetch GIFs: ${res.status} ${res.statusText}`);
  }

  const response = await res.json();
  return fromApiResponseToGifs(response);
}

export async function getTrendingGifs({ limit = 10, page = 0 } = {}) {
  const apiKey = getApiKey();
  const offset = page * limit;
  const trendingURL = `${API_URL}/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=g`;

  const res = await fetch(trendingURL);

  if (!res.ok) {
    throw new Error(`Failed to fetch trending GIFs: ${res.status} ${res.statusText}`);
  }

  const response = await res.json();
  return fromApiResponseToGifs(response);
}

export async function getSingleGif({ id }) {
  const apiKey = getApiKey();
  const gifURL = `${API_URL}/${id}?api_key=${apiKey}`;

  const res = await fetch(gifURL);

  if (!res.ok) {
    throw new Error(`Failed to fetch GIF: ${res.status} ${res.statusText}`);
  }

  const { data } = await res.json();
  const { images, title, id: gifId } = data;
  const { url } = images.downsized_medium;
  return { title, id: gifId, url };
}