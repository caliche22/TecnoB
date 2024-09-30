const User = require('../models/user');
const Comic = require('../models/comic');

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};

exports.addFavorite = async (req, res) => {
  const { comicId, title, image, description } = req.body;
  try {
    const comic = await Comic.create({ comicId, title, image, description, user: req.user.id });
    const user = await User.findById(req.user.id);
    user.favorites.push(comic);
    await user.save();
    res.json(comic);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar a favoritos' });
  }
};
