/**
 * related to course_sort_cell.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2018-01-03
 */
var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");

rootview.setMapping({
	"img_sort.source": "sort_img",
	"img_sort.tag": "sort_id",
	"lab_sortname.text": "sort_name",
});

//点击进入课程详情
ui("lay_sort_cell").on("touch", function(){
	deviceone.print("sort id = " + ui("img_sort").tag);
	var courselistname = ui("lab_sortname").text + "课程";
	var data1 = {
			"category_id": ui("img_sort").tag,
			"category_name": courselistname
			};
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: data1,
		statusBarState : "transparent",
	});				
});