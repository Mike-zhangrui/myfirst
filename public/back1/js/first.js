$(function () {
  var currentPage = 1
  var pageSize = 5
  render()

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("first", info)
        $('tbody').html(htmlStr)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page
            render()
          }
        })
      }
    })
  }
  $('#addBtn').click(function () {
    $('#addModal').modal("show")
    //进行表单验证
    $('#form').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请输入一级分类名称'
            }
          }
        }
      }
    })
    //注册表单校验成功事件 阻止表单的默认提交   发送ajax请求
    $('#form').on('success.form.bv', function (e) {
      e.preventDefault()
      $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: $('#form').serialize(),
        dataType: "json",
        success: function (info) {
          $('#addModal').modal("hide")
          currentPage = 1
          render()
          $('#form').data("bootstrapValidator").resetForm(true)
        }
      })
    })
  })
})