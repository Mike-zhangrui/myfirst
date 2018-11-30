$(function () {
  var currentPage = 1
  var pageSize = 5
  render()

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var htmlStr = template('second', info)
        $('tbody').html(htmlStr)
        //进行分页
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
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template('dropdownTpl', info)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })
  //给下拉列表的a注册点击事件
  $('.dropdown-menu').on('click','a',function(){
    //获取文本值
    var txt = $(this).text()
    $('#dropdownText').text(txt)
    //获取id
    var id = $(this).data('id')
    //把id设置给隐藏域
    $('[name="categoryId"]').val(id)
    //更新隐藏域的校验状态
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })
  // 配置文件上传插件, 让插件发送异步文件上传请求
  $('#fileupload').fileupload({
    dataType:"json",
    done:function(e,data){
      // console.log(data)
      var picUrl = data.result.picAddr
      $('#img-box img').attr('src',picUrl)
      //更新隐藏域的状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      $('[name="brandLogo"]').val(picUrl)
      
    }
  })
  //添加表单验证功能
  $('#form').bootstrapValidator({
    //重置排除项,不排除  都校验
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })
  //添加表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault()
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info)
        //模态框隐藏
        $('#addModal').modal("hide") 
        $('#form').data("bootstrapValidator").resetForm(true)
        currentPage = 1
        render()
       //重置下拉框文本
       $('#dropdownText').text("请选择1级分类")
      //重置图片
      $('#img-box img').attr("src","images/none.png")
      }
    })
  })
})