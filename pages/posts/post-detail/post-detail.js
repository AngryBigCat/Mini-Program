// pages/posts/post-detail/post-detail.js
var posts_data = require('../../../data/local_data.js');

Page({
  data: {},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    this.setData({
      postId: postId
    });
    var post_data = posts_data.postList[postId];
    this.setData(post_data);

    var postsColletcted = wx.getStorageSync('posts_collected');
    if (postsColletcted) {
      this.setData({
        collected: postsColletcted[postId]
      });
    } else {
      var postsConllected = {};
      postsColletcted[postId] = false;
      wx.setStorageSync('posts_collected', postsConllected);
    }
  },
  onCollectedTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.postId];
        postCollected = !postCollected;
        postsCollected[this.data.postId] = postCollected;
        // this.showToast(postsCollected, postCollected);
        this.showModal(postsCollected, postCollected);
  },
  getCollectedTapAsy: function () {
    
  },
  getCollectedTapSyn: function () {

  },
  onShareTap: function () {
    var shareItem =  [
      '分享好友',
      '分享朋友圈',
      '分享QQ',
      '分享微博',
      '分享人人网'
    ]
    wx.showActionSheet({
      itemList: shareItem,
      success: function (res) {
        if (res.cancel) {
          return false;
        }
        wx.showModal({
          title: 'Tips：' + shareItem[res.tapIndex],
          content: '警告：' + shareItem[res.tapIndex] + '功能暂时无法实现。'
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: 'myApp',
      path: '/pages/posts/post-detail/post-detail'
    }
  },
  showModal: function (postsCollected, postCollected) {
    var _this = this;
    wx.showModal({
      title: 'Hello World',
      content: postCollected ? '是否取消收藏？' : '是否确认收藏？',
      success: function (res) {
        if (res.confirm) {
          _this.showToast(postsCollected, postCollected);
        } else {
          return false;
        }
      }
    });
  },
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '取消收藏' : '收藏成功',
      icon: 'success',
      duration: 1000,
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})