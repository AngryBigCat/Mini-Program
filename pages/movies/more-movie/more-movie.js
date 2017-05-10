// pages/movies/more-movie/more-movie.js

let app = getApp();
let util = require('../../../utils/util.js');

Page({
  data: {
    navigationBarTitle: '',
    scrollLowerUrl:'',
    startData: 0,
    isFirstLoad: true,
    flag: true

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let category = options.category;
    let moreMovieUrl = app.globalData.doubanBase;
    this.data.navigationBarTitle = category;
    
    switch (category) {
      case '正在热映':
        moreMovieUrl += '/v2/movie/in_theaters';
        break;
      case '即将上映':
        moreMovieUrl += '/v2/movie/coming_soon';
        break;
      case '豆瓣Top250':
        moreMovieUrl += '/v2/movie/top250';
        break;
    }

    util.http(moreMovieUrl, this.processDoubanData);
    this.data.scrollLowerUrl = moreMovieUrl;

  },

  onScrollToLower(event) {
    wx.showNavigationBarLoading();
    if (this.data.flag) {
      setTimeout(() => {
        let nextUrl = this.data.scrollLowerUrl + '?start=' + this.data.startData + '&count=20';
        util.http(nextUrl, this.processDoubanData);
        this.data.flag = true
      }, 500);
      this.data.flag = false;
    }
  },
  
  processDoubanData(data) {
    let movies = util.processMovieTitle(data);
    let totalMovie;
    if (this.data.isFirstLoad) {
      totalMovie = movies;
      this.data.isFirstLoad = false;
    } else {
      totalMovie = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovie
    });
    this.data.startData += 20;
    wx.hideNavigationBarLoading();
  },

  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })
  },
})