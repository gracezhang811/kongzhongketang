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
	"sort_id": 37,
	"sort_name":"骨科",
	"sort_img":"source://image/icon-a@2x.png"
},
{
	"sort_id": 39,
	"sort_name":"中医科",
	"sort_img":"source://image/icon-b@2x.png"
},
{
	"sort_id": 43,
	"sort_name":"消化科",
	"sort_img":"source://image/icon-c@2x.png"
},
{
	"sort_id": 53,
	"sort_name":"肛肠科",
	"sort_img":"source://image/icon-d@2x.png"
},
{
	"sort_id": 48,
	"sort_name":"妇产科",
	"sort_img":"source://image/icon-e@2x.png"
},
{
	"sort_id": 54,
	"sort_name":"儿科",
	"sort_img":"source://image/icon-f@2x.png"
},
{
	"sort_id": 40,
	"sort_name":"内分泌科",
	"sort_img":"source://image/icon-g@2x.png"
},
{
	"sort_id": 38,
	"sort_name":"风湿免疫科",
	"sort_img":"source://image/icon-h@2x.png"
},
{
	"sort_id": 52,
	"sort_name":"皮肤科",
	"sort_img":"source://image/icon-i@2x.png"
},
{
	"sort_id": 56,
	"sort_name":"感染疾病科",
	"sort_img":"source://image/icon-j@2x.png"
},
{
	"sort_id": 60,
	"sort_name":"肿瘤科",
	"sort_img":"source://image/icon-k@2x.png"
},
{
	"sort_id": 65,
	"sort_name":"神经内科",
	"sort_img":"source://image/icon-l@2x.png"
},
{
	"sort_id": 45,
	"sort_name":"心胸外科",
	"sort_img":"source://image/icon-m@2x.png"
},
{
	"sort_id": 55,
	"sort_name":"心内科",
	"sort_img":"source://image/icon-n@2x.png"
},
{
	"sort_id": 58,
	"sort_name":"性病科",
	"sort_img":"source://image/icon-o@2x.png"
},
{
	"sort_id": 63,
	"sort_name":"头颈外科",
	"sort_img":"source://image/icon-p@2x.png"
},
{
	"sort_id": 46,
	"sort_name":"五官科",
	"sort_img":"source://image/icon-q@2x.png"
},
{
	"sort_id": 57,
	"sort_name":"血管外科",
	"sort_img":"source://image/icon-r@2x.png"
},
{
	"sort_id": 50,
	"sort_name":"疼痛科",
	"sort_img":"source://image/icon-s@2x.png"
},
{
	"sort_id": 62,
	"sort_name":"血液病科",
	"sort_img":"source://image/icon-t@2x.png"
},
{
	"sort_id": 41,
	"sort_name":"泌尿外科",
	"sort_img":"source://image/icon-u@2x.png"
},
{
	"sort_id": 59,
	"sort_name":"神经康复科",
	"sort_img":"source://image/icon-v@2x.png"
},
{
	"sort_id": 61,
	"sort_name":"男科",
	"sort_img":"source://image/icon-w@2x.png"
},
{
	"sort_id": 44,
	"sort_name":"急诊科",
	"sort_img":"source://image/icon-x@2x.png"
},
];


coursesortdata.addData(sortdata);			
grid_coursesort.refreshItems();

ui("btn_more_cme").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 33,
			"category_name": "医学知识教学课程"
		},
		statusBarState : "transparent",
	});		
});



