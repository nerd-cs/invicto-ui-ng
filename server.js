function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/invicto'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/invicto/'}),
);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app is running at the port ${PORT}`);
});
