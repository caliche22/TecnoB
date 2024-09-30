const { fetchComics, fetchComicDetails } = require('../services/marvelService');
const User = require('../models/user'); 
exports.getComics = async (req, res) => {
  try {
    const comics = await fetchComics();
    res.json(comics);
  } catch (error) {
    console.error('Error al obtener los cómics:', error);
    res.status(500).json({ message: 'Error al obtener los cómics' });
  }
};

exports.getComicDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const comic = await fetchComicDetails(id);
    res.json(comic);
  } catch (error) {
    console.error('Error al obtener los detalles del cómic:', error);
    res.status(500).json({ message: 'Error al obtener los detalles del cómic' });
  }
};

exports.addFavoriteComic = async (req, res) => {
  const { userId, comic } = req.body;
  console.log("elid ",userId)
  console.log("el comcis",comic)
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("no esta")
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isComicInFavorites = user.favorites.some(fav => fav.id === comic.id);
    console.log("iscomicInFavortes",isComicInFavorites)
    if (isComicInFavorites) {
      return res.status(400).json({ message: 'El cómic ya está en tu lista de favoritos' });
    }

    user.favorites.push(comic.id);
    await user.save();

    res.status(200).json({ message: 'Cómic agregado a favoritos', favorites: user.favorites });
  } catch (error) {
    console.error('Error al agregar el cómic a favoritos:', error);
    res.status(500).json({ message: 'Error al agregar el cómic a favoritos' });
  }
};
