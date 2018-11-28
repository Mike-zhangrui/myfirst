// 一旦进入页面就发送ajax请求验证用户是否登陆过,如果没有登录拦截到登录页面
$(function(){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
       if(info.error===400){
         location.href = "login.html"
       }
       if(info.success){
         console.log('该用户已经登陆过')
       }
    }
  })
})