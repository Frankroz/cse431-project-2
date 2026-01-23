const displayWelcome = (req, res) => {
  res.send('Welcome to the Library API! Use /authors to manage author data and /books to manage the book collection.');
};

module.exports = { displayWelcome };