//定义一个对象用来存储需要发生动画的元素
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
function SetScreenAnimate (screencls) {
    var screen=document.querySelector(screencls);//获取屏幕
    var screenElements=screenAnimateElements[screencls];
    var isSetAnimateClass=false;
    var isSetAnimateDone=false;

    //给每一个需要添加动画的class 添加上_animate_init
    screen.onclick=function(){
        if(isSetAnimateClass===false){
            for (var i = 0; i < screenElements.length; i++) {
                var element=document.querySelector(screenElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class', baseCls+' '+screenElements[i].substring(1)+'_animate_init');
            }
            isSetAnimateClass=true;
            return;
        }

        if(isSetAnimateDone===false){
            for (var i = 0; i < screenElements.length; i++) {
                var element=document.querySelector(screenElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
            }
            isSetAnimateDone=true;
            return;
        }

        if(isSetAnimateDone===true){
            for (var i = 0; i < screenElements.length; i++) {
                var element=document.querySelector(screenElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class', baseCls.replace('_animate_done','_animate_init'));
            }
            isSetAnimateDone=false;
            return;
        }

    }

    //


}

for(k in screenAnimateElements){
    SetScreenAnimate(k);
}