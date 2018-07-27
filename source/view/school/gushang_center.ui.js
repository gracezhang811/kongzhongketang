/**
 * related to cme_school.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-31
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");
var data_cache = sm("do_DataCache");
var edu = require("education")

var category_id = 14;

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

edu.CourseSubSort(14,function(data){
	deviceone.print(JSON.stringify(data));
})


ui("lay_shoufa").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 15,
			"category_name": "手法教学课程"
		},
		statusBarState : "transparent",
	});		
});

ui("lay_bingli").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 16,
			"category_name": "病例讲解课程"
		},
		statusBarState : "transparent",
	});		
});

ui("lay_chanpin").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 84,
			"category_name": "产品知识课程"
		},
		statusBarState : "transparent",
	});		
});


ui("btn_more_cme").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 14,
			"category_name": "专家手法及病例教学"
		},
		statusBarState : "transparent",
	});		
});