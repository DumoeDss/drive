/**
 * 获取相对路径地址
 * @returns
 */
function reletiveUrl(){
	
	  //获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
	  var curWwwPath=window.document.location.href;
	  //获取主机地址之后的目录，如： myproj/view/my.jsp
	  var pathName=window.document.location.pathname;
	  var pos=curWwwPath.indexOf(pathName);
	  //获取主机地址，如： http://localhost:8083
	  var localhostPaht=curWwwPath.substring(0,pos);
	  //获取带"/"的项目名，如：/myproj
	  var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	  //获取带"/"的相对路径名，如：/view/my.jsp
	  var relativePath = pathName.substring(pathName.substr(1).indexOf('/')+1,pathName.length);
	  //得到了 http://localhost:8083/myproj
	  var realPath=localhostPaht+projectName;
	  
	  return relativePath;
};

/**
 * 删除确认通用方法
 * @param dltUrl   删除 Ajax 请求 URL
 * @param refreshUrl 刷新 Ajax 请求 URL
 * @param tableId  刷新 table id
 */
function deleteConfirm(dltUrl,refreshUrl,tableId){
	$.confirm({
		title : true,
		confirmButton: '确认',
	    cancelButton: '取消',
	    confirmButtonClass: 'btn-info',
	    cancelButtonClass: 'btn-danger',
		title : '系统提示',
		content : '是否确认删除数据？',
		theme: 'black',
		container: 'body',
		backgroundDismiss: true,
		autoClose: false,
		confirm: function(){
			$.ajax({url:dltUrl,
			    type : "post",
			    dataType : "json",
			    contentType : 'application/JSON;charset=UTF-8',
			    success : function(responseText) {
			    	if (responseText.result >= 1) {
			    		$('#'+tableId+'').bootstrapTable('refresh',{
							url : refreshUrl
					});
			    	} else {
			    		errorConfirm('系统提示','删除失败!');
			    	}
			    },
			    error : function() {
			    	   errorConfirm('系统提示','删除失败!');
			    }
				});
		},
	   cancle:function(){ return }
	});
}
/**
 * 错误提示通用接口
 * @param title   提示框标题
 * @param content 提示框内容
 */
function errorConfirm(title,content){
	$.confirm({
		title : true,
		backgroundDismiss : false,
		confirmButton: '确认',
		cancelButton:  '取消',
	    theme: 'black',
	    confirmButtonClass: 'btn-info',
	    cancelButtonClass:  'btn-danger',
		closeIcon : false,
		content : false,
		title : title,
		content : content
	});
}

/**
 * 提示通用接口
 * @param title   提示框标题
 * @param content 提示框内容
 */
function alertConfirm(title,content){
	$.alert({
	    title:   title,
	    content: content,
	    //icon: 'fa fa-warning',
	    confirmButton: '确认',
	    theme: 'black',
	    confirmButtonClass: 'btn-primary',
	    confirm: function(){
	    	return;
	    }
	});
}

//时间戳转化日期格式yyyy-mm-dd hh:mm:ss
function dateFormat(now) {
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var second = now.getSeconds();
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (second < 10) second = "0" + second;

    return year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + second;
}

/**
 * 时间戳转化日期格式yyyy-mm-dd 
 */
	function timeFormat(now) {
	    var year = now.getFullYear(); //getFullYear getYear
	    var month = now.getMonth();
	    var date = now.getDate();
	    month = month + 1;
	    if (month < 10) month = "0" + month;
	    if (date < 10) date = "0" + date;

	    return year + "-" + month + "-" + date ;
	} 


/**
 * 按钮权限判定
 * @param data
 */
function identify(data,btnIdList){
	var authority = null;
	for(var i=0;i<data.length;i++){
		if(data[i]=="handle"){
			authority="handle";
			break;
		}else{
			authority="view";
		}
	};
	
	switch(authority)
	{
	case "handle":
		//显示增、删、改按钮
		$.each(btnIdList,function(i,value) {
			$(value).removeClass("hidden");
		});
		break;
	case "view":
		//隐藏增、删、改按钮
		$.each(btnIdList,function(i,value) {
			$(value).addClass("hidden");
		});
		break;
	default:
		//隐藏增、删、改按钮
		$.each(btnIdList,function(i,value) {
			$(value).addClass("hidden");
		});
	};
	return authority;
	
}

/**
 * 时间段提示 通用接口
 * @param title   提示框标题
 * @param content 提示框内容
 */
function alertConfirmTime(title,content){
	$.alert({
	    title:   title,
	    content: content,
	    autoClose: 'confirm|3000',
	    //icon: 'fa fa-warning',
	    confirmButton: '确认',
	    theme: 'black',
	    confirmButtonClass: 'btn-danger',
	    confirm: function(){
	    	return;
	    }
	});
}

/**
 * 清空表单
 * @param myform
 */
function clearForm(myform){
	/*$(':input','#'+myform)  
	 .not(':button, :submit, :reset, :hidden')  
	 .val('')  ;*/
	 $("#"+myform).find("input[type='text']").val('');
	 $("#"+myform).find("textarea").val('')
	 //.removeAttr('checked')  
	 //.removeAttr('selected'); 
}
/**处理日期框**/
//全局变量
var inputCount = {};
function datePickerFormat(){
	
	//重载时间控件
	var input = $('.datetimepicker');
	for(var i = 0;i < input.length;i++){
		//为每一个input单独绑定事件
		$(input[i]).mouseover(function(){
	    
	    var name = $(this).attr("name");
	    if(inputCount[name] == null||typeof(inputCount[name]) =="undefined"){
		    	 //记录已经绑定时间的控件
		    	 inputCount[name] = $(this);
		    	 var opts = {
		 				minView: "month", //选择日期后，不会再跳转去选择时分秒
		 				format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式 
		 				language: 'zh-CN', //汉化
		 				todayBtn: true,
		 				pickTime: false,
		 				minView: '2',
		 				forceParse: false,
		 				autoclose:true //选择日期后自动关闭
		 		}
		 			//鼠标点击input时的y坐标
		 			var yzb =  window.event.screenY;
		 			var height = document.body.clientHeight;
		 			if(yzb < height/2){
		 				//如果输入框在当前屏幕的上半部分
		 				opts["pickerPosition"] = "bottom-right";
		 			}else{
		 				opts["pickerPosition"] = "top-left";
		 			}
		 			$(this).datetimepicker(opts)
	    	}else{
	    		//如果已经绑定或，就解绑moseover事件，防止重复执行
	    		$(this).unbind("mouseover")
	    	}
		});
	}
}
