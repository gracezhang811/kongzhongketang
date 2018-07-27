var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var con = require("const");
var edu = require("education");

var data_cache = sm("do_DataCache");
var leshi_play = sm("M0078_LePlayerLive");
var diag = sm("do_Dialog");
var login_status;
var course_id = page.getData().course_id;
var course_name = page.getData().course_name;
var periodlistdata = mm("do_ListData");
var period_list = ui("period_list");
var user_id;
var page_num = 1;
var nextpageurl = "";
var period_num = 0;
var score_cost = 0;

var totalFee = 0.00;
var course_description = "";
var course_status = 0;    //0:免费未加入   1:免费已加入    2:未付费    3:已付费
var first_lesson = "";
var first_lesson_name = "";

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});

period_list.bindItems(periodlistdata);

ShowCourseDetail();

//显示课程详情
function ShowCourseDetail(){
	edu.CourseDetail(course_id, function(data){	
		deviceone.print("show course detail");
		user_id = data.user_id;
		if(data.cover_url){
			ui("img_cover").source = encodeURI(data.cover_url);
		}else{
			ui("img_cover").source = "source://image/default_course.png"
		}
		
		ui("lab_course_title").text = data.name;
		ui("web_detail").loadString(data.detail);
		score_cost = data.score_exchange;
	
		ui("lab_course_price").text = data.score_exchange + "积分";
		totalFee = data.price;

		if((data.joined == true) && (score_cost == 0)){
			ui("btn_join_course").visible = false;
			ui("btn_buy_course").visible = false;	
			ui("btn_play_course").visible = true;	
			course_status = 1;
		}else if((data.joined == true) && (score_cost > 0)){
			ui("btn_join_course").visible = false;
			ui("btn_buy_course").visible = false;	
			ui("btn_play_course").visible = true;	
			course_status = 3;
		}else if((data.joined == false) && (score_cost > 0)){
			ui("btn_join_course").visible = false;	
			ui("btn_buy_course").visible = true;
			ui("btn_play_course").visible = false;	
			course_status = 2;
		}else if((data.joined == false) && (score_cost == 0)){
			ui("btn_join_course").visible = true;
			ui("btn_buy_course").visible = false;		
			ui("btn_play_course").visible = false;	
			course_status = 0;
		}
		deviceone.print("course_status = " + course_status);
		ShowCoursePeriod(1);
	});
}

//显示课时列表
function ShowCoursePeriod(page_num){
    edu.CoursePeriodList(page_num, course_id, function(data){    
        deviceone.print("show course period, course_status = " + course_status);  
        if(data.results.length){
        	nextpageurl = data.next;
            var i = 0;
            var video_unique = "";
            first_lesson = data.results[i].video_unique;
            first_lesson_name = data.results[i].title;
            while(data.results[i]){
            	if(data.results[i].video_unique){
            		video_unique = data.results[i].video_unique;
            	}
                var period_info = {
                        "course_status": course_status,
                        "course_id": course_id,
                        "video_unique": video_unique,
                }
                data.results[i]["period_info"] = period_info;
                i++;
            }
            period_num = period_num + i;
            periodlistdata.addData(data.results);        	
        }else{
        	first_lesson = "";
        }
        period_list.refreshItems();
        if(period_num){
        	ui("lab_no_period").visible = false;
        }else{
        	ui("lab_no_period").visible = true;
        }
    });
}


//下拉到一定位置松手开始刷新数据
period_list.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	periodlistdata.removeAll();
    	period_list.refreshItems();   	
    	period_num = 0;
    	ShowCoursePeriod(1);    
    	period_list.rebound();
    	page_num = 1;
    }
});

//上拉显示下一页数据
period_list.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextpageurl){
    		page_num++;
    		deviceone.print("add next period page");
    		ShowCoursePeriod(page_num);
    	}else{
			nf.toast("数据已加载完！");
		}
    	period_list.rebound();
    }
});


//加入课程
ui("btn_join_course").on("touch", function(){
	deviceone.print("join class");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	if(login_status == 1){
		edu.JoinCourse(course_id, function(data){
			if(data.id){
				nf.toast("加入课程成功");
				periodlistdata.removeAll();
				period_list.refreshItems();
				period_num = 0;
				period_page_num = 1;
			    ShowCourseDetail();
				period_list.rebound();
			}else{
				nf.toast("加入课程失败");
			}
			
		})
	}else{
		app.openPage({
			source: "source://view/user/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}
	
});

//购买课程
ui("btn_buy_course").on("touch", function(){
	deviceone.print("join class");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var diagpath = "source://view/school/diag_buywithscore.ui";
	var data = {
			"course_id" : course_id,	
			"score_cost": score_cost,
	};
	
	if(login_status == 1){
		diag.open(diagpath, data, false, function(data, e) {
			
		})
		
	}else{
		app.openPage({
			source: "source://view/user/login.ui",
			statusBarState : "transparent"
		});
	}
	
});

ui("btn_play_course").on("touch", function(){	
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);
	
	if(login_status != 1){
		app.openPage({
			source: "source://view/user/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}else{
		if((course_status == 0)||(course_status == 2)){
			nf.alert("请先加入课程!");
		}else{
			if(first_lesson){
				deviceone.print("play video");
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:first_lesson, payerName:payer_name, title:first_lesson_name});								
				//leshi_play.playByID(con.LESHI_UUID, video_unique, payer_name);
			}else{
				nf.alert("该课程没有视频课时!");
			}

		}
	}

});


ui("img_play").on("touch", function(){
	deviceone.print("play video");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);
	
	if(login_status != 1){
		app.openPage({
			source: "source://view/user/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}else{
		if((course_status == 0)||(course_status == 2)){
			nf.alert("请先加入课程!");
		}else{
			if(first_lesson){
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:first_lesson, payerName:payer_name, title:first_lesson_name});								
				//leshi_play.playByID(con.LESHI_UUID, video_unique, payer_name);
			}else{
				nf.alert("该课程没有视频课时!");
			}

		}
	}

});

//显示课时列表
ui("btn_show_period").on("touch", function(){
    ui("lab_show_video").fontColor = "000000FF";
    ui("lab_show_detail").fontColor = "7D7D7DFF";
    ui("lay_under_video").bgColor = "1BA6FBFF";
    ui("lay_under_detail").bgColor = "FFFFFFFF";
    period_list.visible = true;
    ui("web_detail").visible = false;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
});

//显示课程名称和简介
ui("btn_show_detail").on("touch", function(){
    ui("lab_show_video").fontColor = "7D7D7DFF";
    ui("lab_show_detail").fontColor = "000000FF";
    ui("lay_under_video").bgColor = "FFFFFFFF";
    ui("lay_under_detail").bgColor = "1BA6FBFF";
    period_list.visible = false;
    ui("web_detail").visible = true;
    ui("lab_no_period").visible = false;
});


page.on("result", function(data) {   
	periodlistdata.removeAll();
	period_list.refreshItems();   	
	period_num = 0;
	page_num = 1;
	ShowCourseDetail();
	period_list.rebound();	
    ui("lab_show_video").fontColor = "000000FF";
    ui("lab_show_detail").fontColor = "7D7D7DFF";
    ui("lay_under_video").bgColor = "1BA6FBFF";
    ui("lay_under_detail").bgColor = "FFFFFFFF";
    period_list.visible = true;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
    ui("web_detail").visible = false;
});


page.on("buycourse", function(data) {   
	periodlistdata.removeAll();
	period_list.refreshItems();   	
	period_num = 0;
	page_num = 1;
	ShowCourseDetail();
	period_list.rebound();	
    ui("lab_show_video").fontColor = "000000FF";
    ui("lab_show_detail").fontColor = "7D7D7DFF";
    ui("lay_under_video").bgColor = "1BA6FBFF";
    ui("lay_under_detail").bgColor = "FFFFFFFF";
    period_list.visible = true;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
    ui("web_detail").visible = false;
});

