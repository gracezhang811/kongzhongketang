/**
 * related to diag_exchangesuccess.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2018-01-23
 */

var app = sm("do_App");
var nf = sm("do_Notification");
var diag = sm("do_Dialog");
var page = sm("do_Page");

ui("lay_close").on("touch", function(){
	page.fire("refreshscore");
	diag.close();
})

ui("btn_close").on("touch", function(){
	page.fire("refreshscore");
	diag.close();
})
