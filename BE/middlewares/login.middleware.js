module.exports = async (req, res, next) => {
  var user = req.query;
  if (!user.room || !user.name) {
    res.redirect('/');
  }
  next();
};
