const axios = require('axios');
const md5 = require('md5'); 
require('dotenv').config();

const marvelAPIBaseURL = 'https://gateway.marvel.com/v1/public/comics';
const marvelAPIKey = process.env.MARVEL_API_KEY; 
const marvelPrivateKey = process.env.MARVEL_PRIVATE_KEY;

const generateHash = () => {
  const ts = Math.floor(Date.now() / 1000);
  const hash = md5(ts + marvelPrivateKey + marvelAPIKey);
  return { ts, hash };
};

exports.fetchComics = async () => {
  const { ts, hash } = generateHash();
  try {
    const response = await axios.get(`${marvelAPIBaseURL}?apikey=${marvelAPIKey}&ts=${ts}&hash=${hash}`);
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics from Marvel API:', error);
    throw new Error('Error al obtener los cómics de la API de Marvel');
  }
};

exports.fetchComicDetails = async (comicId) => {
  const { ts, hash } = generateHash();
  try {
    const response = await axios.get(`${marvelAPIBaseURL}/${comicId}?apikey=${marvelAPIKey}&ts=${ts}&hash=${hash}`);
    return response.data.data.results[0];
  } catch (error) {
    console.error(`Error fetching comic details for ID: ${comicId}`, error);
    throw new Error('Error al obtener los detalles del cómic de la API de Marvel');
  }
};
