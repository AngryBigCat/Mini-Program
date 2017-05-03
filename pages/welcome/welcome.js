// pages/welcome/welcome.js
Page({
  onTap: function (event) {
    wx.redirectTo({
      url: '../posts/post',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})