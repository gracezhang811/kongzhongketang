var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var edu = require("education");
var invoke = require("httpinvoke");

var courselistdata = mm("do_ListData");
var list_course = ui("list_course");
var bingzheng_id = page.getData().bingzheng_id;
var bingli_id = page.getData().bingli_id;
var category_name = page.getData().category_name;
var current_sort_id = bingzheng_id;

var pagenum = 1;
var nextpageurl;


page.on("back", function(){ app.closePage() });

ui("lay_goback").on("touch", function () {
	app.closePage();
});

list_course.bindItems(courselistdata);

ui("lab_courselist_name").text = category_name;
ui("lab_bingzheng").fontColor = "3B96FFFF";
courselistdata.removeAll();
list_course.refreshItems();

ShowCourseList(bingzheng_id);

function RebuildCourseData(data){
	var i = 0;
	while(data[i]){

		data[i]["showprice"] = data[i].score_exchange + "积分";
		data[i]["pricecolor"] = "D54343FF";

		if(data[i].small_cover_url){
			data[i]["showimage"] = encodeURI(data[i].small_cover_url);
		}else{
			data[i]["showimage"] = "source://image/default_course.png";
		}
		if(data[i].live == true){
			data[i]["showlive"] = true;
		}else{
			data[i]["showlive"] = false;
		}		
		i++;
	}
}

function ShowCourseList(category_id){
	edu.CourseList(category_id, function(data){	
		deviceone.print("show course list");
		nextpageurl = data.next;
		if(data.results){
			RebuildCourseData(data.results);
			courselistdata.addData(data.results);			
		}
		list_course.refreshItems();
	});
}

function CourseListNext(){ 
	invoke.InvokeEDUGet1(nextpageurl,function(data) {
		nextpageurl = data.next;
		if(data.results){
			RebuildCourseData(data.results);
			courselistdata.addData(data.results);			
		}
		list_course.refreshItems(); 
	})
}

//下拉到一定位置松手开始刷新数据
list_course.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	courselistdata.removeAll();
    	list_course.refreshItems();
    	ShowCourseList(current_sort_id);    	
    	list_course.rebound();
    }
});

//上拉显示下一页数据
list_course.on("push", function(data) {
    if (data.state == 2) {      
    	deviceone.print("-----push");
    	if(nextpageurl){
    		deviceone.print("next page");
    		CourseListNext();
    	}else{
			nf.toast("数据已加载完！");
		}
    	list_course.rebound();
    }
});


ui("btn_bingzheng").on("touch", function(){
	current_sort_id = bingzheng_id;
	deviceone.print("show bingzheng, sort id = " + current_sort_id);
	ui("lab_bingzheng").fontColor = "3B96FFFF";
	ui("lay_bingzheng_line").bgColor = "3B96FFFF";
	ui("lab_bingli").fontColor = "000000FF";
	ui("lay_bingli_line").bgColor = "FFFFFFFF";
	courselistdata.removeAll();
	list_course.refreshItems();

	ShowCourseList(bingzheng_id);
})

ui("btn_bingli").on("touch", function(){
	current_sort_id = bingli_id;
	deviceone.print("show bingli, sort id = " + current_sort_id);
	ui("lab_bingzheng").fontColor = "000000FF";
	ui("lay_bingzheng_line").bgColor = "FFFFFFFF";
	ui("lab_bingli").fontColor = "3B96FFFF";
	ui("lay_bingli_line").bgColor = "3B96FFFF";
	courselistdata.removeAll();
	list_course.refreshItems();

	ShowCourseList(bingli_id);
})