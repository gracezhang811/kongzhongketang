/**
 * related to edit_userinfo.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2018-01-25
 */

var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");
var data_cache = sm("do_DataCache");
var edu = require("education");
var album = sm("do_Album");

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

ShowUserInfo();

function ShowUserInfo(){
	edu.GetUserInfo(function(data) {
		if(data.small_avatar_url){
			ui("img_head").source = data.small_avatar_url;
		}
		else{
			ui("img_head").source = "source://image/defaultusericon.png";
		}
		ui("do_Label_name").text = data.screen_name;
		ui("lab_phone").text = data.phone;
		ui("lab_mail").text = data.email;
		ui("lab_cardid").text = data.identity_card_num;
		if(data.gender == "f"){
			ui("lab_male").text = "女";
		}else if(data.gender == "m"){
			ui("lab_male").text = "男";
		}else if(data.gender == "n"){
			ui("lab_male").text = "保密";
		}		
		ui("lab_company").text = data.company;
		ui("lab_job").text = data.job;
		ui("lab_role").text = data.honor;

	});
};

/*
ui("btn_editicon").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_usericon.ui",
		statusBarState : "transparent",
	});	

})
*/
ui("btn_editname").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_username.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editphone").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_userphone.ui",
		statusBarState : "transparent",
	});	
})


ui("btn_editemail").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_useremail.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editid").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_userid.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editmale").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_usermale.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editcompany").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_usercompany.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editjob").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_userjob.ui",
		statusBarState : "transparent",
	});	
})

ui("btn_editrole").on("touch", function(){
	app.openPage({
		source: "source://view/user/edit_userrole.ui",
		statusBarState : "transparent",
	});	
})

page.on("result", function(){
	ShowUserInfo();
});
