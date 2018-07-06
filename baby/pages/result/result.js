// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    benameResult:[],
    surname:'',
    sex:'',
    inname:'',
    innamePosition:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let benameResult = wx.getStorageSync('benameResult');
    this.setData({
      benameResult: benameResult[0],
      surname: options.surname,
      sex: options.sex,
      inname: options.inname,
      innamePosition: options.innamePosition
    })
  },
  render:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 换一换
  change:function(){
    var that = this;
    wx.request({
      url: 'https://bbs.bozhong.com/restful/www/surname.json',
      data: {
        surname: that.data.surname,
        sex: that.data.sex,
        def: that.data.inname,
        defpl: that.data.innamePosition || 2
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.error_code === 0) {
          that.setData({
            benameResult: res.data.data[0]
          })
        }
        wx.showToast({
          title: '努力加载中',
          icon:'loading',
          duration:500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.request({
      url: 'https://bbs.bozhong.com/restful/www/surname.json',
      data: {
        
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})