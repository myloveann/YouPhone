//获取元素  封装
var getElem=function (selector) {
    return document.querySelector(selector);
}

var getAllElem=function (selector) {
    return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls=function (element) {
    return element.getAttribute('class');
}

//设置元素样式
var setCls=function (element,cls) {
    return element.setAttribute('class', cls);
}

// 为元素添加样式
var addCls=function (element,cls) {
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+' '+cls);
    }
}

//删除样式
var delCls=function (element,cls) {
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '))
    }

}

//第一步初始化样式
var screenAnimateElements={
    '.screen-1':[
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow',
    ],
    '.screen-2':[
        '.screen-2-point_i_1',
        '.screen-2-point_i_2',
        '.screen-2-point_i_3',
        '.screen-2_heading',
        '.screen-2_phone',
        '.screen-2_subheading',
    ],
    '.screen-3':[
        '.screen-3_heading',
        '.screen-3_phone',
        '.screen-3_subheading',
        '.screen-3_features'
    ],
    '.screen-4':[
        '.screen-4_heading',
        '.screen-4_subheading',
        '.screen-4_type_item_i_1',
        '.screen-4_type_item_i_2',
        '.screen-4_type_item_i_3',
        '.screen-4_type_item_i_4',
    ],
    '.screen-5':[
        '.screen-5_heading',
        '.screen-5_bg',
        '.screen-5_subheading',]
}

var setScreenAnimateInit=function (screencls) {
    var screen=document.querySelector(screencls);//获取屏幕
    var screenElements=screenAnimateElements[screencls];

    for (var i = 0; i < screenElements.length; i++) {
        var element=document.querySelector(screenElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class', baseCls+' '+screenElements[i].substring(1)+'_animate_init');
    }

}

var playScreenAnimateDone=function (screencls) {
    var screen=document.querySelector(screencls);//获取屏幕
    var screenElements=screenAnimateElements[screencls];
    for (var i = 0; i < screenElements.length; i++) {
        var element=document.querySelector(screenElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
    }
}

window.onload=function () {
    console.log('onload');
    for(k in screenAnimateElements){
        if(k==='.screen-1'){
            continue;
        }
        setScreenAnimateInit(k);
    }
}

//第二步，滚动到哪里，就播放到到哪里
var navItems=getAllElem('.header_nav-item');
var outLineItems=getAllElem('.outline_item');

var SwitchNavItemsActive=function (idx) {
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i],'header_nav-item_status_active');
    }
    addCls(navItems[idx],'header_nav-item_status_active');

    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i],'outline_item_status_active');
    }
    addCls(outLineItems[idx],'outline_item_status_active');
}

window.onscroll=function () {
    for (var i = 0; i < navItems.length; i++) {
        setTip(i,navItems);
    }
    var top=document.body.scrollTop;
    console.log(top);
    if(top>80){
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'),'outline_status_in');
    }else {
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
        SwitchNavItemsActive(0);
    }

    if(top>1){
        playScreenAnimateDone('.screen-1');
    }
    if(top>=800*1-80){
        playScreenAnimateDone('.screen-2');
        SwitchNavItemsActive(1);
    }
    if(top>=800*2-80){
        playScreenAnimateDone('.screen-3');
        SwitchNavItemsActive(2);
    }
    if(top>=800*3-80){
        playScreenAnimateDone('.screen-4');
        SwitchNavItemsActive(3);
    }
    if(top>=800*4-80){
        playScreenAnimateDone('.screen-5');
        SwitchNavItemsActive(4);
    }

}

//第三步，双向定位

var setNavJump=function (i,lib) {
    var item=lib[i];
    item.onclick=function () {
        document.body.scrollTop=i*800;
    }
}

for (var i = 0; i < navItems.length; i++) {
    setNavJump(i,navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i,outLineItems);
}

// 第四步滑动门效果
// 2.获取这个元素
var navTip=getElem('.header_nav-tip');
// 1.设置导航条，单鼠标移动肾上去的时候有一个动态功能(获取元素的位置)
var setTip=function (idx,lib) {
    lib[idx].onmouseover=function () {
        //console.log(this,idx);
        navTip.style.left = (idx*70)+'px';
    }


    lib[idx].onmouseout=function () {
        var activeIdx=0;
        console.log(this,idx);
        for (var i = 0; i < lib.length; i++) {
            if(getCls(lib[i]).indexOf('header_nav-item_status_active')>-1){ //lib[i]检测所有的位置
                activeIdx=i;
                continue;
            }
        }
        navTip.style.left = (activeIdx * 70) +'px';
    }
}


setTimeout(function () {
    playScreenAnimateDone('.screen-1');
}, 200);