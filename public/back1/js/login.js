$(function () {
  //进行表单验证：
  //1.用户名不能为空,长度为2-6位
  //2.密码不能为空,长度为6-12位
  $('#form').bootstrapValidator({
    //配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验字段
    fields: {
      //用户名
      username: {
        //校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码必须是6-12位'
          }
        }
      }
    }
  })
// 校验成功后会触发一个表单校验成功事件，表单默认是提交的，我们要阻止表单的提交，利用ajax提交，需要给表单注册表单验证成功事件
$('#form').on('success.form.bv',function(e){
  //阻止表单的默认提交
e.preventDefault();
$.ajax({
  type:'post',
  url:"/employee/employeeLogin",
  //表单序列化
  data:$('#form').serialize(),
  dataType:'json',
  success:function(info){
     console.log(info)
     if(info.error==1000){
       alert("用户名不存在")
       return
     }
     if(info.error==1001){
       alert("密码错误")
       return
     }
     if(info.success){
       location.href="index.html"
     }
  }
})
})
//实现重置功能，本身的重置按钮，可以重置内容，需要将状态重置
$('[type="reset"]').click(function(){
  //resetForm(布尔值) 
  //resetForm()只重置状态
  //resetForm(true)  重置内容状态
  $('#form').data("bootstrapValidator").resetForm()
})
})