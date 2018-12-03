$(function(){
  //数据都是本地存储的,约定一个键名   search_list
  // 封装一个函数,从本地拿数据,因为localstorage只能存储字符串,所以我们只能将复杂数据类型使用JSON.stringify转成json字符串进行存储,同样取出的数据也是json字符串,需要通过JSON.parse()方法转换成数组或者对象
  render()
  function getHistory(){
    var jsonStr = localStorage.getItem('search_list')||'[]'
    var arr = JSON.parse(jsonStr)
    return arr
  }
  //通过拿到数组,可以进行本地渲染
  function render(){
    var arr = getHistory()
    //模板引擎只能传入对象,需要将数组包装成对象
    var htmlStr = template('historyTpl',{list:arr})
    $('.lt_history').html(htmlStr)
  }
  //清除所有记录
  //点击清除所有记录,跳出一个确认框,点击确认,删除本地的所有记录
  //事件绑定
  $('.lt_history').on('click','.btn-empty',function(){
    mui.confirm("你确定要清空历史记录么?","温馨提示",["取消","确认"],function(e){
      //e.index代表按下的按钮
      if(e.index===1){
        //点击确认
        localStorage.removeItem('search_list')
        render()
      }
    })
  })
  //删除单条记录
  $('.lt_history').on('click','.btn_delete',function(){
    var arr = getHistory()
    var index = $(this).data('index')
    arr.splice(index,1)
    var jsonStr = JSON.stringify(arr)
    localStorage.setItem('search_list',jsonStr)
    render()
  })
  //添加数据
  //点击搜索按钮,添加数据
  //在最前面添加  ,如果数据大于十条,删除最后一条
  $('.search_btn').click(function(){
    var arr = getHistory()
    //获取文本内容
    var key= $('.search_input').val().trim()
    if(key===""){
      mui.toast('请输入搜索关键字')
      return
    }
    var index = arr.indexOf(key)
    if(index!==-1){
      // 有重复项,删除
      arr.splice(index,1)
    }
    if(arr.length>10){
      //删除最后一项
      arr.pop()
    }
    // 在数组最前面添加
    arr.unshift(key)
    //存储
    localStorage.setItem('search_list',JSON.stringify(arr))
    render()
    $('.search_input').val('')
    //跳转到相应的界面
    location.href = "searList.html?key="+key
  })
})