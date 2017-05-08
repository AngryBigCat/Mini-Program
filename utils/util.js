function converDoubanRatingStars(stars) {
  let starArr = [];
  let count = stars.substr(0, 1);
  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      starArr.push(1);
    } else {
      starArr.push(0);
    }
  }
  return starArr;
}

function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: { "Content-Type": "json" },
    success: function (res) {
      callback(res.data);
    },
    fail(error) {
      console.log(error);
    }
  });
}

function processMovieTitle(data) {
  let movies = [];
  for (let v of data.subjects) {
    let title = v.title;
    if (title.length > 8) {
      title = title.substr(0, 7) + '...';
    }
    let temp = {
      title: title,
      coverageUrl: v.images.large,
      average: v.rating.average,
      movieId: v.id,
      stars: converDoubanRatingStars(v.rating.stars)
    }
    movies.push(temp);
  }
  return movies;
}

module.exports = {
  converDoubanRatingStars: converDoubanRatingStars,
  http: http,
  processMovieTitle: processMovieTitle
}