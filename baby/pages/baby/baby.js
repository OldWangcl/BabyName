// pages/baby/baby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    swiperImgs:[
      "../../images/baby-01.png",
      "../../images/baby-02.png",
      "../../images/baby-03.png"
    ],
    interval:2000,
    autoplay:true,
    circular:true,
    indictorDots:true,
    // swiper
    surname:'',
    sex:0,
    inname:'',
    innamePosition:'',
    babyName:'宝宝姓氏(必填)',
    babyGender:'宝宝性别(必选)',
    babyText:'必须包含的字（选填）',
    color:'',
    colors:'' //必须包含的字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('benameResult'))
  },
  // 改变选择
  change:function(e){
    var time = e.detail.value;
    console.log(time);
    if (time.match(/\d+/g)){
      this.data[e.target.dataset.name] = time - 0
    }else{
      this.data[e.target.dataset.name] = time
    }
    this.setData(this.data);
    console.log(this.data,"999");
  },
  // 表单校验姓名
  checkName:function(e){
    var value = e.detail.value;
    if (!value.replace(/[^\u4E00-\u9FA5]/g, '')) {
      this.setData({
        babyName: '请输入中文',
        color: '#ff0000'
      })
    }else{
      this.setData({
        babyName: '宝宝姓氏(必填)',
        color: '#fff'
      })
    }
  },
  // 取消
  cancelName:function(e){
    var value = e.detail.value;
    if(value.length == 0){
      this.setData({
        babyName: '宝宝姓氏(必填)',
        color: '#fff'
      })
    }
  },
  // text文字
  // 表单校验姓名
  checkText: function (e) {
    var value = e.detail.value;
    if (!value.replace(/[^\u4E00-\u9FA5]/g, '')) {
      this.setData({
        babyText: '请输入中文',
        colors: '#ff0000'
      })
    } else {
      this.setData({
        babyText: '必须包含的字（选填）',
        colors: '#fff'
      })
    }
  },
  // 取消
  cancelText: function (e) {
    var value = e.detail.value;
    if (value.length == 0) {
      this.setData({
        babyText: '必须包含的字（选填）',
        colors: '#fff'
      })
    }
  },
  // 弹窗提醒
  alert:function(content){
    wx.showModal({
      title: '提示',
      content: content,
      showCancel:false
    })
    return this
  },
  // 提交按钮
  btnSubmit:function(){
    var that = this;
    const errorTips = {
      'surname':'请输入宝宝姓氏',
      'sex':'请选择宝宝性别!'
    }
    for (let i in this.data){
      if (!that.data[i] && errorTips[i]){
        return that.alert(errorTips[i])
      }
    }
    wx.request({
      url: 'https://bbs.bozhong.com/restful/www/surname.json',
      data:{
        surname: that.data.surname,
        sex: that.data.sex,
        def:that.data.inname,
        defpl:that.data.innamePosition || 2
      },
      success:function(res){
        console.log(res.data);
        if(res.data.error_code === 0){
          wx.setStorageSync('benameResult', res.data.data);
          if(that.data.color == '#ff0000' || that.data.colors == '#ff0000'){
            wx.showModal({
              title: '提示',
              content: '请输入中文',
              showCancel:false
            })
          }else{
            wx.navigateTo({
              url: '../result/result?surname=' + that.data.surname + '&sex=' + that.data.sex + '&inname=' + that.data.inname + '&innamePosition=' + that.data.innamePosition,
              success: function (res) {
                wx.showToast({
                  title: '起名中',
                  icon: 'loading',
                  duration: 500
                })
              }, fail: function (res) {
                console.log(res)
              }
            })
          }
        }else{
          that.alert(errorTips[i])
        }
      },
      fail:function(res){
        that.alert(JSON.stringify(res))
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})