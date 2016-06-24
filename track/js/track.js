// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Open photo browser on click
$$('.pb-standalone.one').on('click', function() {
    /* === Default standalone === */
    var myPhotoBrowserStandalone = myApp.photoBrowser({
        photos: [
            'resource/0001.jpg',
            'resource/0002.jpg',
            'resource/0003.jpg'
        ]
    });
    var index;
    var imgname = $$(this).children().attr('src');
    var imgnameAll = $$(this).parent().parent().children();
    for (var i = 0; i < imgnameAll.length; i++) {
        if ($$(imgnameAll[i]).children().children().attr('src') === imgname) {
            index = i;
        }
    }
    myPhotoBrowserStandalone.open(index);
});

// Open photo browser on click
$$('.pb-standalone.two').on('click', function() {
    /* === Default standalone === */
    var myPhotoBrowserStandalone = myApp.photoBrowser({
        photos: [
            'resource/0004.jpg',
            'resource/0005.jpg',
            'resource/0006.jpg'
        ]
    });
    var index;
    var imgname = $$(this).children().attr('src');
    var imgnameAll = $$(this).parent().parent().children();
    for (var i = 0; i < imgnameAll.length; i++) {
        if ($$(imgnameAll[i]).children().children().attr('src') === imgname) {
            index = i;
            break;
        }
    }
    myPhotoBrowserStandalone.open(index);
});

// window.onload=function(){
//     var text=document.getElementsByTagName("p");
//     for (var i=0;i<text.length;i++){
//         str=text[i].innerHTML;
//         if(str.length>8){
//             strshow=str.substr(0,7)+"...";
//             text[i].innerHTML=strshow;
//         }
//     }
// };

// function pass(confont){
//     var message=confont.getAttribute("value");
//     $$(".navbar-inner .center")[0].innerHTML=message;
//     var all_class=document.getElementsByName("change");
//     // document.write(all_class[0]);
//     for(var i=0;i<all_class.length;i++){
//         all_class[i].setAttribute("class","checkitem_change");
//     }
//     // var pre_class=i.parentNode.getAttribute("class");
//     confont.parentNode.setAttribute("class","checkitem_changeafter");
// }