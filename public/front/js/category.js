$(function () {
  //进入页面发送ajax请求
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
      console.log(info)
      var htmlStr = template('leftTpl', info)
      $('.lt_category_left ul').html(htmlStr)
      renderById(info.rows[0].id)
    }
  })
  // 给左边栏的每个a注册点击事件(事件委托)
  $('.lt_category_left ul').on('click', 'a', function () {
    var id = $(this).data('id')
    $('.lt_category_left ul a').removeClass('current')
    $(this).addClass('current')
    renderById(id)
  })
  //根据点击a获取id在右侧渲染对应的界面
  function renderById(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function (info) {
        // console.log(info)
        var htmlStr = template('rightTpl', info)
        $('.lt_category_right ul').html(htmlStr)
      }
    })
  }
})