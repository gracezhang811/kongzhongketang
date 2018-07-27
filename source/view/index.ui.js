/**
 * @Author : ��������
 * @Timestamp : 2017-07-18
 */
var nf = sm("do_Notification");
var do_Global = sm ("do_Global");
var app = sm ("do_App");
var page = sm ("do_Page");
var datacache = sm("do_DataCache")
var con = require("const");
var invoke = require("httpinvoke");

var canback = false;
var timer = mm ("do_Timer");
timer.delay = 2000;
timer.interval = 1000;
timer.on("tick",function(){
	timer.stop();
	canback = false;
})
page.on("back",function(){
	if(canback){
		datacache.removeData("PublicLogin");
		do_Global.exit();
	}else {
		timer.start();
		nf.toast("再次点击退出应用！");
		canback = true;
	}
})

var ViewShower_center  = ui ("do_ViewShower_center");
var do_ALayout_school = ui ("do_ALayout_school");
var do_ALayout_user = ui ("do_ALayout_user");
var do_school_img = ui ("do_school_img");
var do_user_img = ui ("do_user_img");
var do_Label_school = ui ("do_Label_school");
var do_Label_user = ui ("do_Label_user");


do_ALayout_school.on ("touch",function(){
	do_school_img.source = "source://image/bottom-nav-icon-a-sel@2x.png";
	do_user_img.source = "source://image/bottom-nav-icon-b@2x.png";
	do_Label_school.fontColor = "1BA6FBFF";
	do_Label_user.fontColor = "DDDDDDFF";
	ViewShower_center.showView("school")
})

do_ALayout_user.on ("touch",function(){
	if(datacache.loadData(con.CK_IS_LOGIN) == 1){
		do_school_img.source = "source://image/bottom-nav-icon-a@2x.png";
		do_user_img.source = "source://image/bottom-nav-icon-b-sel@2x.png";
		do_Label_school.fontColor = "DDDDDDFF";
		do_Label_user.fontColor = "1BA6FBFF";
		ViewShower_center.showView("user");				
	}else{
		app.openPage({
			source:"source://view/user/login.ui",
			statusBarState: "transparent",
			animationType:"slide_r2l"
		})
	}

})



var list_show = [{
	"id":"school",
	"path":"source://view/school/main.ui"
},{
	"id":"user",
	"path":"source://view/user/main.ui"
}]
ViewShower_center.addViews(list_show);
ViewShower_center.showView("school");

page.on("logout", function(){
	do_school_img.source = "source://image/bottom-nav-icon-a-sel@2x.png";
	do_user_img.source = "source://image/bottom-nav-icon-b@2x.png";
	do_Label_school.fontColor = "1BA6FBFF";
	do_Label_user.fontColor = "DDDDDDFF";
	ViewShower_center.showView("school")
});