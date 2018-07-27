/**
 * related to edit_usericon.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2018-01-26
 */

var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");
var data_cache = sm("do_DataCache");
var edu = require("education");
var con = require("const");

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

ui("btn_submit").on("touch", function(){
	page.hideKeyboard();
	var newname = ui("text_username").text;
	var para = {"screen_name":newname};
	var id = data_cache.loadData(con.CK_USER_ID);
    edu.ChangeUserInfo(para,id, function(data){
    	if(data.status  == 200){
    		nf.toast("修改成功！");
    		app.closePage();
    	}else{
    		nf.toast("修改失败！");
    	}
    })
})