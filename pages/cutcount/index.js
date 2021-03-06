/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 * from:http://git.oschina.net/dotton/CountDown
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var total_micro_second = 10000 * 1000;

/* 毫秒级倒计时 */
function count_down(that) {
  	// 渲染倒计时时钟
  	that.setData({
  		clock:date_format(total_micro_second)
  	});

  	if (total_micro_second <= 0) {
  		that.setData({
  			clock:"已经截止"
  		});
  		// timeout则跳出递归
  		return ;
  	}    
  	setTimeout(function(){
    	// 放在最后--
		total_micro_second -= 10;
		count_down(that);
	}
	,10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  	// 秒数
  	var second = Math.floor(micro_second / 1000);
  	// 小时位
  	var hr = Math.floor(second / 3600);
  	// 分钟位
  	var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  	// 秒位
	var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
	// 毫秒位，保留2位
	var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

	return hr + ":" + min + ":" + sec + " " + micro_sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
	return num < 10 ? "0" + num : num
}

Page({
	data: {
		clock: ''
	},
	onLoad: function() {
		count_down(this);
	}
})