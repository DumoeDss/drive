/**
 * Created by dongdong on 16/5/11.
 */
/**
 * jquery resize event extends to div
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);

/**
 *
 * topbar 相关的js
 *
 * */
var topbar_control=(function(){
	
    //search框显示隐藏
    function toggle_search(){
        $('#header-search').on('click','.topbar-btn',function(){
            var $this=$(this);
            $this.parent().toggleClass('topbar-search-dropdown-open');
            $this.siblings('.topbar-search-dropdown').toggleClass('hide');
        });
    }

    function change_factorybanner(logo,factorymsg){
//        $('.topbar-head .topbar-logo').html(logo);
        $('.topbar-head .topbar-btn span').html(factorymsg);

    }
    return {
        toggle_search:toggle_search,
        change_factorybanner:change_factorybanner
    }

})();

/**
 *
 * 左侧菜单控制 js
 *
 **/
var left_sidebar_control=(function(){

    //switch      icon menu or icon+text menu
    function switch_menu_mode(){
//        $('#switch-menu-mode').on('click',function(){
//
//            var $this=$(this);
//
//            if($this.hasClass('icon-unfold')){
//                $this.removeClass('icon-unfold').addClass('icon-fold');
//                $this.parents('.viewFramework-body').removeClass('viewFramework-sidebar-full').addClass('viewFramework-sidebar-mini');
//            }else{
//                $this.removeClass('icon-fold').addClass('icon-unfold');
//                $this.parents('.viewFramework-body').removeClass('viewFramework-sidebar-mini').addClass('viewFramework-sidebar-full');
//            }
//            tooltipsEvent();//显示折叠菜单的tooltips
//            $('#allmap').css('width','100%');
////            $('.dataTables_scrollHead,.dataTables_scrollHead,.dataTable,.dataTables_scrollHeadInner').css('width','100%');
//        })
    };

    // menu details open or close
    function toggle_menu_detail(){
        $('.sidebar-nav').on('click','.sidebar-title',function(){
            var $this = $(this).parent();
            $this.toggleClass('sidebar-nav-fold');
        });
    };

    // menu add active style
    
    function add_active_style(menuDatas){

        var menujson = menuDatas;
        var level_two_menudata = handletosecondmenu(menujson);

        $('.sidebar-nav .sidebar-trans').on('click','.nav-item',function(){
            var $this = $(this);
            var current_menu = $this.attr('objid1');

            $this.parents('.sidebar-nav').siblings().find('.nav-item').removeClass('active');
            $this.siblings('.nav-item').removeClass('active');
            $this.addClass('active');

//            $('.viewFramework-product').addClass('viewFramework-product-col-1');
            $('#flexible-controller').removeClass('hide');

            $('.product-nav-scene').find('.product-nav-title,.product-nav-list').remove();

            var currentlevel2_list = selecttothirdmenu(level_two_menudata,current_menu);

            menu_data_to_html('second-menutpl',currentlevel2_list);

            if($('.product-nav-scene').find('.product-nav-title').length==0){
                $('.viewFramework-product').removeClass('viewFramework-product-col-1');
                $('.icon-collapse-left').css('display','none');
                $('.icon-collapse-right').css('display','block');
            }
        });


        /**
         * 控制三级菜单和四级菜单的选中，三级菜单如果有子菜单（4级菜单），那么点击事件为展开和伸缩4级菜单
        */
        $('#product-nav-list').on('click','ul > li',function(e){
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var $level4 = $this.children('ul');
            var $level4arrow = $this.find('span');
            var flag = $level4.length;
            if(flag != 0){
                $level4.toggleClass('hide');
                if($level4.hasClass('hide') && ($level4.find('.active')).length > 0){
                    $level4arrow.attr('class','icon-arrow-right');
                    $this.siblings('li').removeClass('active');
                    $this.siblings('li').find('li').removeClass('active');
                    $this.addClass('active');
                }else if($level4.hasClass('hide') && ($level4.find('.active')).length == 0){
                    $level4arrow.attr('class','icon-arrow-right');
                    $this.removeClass('active');
                }else if((!$level4.hasClass('hide')) && ($level4.find('.active')).length > 0){
                    $level4arrow.attr('class','icon-arrow-down');
                    $this.removeClass('active');
                }else{
                    $level4arrow.attr('class','icon-arrow-down');
                }
            }else{
                $(".level4-submenu li").removeClass('active');
                $this.siblings('li').removeClass('active');
                $this.parents('li').removeClass('active');
                $this.parents('li').siblings().removeClass('active');
                $this.addClass('active');

            }
        });
    };


    //show or hide 多级菜单
    function show_submenu_list(){
        $('#flexible-controller').on('click',function(){
            $('.viewFramework-product').toggleClass('viewFramework-product-col-1');
            $(this).find('.icon-collapse-left .icon-collapse-right').toggle();
            //$('.dataTables_scrollHead,.dataTables_scrollHead,.dataTable,.dataTables_scrollHeadInner').css('width','100%');
        })
    };


    //可收缩一级菜单栏 初始化
    function menu_levelone_data_to_html(tplmenu,menuDatas){
        var menudata = menuDatas;
    }
/**
 * 单击菜单，根据当前菜单截取目标三级菜单
 * */

    function selecttothirdmenu(listobj,value){
        var select_menu = {children:[]};
        for(var index = 0; index < listobj["children"].length; index ++){
            if(parseInt(listobj["children"][index]["objId"]) === parseInt(value)){
                select_menu["children"].push(listobj["children"][index]);
                return select_menu;
            }
        }
    }

    //将对象里面的二级菜单对象全部获取
    function handletosecondmenu(obj){

        var level_two_menudata={children:[]};

        $.each(obj["children"],function(index,value){
            $.each(value["children"],function(index1,value1){
                level_two_menudata["children"].push(value1);
            });
        });
        return level_two_menudata;
    }

    /**
     * 将数据结合模版渲染出dom
     * @param tplmenu
     * @param obj
     */
    function menu_data_to_html(tplmenu,obj){


    }

    /**
     * 当menu折叠后，出现tooltips.
     */
    function tooltipsEvent(){
        var flag = $('.viewFramework-body').hasClass('viewFramework-sidebar-mini');
        var $tooltipswrap = $('.kingtroldata-console-sidebar-tooltip');
        var $tooltipstext = $('.kingtroldata-console-sidebar-tooltip .tooltip-inner');
        var $sidebarNavItem = $('.sidebar-inner .sidebar-nav .nav-item');
        var $sidebarNavTitle = $('.sidebar-inner .sidebar-nav .sidebar-title-inner');

        if(flag){
            $sidebarNavItem.on({
                mouseenter: function(){
                    $tooltipswrap.removeClass('hide');
                    $tooltipswrap.css("top",($(this).offset().top));
                    $tooltipstext.html($(this).find('.nav-title').html()) ;
                },
                mouseleave: function(){
                    $tooltipswrap.addClass('hide');
                }
            });
            $sidebarNavTitle.on({
                mouseenter: function(){
                    $tooltipswrap.removeClass('hide');
                    $tooltipswrap.css("top",($(this).offset().top));
                    $tooltipstext.html($(this).find('.sidebar-title-text').html()) ;
                },
                mouseleave: function(){
                    $tooltipswrap.addClass('hide');
                }
            });
        }else{
            $tooltipswrap.addClass('hide');
            $sidebarNavItem.off();
            $sidebarNavTitle.off();
        }


    }





    //init left menu
    function init_menu(menuDatas){
        switch_menu_mode(); //controller of  menu
        menu_levelone_data_to_html('first-menutpl',menuDatas); //init menu data
        toggle_menu_detail();
        add_active_style(menuDatas);
        show_submenu_list();

    };

    /**
     * 菜单记忆
     * @param url,要解析的url地址，其中url中菜单的关键字为menuPath
     */
    	function init_menu_memory(menuDatas){
    		

//    	    /**
//    	     * 解析url中的菜单参数
//    	     * @param url
//    	     * @returns {*}
//    	     */
//    	    function menu_memory(url){
//    	        var reg = /menuPath=([^&?]*\d)/;
//    	        var curent_menuid = url.match(reg);
//    	        return curent_menuid;
//    	    }
//    	    var curent_id = menu_memory(window.location.href);
//    	    //如果可以获得匹配，则进行样式设置
//    	    if(curent_id != '' && curent_id != null && curent_id != undefined){
//    	        (function(){
//    	            var menujson = menuDatas;
//    	            var level_two_menudata = handletosecondmenu(menujson);
//    	            var curent_menu_html_id = curent_id[1].split("^")[2];
//    	            var curent_length = curent_id[1].split("^").length;
//    	            var currentlevel2_list = selecttothirdmenu(level_two_menudata,curent_menu_html_id);
//    	            menu_data_to_html('second-menutpl',currentlevel2_list);
//    	            $('.sidebar-fold').attr('class','sidebar-fold icon-fold');
//    	            $('.viewFramework-product').attr('class','viewFramework-product viewFramework-product-col-1');
//    	            var $curent_menu_li = $("li[objid1='" + curent_id[1].split("^")[curent_length-1] + "']");
//    	            var $level_two_menu = $('.nav-item');
//    	            if($curent_menu_li.length != 0){
//    	                //if判断为四级菜单else if表示选中为二级菜单 else 表示选中为三级菜单
//    	                if($curent_menu_li.parent().hasClass('level4-submenu')){
//    	                    $('.viewFramework-body').attr('class','viewFramework-body viewFramework-sidebar-mini');
//    	                    tooltipsEvent();
//    	                    var $curent_menu_pli = $($curent_menu_li).parent().parent();
//    	                    $('#flexible-controller').removeClass('hide');
//    	                    $curent_menu_li.siblings('li').removeClass('active');
//    	                    $curent_menu_pli.siblings('li').removeClass('active');
//    	                    $curent_menu_pli.siblings('li').find('li').removeClass('active');
//    	                    $curent_menu_li.addClass('active');
//
//    	                    $.each($level_two_menu,function(index,value){
//    	                        $(value).removeClass('active');
//    	                    });
//    	                    $.each($level_two_menu,function(index,value){
//    	                        if(parseInt($(value).attr('objid1')) == parseInt(curent_id[1].split("^")[2])){
//    	                            $(value).addClass('active');
//    	                        }
//    	                    });
//    	                }else if($curent_menu_li.parent().hasClass('sidebar-trans')){
//    	                    $('.viewFramework-body').attr('class','viewFramework-body viewFramework-sidebar-full');
//    	                    $('.viewFramework-product').removeClass('viewFramework-product-col-1');
//    	                    $curent_menu_li.siblings('li').removeClass('active');
//    	                    $curent_menu_li.parent().parent().siblings().find('li').removeClass('active');
//    	                    $curent_menu_li.addClass('active');
//    	                }else {
//    	                    $('.viewFramework-body').attr('class','viewFramework-body viewFramework-sidebar-mini');
//    	                    tooltipsEvent();
//    	                    $('#flexible-controller').removeClass('hide');
//    	                    $curent_menu_li.siblings('li').removeClass('active');
//    	                    $curent_menu_li.siblings('li').find('li').removeClass('active');
//    	                    $curent_menu_li.addClass('active');
//    	                    $.each($level_two_menu,function(index,value){
//    	                        $(value).removeClass('active');
//    	                    });
//    	                    $.each($level_two_menu,function(index,value){
//    	                        if(parseInt($(value).attr('objid1')) == parseInt(curent_id[1].split("^")[2])){
//    	                            $(value).addClass('active');
//    	                        }
//    	                    });
//
//    	                }
//    	            }
//    	        })();
//    	    }else{
//    	        $(".viewFramework-product").removeClass('viewFramework-product-col-1');
//    	    }
    	
    		
    	}
    return {
        init_menu:init_menu,
        init_menu_memory:init_menu_memory
        
    };
})();

/**
 * 获取菜单数据
 */
var menuData_control = (function(){
    var menuDatas = [];
    
})();

var loading_control = (function(){
    function loading_show(){
        $('#loading').show();
    }
    function loading_hide(){
        $('#loading').hide();
    }
    return {
        loading_show:loading_show,
        loading_hide:loading_hide
    }
})();

/**
 * Created by dongdong on 16/5/11.
 */
$(document).ready(function(){
    var html = '<img src="/JB_Industry/image/title.png"/>';
	var logo = '<span><img src=""  /></span>';
    topbar_control.change_factorybanner(logo,html);
    var menudatas = {};
    //初始化菜单
    left_sidebar_control.init_menu(menudatas);
    //菜单记忆
    left_sidebar_control.init_menu_memory(menudatas);
    
    $('.dataTables_scrollHeadInner .table').width($('.dataTables_scrollHead').width()-2);
    try{
    	var perfectscroll_wraps= $(".left-drag-component").length==0?'.viewFramework-body,.sidebar-content,.product-nav-list':'.viewFramework-body,.sidebar-content,.product-nav-list,.selectZone';
    	$(perfectscroll_wraps).perfectScrollbar({
	        wheelSpeed: 2,
	        wheelPropagation: true,
	        minScrollbarLength: 20
	    });
    }catch(e){
    	 console.log("perfectScrollbar init is error,but do not handle it")
    }
 
});

//判断选中菜单是否超出窗口显示高度
if($("#allmap").length<0){
	window.onload=function(){
		var liheigth=$('#product-nav-list .active').offset().top;
		var winheight=$(window).height();
		if(liheigth+100>winheight){
			$('#product-nav-list .product-nav-list').scrollTop(winheight);
		}
	}
} 


