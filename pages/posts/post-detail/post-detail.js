// pages/posts/post-detail/post-detail.js
var posts_data = require('../../../data/local_data.js');

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var postId = parseInt(options.id);
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
      var postsColletcted = {};
      postsColletcted[postId] = false;
      wx.setStorageSync('posts_collected', postsColletcted);
    }
    let g_isPlayingMusic = getApp().globalData.g_isPlayingMusic;
    let g_playingMusicId = getApp().globalData.g_playingMusicId;
    if (g_isPlayingMusic && g_playingMusicId === postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();
    this.visitTotal();
  },
  visitTotal() {
    //统计浏览文章次数
    //当页面初始化时，首先判断是否有浏览量缓存，如果有就从缓存中获取到然后到模板里
    //如果没有 就初始化一个浏览量缓存，然后在做累计,获取到然后到模板里
    let visits_total = wx.getStorageSync('visits_total');
    let postId = this.data.postId;

    if (visits_total) {
      if (!visits_total[postId]) {
        visits_total[postId] = {view: 1};
      } else {
        visits_total[postId]['view'] += 1;
      }
    } else {
      visits_total = {};
      visits_total[postId] = {view: 1};
    }
    wx.setStorageSync('visits_total', visits_total);
  },
  //音乐播放监听
  setMusicMonitor() {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      });
      getApp().globalData.g_isPlayingMusic = true;
      getApp().globalData.g_playingMusicId = this.data.postId;
    });
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      });
      getApp().globalData.g_isPlayingMusic = false;
      getApp().globalData.g_playingMusicId = null;
    });
  },
  //点击收藏文章事件
  onCollectedTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.postId];
        postCollected = !postCollected;
        postsCollected[this.data.postId] = postCollected;
        // this.showToast(postsCollected, postCollected);
        this.showModal(postsCollected, postCollected);
  },
  //
  onMusicTap: function (event) {
    let postId = this.data.postId;
    let postData = posts_data.postList[postId].music;
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.data.isPlayingMusic = false;
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.dataUrl,
        title: postData.title,
        coverImgUrl: postData.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
    }
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
      content: postCollected ? '是否确认收藏？' : '是否取消收藏？',
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
      title: postCollected ? '收藏成功' : '取消收藏',
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