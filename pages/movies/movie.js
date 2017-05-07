// pages/movies/movie.js
let util = require('../../utils/util.js');

let app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let inTheaters = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    let comingSoon = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    let top250 = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getDoubanMoviesData(inTheaters, 'inTheaters', '正在热映');
    this.getDoubanMoviesData(comingSoon, 'comingSoon', '即将上映');
    this.getDoubanMoviesData(top250, 'top250', '豆瓣Top250');
  },

  getDoubanMoviesData(url, setKey, setSlogan) {
    let _this = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {"Content-Type": "json"}, // 设置请求的 header
      success: function(res){
        _this.processDoubanData(res.data, setKey, setSlogan);
      },
    })
  },

  processDoubanData(data, setKey, setSlogan) {
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
        stars: util.converDoubanRatingStars(v.rating.stars)
      }
      movies.push(temp);
    }

    let readyData = {};
    readyData[setKey] = {
      movies: movies,
      slogan: setSlogan
    };

    this.setData(readyData);

  }
})