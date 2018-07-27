/**
 * related to pdfread.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-21
 */

var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")

var url = page.getData().url;
var name = page.getData().name;


 var do_back = ui ("do_back");
 do_back.on("touch",function(){
	 app.closePage();
 })
 page.on("back",function(){
	 app.closePage();
 })
 
ui("lab_title").text = name;
ui("web_linkcourse").url = url;
 