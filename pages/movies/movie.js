// pages/movies/movie.js
let util = require('../../utils/util.js');

let app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    let inTheaters = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    let comingSoon = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    let top250 = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getDoubanMoviesData(inTheaters, 'inTheaters', '正在热映');
    this.getDoubanMoviesData(comingSoon, 'comingSoon', '即将上映');
    this.getDoubanMoviesData(top250, 'top250', '豆瓣Top250');
  },

  //请求豆瓣Api数据
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

  //处理豆瓣Api返回的数据
  processDoubanData(data, setKey, setSlogan) {
    let movies = util.processMovieTitle(data);
    let readyData = {};
    readyData[setKey] = {
      movies: movies,
      slogan: setSlogan
    };
    this.setData(readyData);
  },

  //更多页面事件
  onToMoreMovie(event) {
    let category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
})