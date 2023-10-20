const jwt = require('jsonwebtoken');

const config = require('../config.js');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ mensagem: 'Autorização Negada' });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: 'Autorização NEGADA' });
      }
      console.log(decoded)
      req.session = decoded
  
      next()
    });
}

module.exports = authMiddleware