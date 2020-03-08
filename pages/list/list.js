// pages/list/list.js
const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */

  data: {
    //加载当前分类
    category:{},
    //此分类下的店铺
    shops:[],
    pageIndex:0,
    pageSize:10,
    hasMore:true
  },


  //加载下一页数据
 LoadMore(){
   if(!this.data.hasMore) return 
   let pageIndex = this.data.pageIndex
   let pageSize = this.data.pageSize
   const params = { _page: pageIndex++, _limit: pageSize}
   
   return fetch(`categories/${this.data.category.id}/shops`,params)
      .then(res => {
        const totalCount = parseInt(res.header['x-total-count'])
        //console.log(res.header) 
        const hasMore = pageIndex * pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops,pageIndex,hasMore }) 
      })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     fetch(`categories/${options.cat}`).then(res => {

       //改变选中项目时的抬头标题
       this.setData({ category:res.data })
       wx.setNavigationBarTitle({
         title: this.data.category.name,
       })
       //console.log(this.data.category)

    //    return fetch(`categories/${this.data.category.id}/shops`,
    //    { _page:1, _limit:10}) 
    //  }).then(res => {this.setData({ shops:res.data })
    //  })
    //  console.log(this.data.shops)

    //加载完分类信息后再去加载商铺信息
    this.LoadMore() })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //此处只是加强代码的严谨性，确定onload一定是在onready后面执行
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name,
      })
    }
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
    //重新加载页面数据
    this.setData({
      shops: [], 
      pageIndex: 0,
      hasMore: true})
    this.LoadMore().then(() => wx.stopPullDownRefresh())
    console.log(123)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了')
    this.LoadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})