// pages/movies/more-movie/more-movie.js

let app = getApp();
let util = require('../../../utils/util.js');

Page({
  data: {
    navigationBarTitle: '',
    scrollLowerUrl:'',
    startData: 0

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let category = options.category;
    let moreMovieUrl = '';
    this.data.navigationBarTitle = category;
    
    switch (category) {
      case '正在热映':
        moreMovieUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        moreMovieUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣Top250':
        moreMovieUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }

    util.http(moreMovieUrl, this.processDoubanData);
    this.data.scrollLowerUrl = moreMovieUrl;

  },

  onScrollToLower(event) {
    let nextUrl = this.data.scrollLowerUrl + '?start='+ this.data.startData + '&count=20';

    console.log(nextUrl);
    util.http(nextUrl, this.processDoubanData);
  },
  
  processDoubanData(data) {
    let movies = util.processMovieTitle(data);
    this.setData({
      movies: movies
    });
    this.data.startData += 20;
  },

  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })
  },
})