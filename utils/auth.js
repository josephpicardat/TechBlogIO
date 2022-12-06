const withAuth = (req, res, next) => {
  // Checks to see if user is logged in, if not redirects to /login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
