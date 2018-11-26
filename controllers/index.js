var rp = require('request-promise');
var _ = require('lodash');


const NEWS_SRC = "https://newsapi.org/v2/top-headlines"

var filterByKeyword = (articles, keyword) => {
  if (keyword === '') {
    return articles;
  }
  console.log("filtering started for keyword : " + keyword)

  var relevant = []
  try {
    var _keywrd = keyword.toLowerCase();
    articles.forEach((article) => {
      article.title = article.title !== null ? article.title: '';
      article.descriptin = article.description != null ? article.description:'';
      article.content =  article.content !== null ? article.content: '';
    });
    articles.forEach((article) => {
      article.text = article.title + " " + article.description + " "+ article.content;
    });

    articles.forEach((article) => {
      var text = _.get(article, 'text', '').toLowerCase();
      if (text.indexOf(_keywrd) >= 0 ) {
        relevant.push(article)
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log("filtering Finished for keyword :" + keyword)

  return relevant;
}

var fetchNews = (query, res) => {
  var options = {
    uri: NEWS_SRC,
    qs: Object.assign({apiKey: process.env.API_KEY}, query),
    headers: {
        'Accept': 'application/json'
    },
    json: true
  };
  console.log("Fetching news from source started")
  rp(options)
    .then((contents) => {
      console.log("Successfully Fetched news from source")  // the log messages can be converted into constants
        var relevant = filterByKeyword(_.get(contents, 'articles', []), _.get(query, 'keyword', ''));
        console.log(relevant);
        // format
        res.json({
          country: _.get(query, 'country', 'global'),
          category: _.get(query, 'category', 'all'),
          keyword: _.get(query, 'keyword', ''),
          articles: relevant

        });
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
