/**
 * Created by yzl on 2016/5/18.
 */
var $$ = Dom7;
var f7 = new Framework7({
    // Default title for modals
    modalTitle: 'Thorgene',
    // page切换时有动画效果
    // animatePages: false,
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    // Hide and show indicator during ajax requests
    init: false,
    onAjaxStart: function() {
        f7.showIndicator();
    },
    onAjaxComplete: function() {
        f7.hideIndicator();
    }
});
f7.addView('.view-main', {
    dynamicNavbar: true
});

ThorgeneGlobal = {
    // apiPrefix: 'http://192.168.1.28:3001/thorgene-mweb-ios',
    apiPrefix: 'http://test.thorgene.com/thorgene-mweb-api',
    today: function() {
        var date = new Date();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    compareDate: function() {
        var today = ThorgeneGlobal.today();
        var inputDate = $$('#birth').prop("value");
        return (new Date(today) < new Date(inputDate)) ? 1 : 0;
    },
    checkDate: function() {
        if (ThorgeneGlobal.compareDate()) {
            f7.alert("生日日期不能超过当前日期", '');
            $$('#birth').prop("value", ThorgeneGlobal.today());
        }
    }
};

// $$.ajax({
//     url: ThorgeneGlobal.apiPrefix + '/cur-user',
//     method: "GET",
//     dataType: "json",
//     success: function(data) {
//         $$('#name').attr("value", data.nickName);
//         $$('#headimg').attr("src", data.headImg);
//         var gender = data.gender;
//         //  default gender is 0, represent male
//         if (gender === 1) {
//             $$('#gender').prop("checked", true);
//             $$('#gender-label').html("女");
//         }
//     },
//     error: function() {
//         //  Todo
//     }
// });

f7.onPageInit('init-profile', function() {
    var nickName = Cookies.get('nickname');
    if (nickName) {
        $$('#name').prop("value", Base64.decode(nickName));
    }
    var headImgUrl = Cookies.get('headimgurl');
    $$('#headimg').attr("src", headImgUrl ? headImgUrl : 'http://thorgene-mweb.oss-cn-beijing.aliyuncs.com' +
    '/static/defaultheadimg.jpg');
    var gender = Cookies.get('sex');
//  default gender is 0, represent male
    if (gender === 2) {
        $$('#gender').prop("checked", true);
        $$('#gender-label').html("女");
    }

    $$('#gender').change(function() {
        if ($$('#gender').prop("checked")) {
            $$('#gender-label').html("女");
        } else {
            $$('#gender-label').html("男");
        }
    });

    function validateDate() {
        return $$('#birth').val().length === 0 ? 0 : 1;
    }

    function validateNickName() {
        var name = $$('#name').val();
        return name !== '' && name !== null && name !== undefined;
    }
    $$('#save').on('click', function() {
        if (!validateDate()) {
            f7.alert("生日不能为空", '');
        } else if (!validateNickName()) {
            f7.alert('昵称不能为空', '');
        } else if (!ThorgeneGlobal.compareDate()) {
            f7.showPreloader("保存中");
            var formData = {
                nickName: $$('#name').val() || '',
                birthday: $$('#birth').val() || '',
                gender: $$('#gender').prop("checked") ? 1 : 0,
                headImg: $$('#headimg').attr("src") || ''
            };
            $$.ajax({
                url: ThorgeneGlobal.apiPrefix + '/users',
                method: "POST",
                data: formData,
                success: function() {
                    Cookies.remove('nickname');
                    if (Cookies.get('headimgurl')) {
                        Cookies.remove('headimgurl');
                    }
                    Cookies.remove('sex');
                    window.location.replace("app-home.html");
                },
                error: function() {
                    //  Todo
                }
            });
        }
    });
});

f7.init();