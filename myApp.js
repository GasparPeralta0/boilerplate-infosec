const express = require('express');
const app = express();

const helmet = require('helmet');

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.noCache());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  })
);



























const api = require('./server.js');

app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);

app.get('/server.js', function (req, res, next) {
  fs.readFile(__dirname + '/server.js', function (err, data) {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});;

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
