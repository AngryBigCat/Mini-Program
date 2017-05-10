// pages/posts/post.js
var posts_data = require('../../data/local_data.js');

Page({
  data:{},
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  },
  onBannerTap(event) {
    let bannerId = event.target.dataset.bannerId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + bannerId
    });
  },
  onLoad:function(options){
    this.setData({
      posts: posts_data.postList,
      // visitTotal: wx.getStorageSync('visits_total')
    });
  }
})