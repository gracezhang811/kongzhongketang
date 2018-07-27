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
var album = sm("do_Album");
var camera = sm("do_Camera");
var device = sm("do_Device");
var storage = sm("do_Storage");

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

ui("lay_album").on("touch", function(){
	album.select(1, -1, -1, 100, true, 0, function(data, e) {
		deviceone.print(JSON.stringify(data));
		var imgpath = data[0];
		if((device.getInfo().OS[0] == "A")||(device.getInfo().OS[0] == "a")){
			deviceone.print("uses system = " + device.getInfo().OS);
			var newpath = imgpath.replace(".do","");
			deviceone.print("newpath = " + newpath);
			storage.copyFile(imgpath, newpath, function(data1, e) {
				if(data1 == true){
					var para = {"avatar_url":newpath};
					var id = data_cache.loadData(con.CK_USER_ID);
				    edu.ChangeUserInfo(para,id, function(data2){
				    	if(data2.status  == 200){
				    		nf.toast("修改成功！");
				    		app.closePage();
				    	}else{
				    		nf.toast("修改失败！");
				    	}
				    })	
				
				}
				
			})
			
		}else if((device.getInfo().OS[0] == "O")||(device.getInfo().OS[0] == "o")){
			deviceone.print("uses system = " + device.getInfo().OS);
			var para = {"avatar_url":imgpath};
			var id = data_cache.loadData(con.CK_USER_ID);
		    edu.ChangeUserInfo(para,id, function(data2){
		    	if(data2.status  == 200){
		    		nf.toast("修改成功！");
		    		app.closePage();
		    	}else{
		    		nf.toast("修改失败！");
		    	}
		    })					
		}
		
		
	})
})

ui("lay_camera").on("touch", function(){
	camera.capture(-1, -1, 100, true, false, "", function(data, e) {
		deviceone.print(JSON.stringify(data));
		var imgpath = data;
		if((device.getInfo().OS[0] == "A")||(device.getInfo().OS[0] == "a")){
			deviceone.print("uses system = " + device.getInfo().OS);
			var newpath = imgpath.replace(".do","");
			deviceone.print("newpath = " + newpath);
			storage.copyFile(imgpath, newpath, function(data1, e) {
				if(data1 == true){
					var para = {"avatar_url":newpath};
					var id = data_cache.loadData(con.CK_USER_ID);
				    edu.ChangeUserInfo(para,id, function(data2){
				    	if(data2.status  == 200){
				    		nf.toast("修改成功！");
				    		app.closePage();
				    	}else{
				    		nf.toast("修改失败！");
				    	}
				    })					
				}
				
			})			
		}else if((device.getInfo().OS[0] == "O")||(device.getInfo().OS[0] == "o")){
			deviceone.print("uses system = " + device.getInfo().OS);
			var para = {"avatar_url":imgpath};
			var id = data_cache.loadData(con.CK_USER_ID);
		    edu.ChangeUserInfo(para,id, function(data2){
		    	if(data2.status  == 200){
		    		nf.toast("修改成功！");
		    		app.closePage();
		    	}else{
		    		nf.toast("修改失败！");
		    	}
		    })				
		}
	})
})