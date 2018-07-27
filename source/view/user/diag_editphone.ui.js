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
var edu = require("education");
var id = diag.getData().id;
var newphone = diag.getData().newphone;

ui("btn_submit").on("touch", function(){
	var para = {"phone":newphone};
    edu.ChangeUserInfo(para,id, function(data){
    	if(data.status  == 200){
    		nf.toast("修改成功！");
    		page.fire("closediag");
    		diag.close();
    	}else{
    		nf.toast("修改失败！");
    		page.fire("closediag");
    		diag.close();
    	}
    })
})

ui("btn_close").on("touch", function(){
	page.fire("closediag");
	diag.close();
})
