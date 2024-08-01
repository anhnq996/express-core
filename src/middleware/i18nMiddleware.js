const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'vi'], // Add other locales you want to support
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  cookie: 'locale'
});

function i18nMiddleware(req, res, next) {
  i18n.init(req, res);
  res.setLocale(req.header('locale') || 'en');
  return next();
}

module.exports = i18nMiddleware;
