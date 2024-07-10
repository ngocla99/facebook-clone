exports.getGIFs = async (req, res) => {
  try {
    const { searchBy, limit = 10 } = req.query;
    const response = await fetch(
      `https://g.tenor.com/v1/search?q=${searchBy}&key=${process.env.GIF_KEY}&limit=${limit}`
    );
    const gifs = await response.json();
    return res.json(gifs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
