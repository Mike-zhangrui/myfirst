$(function(){
  var currentPage = 1
  var pageSize = 5
  //装图片地址和名称的数组
  var picArr = []
  render()
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info)
        var htmlStr = template('productTpl',info)
        $('tbody').html(htmlStr)
        //进行分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page
            render()
          }
        })
      }
    })
  } 
  $('#addBtn').click(function(){
    $('#addModal').modal("show")
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
         var htmlStr = template("dropdownTpl",info)
         $('.dropdown-menu').html(htmlStr)
      }
    })
  })
  // 给下拉列表中的每个a用事件委托注册点击事件
  $('.dropdown-menu').on('click','a',function(){
    var id = $(this).data('id')
    var txt = $(this).text()
    $('#dropdownText').text(txt)
    // 将id设置给隐藏域
    $('[name="brandId"]').val(id)
    //将隐藏域的校验状态更新成VALID
    $('#form').data("bootstrapValidator").updateStatus("brandId","VALID")
  })
  //配置文件上传插件
  $('#fileupload').fileupload({
    dataType:"json",
    //上传完成的回调函数
    done:function(e,data){
      console.log(data)
      var picObj = data.result
      var picUrl = picObj.picAddr
      //添加到数组的最前面
      picArr.unshift(picObj)
      //添加图片到最前面
      $('#imgBox').prepend('<img src = "'+picUrl+'" style = "width:100px;">')
      //如果长度大于3,将最后一张图片移除
      if(picArr.length>3){
        picArr.pop()
        $('#imgBox img:last-of-type').remove()
      }
      //如果上传图片达到3张,改变隐藏域的校验状态
      if(picArr.length ===3){
        $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID")
      }
    }
  })
  //进行表单校验
  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          //正则校验
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"商品库存必须以非零数字开头"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    }
  })
//注册表单验证成功事件,阻止默认提交,发送ajax
$('#form').on('success.form.bv',function(e){
     e.preventDefault()
     var Str = $('#form').serialize()
     Str+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr
     Str+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr
     Str+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr
     $.ajax({
       type:"post",
       url:"/product/addProduct",
       data:Str,
       dataType:"json",
       success:function(info){
        $('#addModal').modal("hide")
        currentPage = 1
        render()
        $('#form').data("bootstrapValidator").resetForm(ture)
        $('#dropdownText').text("请选择二级分类")
        $('#imgBox img').remove()
        picArr = []
       }
     })
})
})