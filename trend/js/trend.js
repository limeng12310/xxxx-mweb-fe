
ThorgeneGlobal.trendPage = {
    iconfontcode: [],
    classifyId: [],
    emptyInfo: "暂无数据",
    invalidate: true,
    init: function() {
        if (ThorgeneGlobal.trendPage.invalidate) {
            ThorgeneGlobal.trendPage.invalidate = false;
            ThorgeneGlobal.trendPage.getUserClassifies();
        }
    },
    pass: function(confont) {
        var message = confont.getAttribute("value").split(' ');
        $$('.view-trend').find(".navbar-inner .center")[0].innerHTML = message[0];
        $$('.view-trend').find(".unit")[0].innerHTML = message[1];
        var allClass = document.getElementsByName("change");
        for (var i = 0; i < allClass.length; i++) {
            allClass[i].setAttribute("class", "checkitem_change");
        }
        confont.parentNode.setAttribute("class", "checkitem_changeafter");
    },
    getUserClassifies: function() {
        ThorgeneGlobal.trendPage.iconfontcode = [];
        ThorgeneGlobal.trendPage.classifyId = [];
        $$.ajax(
            {method: 'GET',
                url: ThorgeneGlobal.apiPrefix + "/user-inspect-classifies",
                dataType: 'json',
                success: function(json, status) {
                    var data = json.data;
                    if (status === 200 && json.retCode === 0) {
                        /*  myApp.templates.userInspectTpl({
                            id : data.id,
                            title : data.title
                        });*/
                        var string = '';
                        var tabs = '';
                        for (var i = 0; i < data.length; i++) {
                            if (i === 0) {
                                string += '<a href="#tab' + (i + 1) + '" class="button tab-link active">';
                                string += data[i].name + '</a>';
                                tabs += '<div id="tab' + (i + 1) + '" class="tab active"></div>';
                            } else {
                                string += '<a href="#tab' + (i + 1) + '" class="button tab-link">';
                                string += data[i].name + '</a>';
                                tabs += '<div id="tab' + (i + 1) + '" class="tab"></div>';
                            }
                            ThorgeneGlobal.trendPage.iconfontcode.push(data[i].iconFontCode);
                            ThorgeneGlobal.trendPage.classifyId.push(data[i].id);
                        }
                        $$('.view-trend').find(".buttons-row").html(string);
                        $$('.view-trend').find(".items").html(tabs);
                        $$('.view-trend').find(".button").on('click', function() {
                            var href = $$(this).attr('href');
                            var n = href.substring(4, href.length);
                            ThorgeneGlobal.trendPage.getItems(n);
                        });
                        // 初始化
                        var trendPgCont = $$('.page[data-page=trendPage] .page-content');
                        if (data.length > 0) {
                            trendPgCont.find(".empty").hide();
                            ThorgeneGlobal.trendPage.getItems(1);
                        } else {
                            trendPgCont.prepend("<div class='empty'>" + ThorgeneGlobal.trendPage.emptyInfo +
                                "</div>");
                        }
                    } else {
                        // TODO
                    }
                },
                error: function() {
                    // TODO
                }
            }
        );
    },
    getValues: function(i) {
        var mychart = echarts.init($$('.view-trend').find("#chart")[0]);
        $$.ajax(
            {method: 'GET',
            url: ThorgeneGlobal.apiPrefix + "/user-check-items/" + i,
            dataType: 'json',
            success: function(json, status) {
                var data = json.data;
                if (status === 200 && json.retCode === 0) {
                    var option = {
                        // backgroundColor: "#fff",
                        grid: {
                            right: '5%',
                            bottom: '10%',
                            height: '80%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b0}  {c0}',
                            backgroundColor: '#ff7f00',
                            position: function(point) {
                                if (point[0] < 100) {
                                    return [point[0], '5%'];
                                }
                                return [point[0] - 80, '5%'];
                            }
                        },
                        xAxis: {
                            type: 'category',
                            axisLine: {
                                lineStyle: {color: '#3eb2e1'}
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: data.map(function(item) {
                                return item.checkTime.substring(5, 10);
                            })
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {color: '#3eb2e1'}
                            },
                            axisLabel: {
                                formatter: '{value}'
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        series: [
                            {
                                type: 'line',
                                lineStyle: {
                                    normal: {color: '#3eb2e1'}
                                },
                                itemStyle: {
                                    normal: {color: '#3eb2e1'}
                                },
                                showAllSymbol: true,
                                connectNulls: true,
                                data: data.map(function(item) {
                                    return item.value;
                                })
                            }
                        ]
                    };
                    mychart.setOption(option);
                } else {
                    // TODO
                }
            },
            error: function() {
                // TODO
            }
        });
    },
    getItems: function(n) {
        $$.ajax(
            {method: 'GET',
            url: ThorgeneGlobal.apiPrefix + "/user-inspect-classifies/" + ThorgeneGlobal.trendPage.classifyId[n - 1] +
                "/check-items",
            dataType: 'json',
            success: function(json) {
                var data = json.data;
                var items = '<div class="checkitems">';
                var width = data.length * 90 + "px";
                var i;
                for (i = 0; i < data.length; i++) {
                    items += '<div class="checkitem" id="checkitemId-' + data[i].id + '"><div class="checkitem_h">';
                    items += '<div class="checkitem_change" name="change"><i class="iconfont" value="' + data[i].name;
                    items += ' ' + data[i].unit + '">' + ThorgeneGlobal.trendPage.iconfontcode[n - 1] + '</i></div>';
                    items += '</div><div class="word"><p>' + data[i].name + ' ' + data[i].unit + '</p></div></div>';
                }
                items += '</div>';
                $$('.view-trend').find('#tab' + n).html(items);
                $$('.items').find(".active").find(".checkitems").css("width", width);
                $$('.view-trend').find('.checkitem').on('click', function() {
                    i = $$(this).find('i')[0];
                    ThorgeneGlobal.trendPage.pass(i);
                    var id = this.id.substring(12, this.id.length);
                    ThorgeneGlobal.trendPage.getValues(id);
                    $$('.view-trend').find('.word').css('color', '#aaa');
                    $$(this).find('.word').css('color', '#3eb2e1');
                });
                // 初始化
                if (data.length > 0) {
                    var initItem = $$('.view-trend').find('.tab .active > .checkitems > .checkitem')[0];
                    i = $$(initItem).find('i')[0];
                    ThorgeneGlobal.trendPage.pass(i);
                    var id = initItem.id.substring(12, initItem.id.length);
                    ThorgeneGlobal.trendPage.getValues(id);
                    $$('.view-trend').find('.word').css('color', '#aaa');
                    $$(initItem).find('.word').css('color', '#3eb2e1');
                }
            },
            error: function() {
                // TODO
            }
        });
    }
};
// f7.onPageInit('trendPage', function(page) {
//     var text = $$(page.container).find('p');
//     // var text = document.getElementsByTagName("p");
//     for (var i = 0; i < text.length; i++) {
//         var str = text[i].innerHTML;
//         if (str.length > 8) {
//             var strshow = str.substr(0, 7) + "...";
//             text[i].innerHTML = strshow;
//         }
//     }
//     ThorgeneGlobal.trendPage.getUserClassifies();
//     // ThorgeneGlobal.trendPage.getItems(0);
// });

f7.init();
