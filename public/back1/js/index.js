$(function(){
  //柱状图
  var echarts_left = echarts.init(document.querySelector('.echarts_left'));

  // 指定图表的配置项和数据
  var option1= {
      title: {
        //标题文本
          text: '2018年注册人数'
      },
      //提示框组件
      tooltip: {},
      //图例
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);
  //饼图
  var echarts_right = echarts.init(document.querySelector('.echarts_right'));
  var option2 =  {
    title : {
      //主标题文本
      text: '热门品牌销售',
      //副标题文本
      subtext: '2018年11月',
      //水平居中
      x:'center',
      //配置文本样式
      textStyle:{
        fontSize:30,
        color:"red"
      },
      //配置副标题文本
      subtextStyle: {
        fontSize:23
      }
  },
  //提示框组件
  //鼠标悬停时触发
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','匡威','Aj','绣花鞋']
  },
  series : [
      {
          name: '受欢迎品牌',
          type: 'pie',
          //圆的大小
          radius : '55%',
          //圆心位置
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'匡威'},
              {value:135, name:'Aj'},
              {value:1548, name:'绣花鞋'}
          ],
          //额外阴影效果
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
  }
  echarts_right.setOption(option2);
})