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

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})


var coursesortdata = mm("do_ListData");
var grid_coursesort = ui("grid_coursesort");

grid_coursesort.bindItems(coursesortdata);
var sortdata = [
{
	"sort_id": 67,
	"sort_name":"肝胆病症",
	"sort_img":"source://image/NK-icon-a@2x.png",
	"bingzheng_id":74,
	"bingli_id":75,	
},
{
	"sort_id": 68,
	"sort_name":"心脑病症",
	"sort_img":"source://image/NK-icon-b@2x.png",
	"bingzheng_id":76,
	"bingli_id":77,	
},
{
	"sort_id": 69,
	"sort_name":"脾胃肠病症",
	"sort_img":"source://image/NK-icon-c@2x.png",
	"bingzheng_id":78,
	"bingli_id":79,	
},
{
	"sort_id": 70,
	"sort_name":"肺系病症",
	"sort_img":"source://image/NK-icon-d@2x.png",
	"bingzheng_id":80,
	"bingli_id":81,	
},
{
	"sort_id": 71,
	"sort_name":"肾膀胱病症",
	"sort_img":"source://image/NK-icon-e@2x.png",
	"bingzheng_id":82,
	"bingli_id":83,	
},

];


coursesortdata.addData(sortdata);			
grid_coursesort.refreshItems();

/*
edu.CourseSubSort(67,function(data){
	deviceone.print(JSON.stringify(data));
})
*/

ui("btn_more_cme").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 33,
			"category_name": "内科病症知识及内科病例教学"
		},
		statusBarState : "transparent",
	});		
});



