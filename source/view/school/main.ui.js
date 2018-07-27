var app = sm ("do_App");
var nf = sm("do_Notification");
var page = sm ("do_Page");
var root = ui("$");
var edu = require("education");


edu.CourseSort(function(data){
	if(data.status == 401){
		edu.GetNewToken();
	}
})

ui("lay_bonescourse").on("touch",function(){
	    app.openPage({
	        source : "source://view/school/gushang_center.ui",
	        statusBarState : "transparent",
	    });	

});

ui("lay_basiccourse").on("touch",function(){
	    app.openPage({
	        source : "source://view/school/basic_center.ui",
	        statusBarState : "transparent",
	    });	
});


ui("lay_neishangcenter").on("touch",function(){
    app.openPage({
        source : "source://view/school/neishang_center.ui",
        statusBarState : "transparent",
    });	
});
