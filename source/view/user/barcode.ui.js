/**
 * related to barcode.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2018-01-19
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");
var data_cache = sm("do_DataCache");
var edu = require("education");
var diag = sm("do_Dialog");

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

page.on("loaded", function(){
	ui("barcode").start(function(data, e) {
		deviceone.print("------" + JSON.stringify(e));
		if(e.code == "0"){
	        deviceone.print("result : " + data.value);
	        //deviceone.print(JSON.stringify(data));	        
	         var code  = data.value;
	         edu.ExchangeScore(code, function(data){
	         	if(data.status  == 200){
	         		var data1 = JSON.parse(data.data);
	         		if(data1.code == "SUCCESS"){
	             		var diagpath = "source://view/user/diag_exchangesuccess.ui";
	             		var data2 = {
	             				"score" : data1.score,	
	             		};           		
	         			diag.open(diagpath, data2, false, function(data, e) {
	         				
	         			})
	         		} 
	         		else{
	         			nf.alert(data.data1.error);
	         		}
	         	}else{
	         		var diagpath = "source://view/user/diag_exchangefailed.ui"; 		
	     			diag.open(diagpath, null, false, function(data, e) {
	     				
	     			})
	         	}
	         })			
		}else{
			nf.alert("扫描失败！", function(){
				app.closePage();
			});
			
		}

    })	
})


ui("btn_inputcode").on("touch", function(){
		app.openPage({
		source: "source://view/user/inputcode.ui",
		statusBarState : "transparent",
	});	
})

page.on("refreshscore", function(){
	app.closePage();
})

page.on("result", function(){
	ui("barcode").start(function(data, e) {
        deviceone.print("result : " + data.value);
        var code  = data.value;
        edu.ExchangeScore(code, function(data){
        	if(data.status  == 200){
        		var data1 = JSON.parse(data.data);
        		if(data1.code == "SUCCESS"){
            		var diagpath = "source://view/user/diag_exchangesuccess.ui";
            		var data2 = {
            				"score" : data1.score,	
            		};           		
        			diag.open(diagpath, data2, false, function(data, e) {
        				
        			})
        		} 
        		else{
        			nf.alert(data.data1.error);
        		}
        	}else{
        		var diagpath = "source://view/user/diag_exchangefailed.ui"; 		
    			diag.open(diagpath, null, false, function(data, e) {
    				
    			})
        	}
        })
    })	
})
