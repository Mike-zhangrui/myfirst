
  //进度条的基本使用
  //NProgress.start()  开启进度条
  //NProgress.done()   开启进度条
  //需求:1.第一个ajax请求发送时,开启进度条
  //2.全部的ajax请求完成后,关闭进度条
  //需要学习ajax全局事件
  //.ajaxComplete()    每个ajax完成时调用(无论成功与否)
  //.ajaxSuccess()     每个ajax请求只要成功时会调用
  //.ajaxError()   每个ajax一旦失败就会调用
  //.ajaxSend()     每个ajax请求发送前调用
  //..ajaxStart()   在第一个ajax请求开始是调用
  //.ajaxStop()   在所有的ajax请求完成时调用
  // $(document).ajaxStart(function(){
  //   NProgress.start()
  // })
  // $(document).ajaxStop(function(){
  //   setTimeout(function(){
  //  NProgress.done()
  //   },500)
  // })
  $( document ).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })
  
  $( document ).ajaxStop(function() {
    模拟网络延迟
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 500)
  })
