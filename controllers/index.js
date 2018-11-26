var rp = require('request-promise');
var _ = require('lodash');

var ERRORS = require('../errors');


const NEWS_SRC = "https://newsapi.org/v2/top-headlines"


var fetchNews = (query, res) => {
  var q = _.pick(query, ['country', 'category'])

  if (_.has(query, 'keyword')) {
    q.q = query.keyword;
  }
  var options = {
    uri: NEWS_SRC,
    qs: Object.assign({apiKey: process.env.API_KEY}, q),
    headers: {
        'Accept': 'application/json'
    },
    json: true
  };
  console.log("Fetching news from source started")
  rp(options)
    .then((contents) => {
        console.log("Successfully Fetched news from source")  // the log messages can be converted into constants
        try{

          var articles = [];

          contents.articles.forEach((article) => {
            var _article = _.pick(article, ['title', 'description', 'url']);
            if (article.description !== null) {
              _article.description = _article.description.substring(0,100); // TODO: REMOVE hard code
            } else {
              _article.description = "";
            }
            articles.push(_article);
          });
          // format
          res.json({
            country: _.get(query, 'country', 'global'),
            category: _.get(query, 'category', 'all'),
            keyword: _.get(query, 'keyword', ''),
            articles: articles

          });
        } catch (err) {
          res.status(ERRORS.SERVER_ERROR);
          res.json({
            message: ERRORS.SERVER_ERROR_MESSAGE
          });
        }

    })
    .catch((err) => {
      // TODO: better error handling
        res.status(500);
        res.json({message: err});

    });

}

// query Controller
module.exports.queryCtrl = (req, res, next) => {
  // validate

  fetchNews(_.pick(req.query, ['country', 'keyword', 'category']), res);
}
