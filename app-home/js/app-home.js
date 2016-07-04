/* eslint-disable */
var $$ = Dom7;
/* eslint-enable */

var f7 = new Framework7({
    // Default title for modals
    modalTitle: 'Thorgene',

    modalButtonOk: '确定',

    modalButtonCancel: '取消',

    // page切换时有动画效果
    animatePages: Framework7.prototype.device.ios,

    animateNavBackIcon: true,

    // If it is webapp, we can enable hash navigation:
    pushState: true,

    init: false,

    // 自动编译template7
    precompileTemplates: true,

    // Hide and show indicator during ajax requests
    onAjaxStart: function() {
        f7.showIndicator();
    },
    onAjaxComplete: function() {
        f7.hideIndicator();
    },
    preprocess: function(content, url, next) {
        if (url === 'manual-add.html') {
            var apiUrl = ThorgeneGlobal.apiPrefix + '/collect-items';

            var data = ThorgeneGlobal.cacheGet(apiUrl);
            if (data !== undefined) {
                return Template7.compile(content)({
                    collectItems: data
                });
            }

            $$.ajax({
                method: 'GET',
                url: apiUrl,
                dataType: 'json',
                success: function(data, status) {
                    if (status === 200) {
                        ThorgeneGlobal.cacheSet(apiUrl, data);

                        next(Template7.compile(content)({
                            collectItems: data
                        }));
                    } else {
                        // TODO
                    }
                },
                error: function() {
                    // TODO
                }
            });
        } else {
            return content;
        }
    }

});

// var mainView
f7.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

f7.recordView = f7.addView('.view-record', {
    dynamicNavbar: true,
    domCache: true
});

ThorgeneGlobal = {
    supportLocalStorage: (function() {
        if (localStorage) {
            try {
                localStorage.setItem('testkey', 'value');
                localStorage.removeItem('testkey');
            } catch (e) {
                return false;
            }
            return true;
        }

        return false;
    })(),
    memCache: {},
    cacheDuration: 10 * 60 * 1000,
    apiPrefix: 'http://test.thorgene.com/thorgene-mweb-api',
    aliOssPrefix: 'http://thorgene-mweb.img-cn-beijing.aliyuncs.com',
    aliOssSuffix: '@!thumbnail',
    reportsLimit: 5,
    week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    cacheGet: function(key) {
        var cache;
        if (ThorgeneGlobal.supportLocalStorage) {
            cache = localStorage.getItem(key);
            if (cache) {
                cache = JSON.parse(cache);
                if ((new Date() - 0) < cache.ttl) {
                    return cache.content;
                }

                localStorage.removeItem(key);
            }
        } else {
            cache = ThorgeneGlobal.memCache[key];
            if (cache && (new Date() - 0) < cache.ttl) {
                return cache.content;
            } else if (cache) {
                ThorgeneGlobal.memCache[key] = undefined;
            }
        }
    },
    cacheSet: function(key, content, duration) {
        var val = {
            content: content,
            ttl: (new Date() - 0) + (duration ? duration : ThorgeneGlobal.cacheDuration)
        };

        if (ThorgeneGlobal.supportLocalStorage) {
            // 清理过期
            var i;
            var cache;
            var delKey;
            for (i = 0; i < localStorage.length; ++i) {
                delKey = localStorage.key(i);
                cache = JSON.parse(localStorage.getItem(delKey));
                if ((new Date() - 0) >= cache.ttl) {
                    localStorage.removeItem(delKey);
                    break;
                }
            }

            try {
                localStorage.setItem(key, JSON.stringify(val));
            } catch (e) {
                // do nothing
            }
        } else {
            ThorgeneGlobal.memCache[key] = val;
        }
    },
    cacheDelete: function(key) {
        if (ThorgeneGlobal.supportLocalStorage) {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
        } else {
            ThorgeneGlobal.memCache[key] = undefined;
        }
    },
    today: function() {
        var date = new Date();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    localIds: [],
    serverIds: [],
    previewImg: function() {
        wx.previewImage({
            current: this.tempUrl,
            urls: ThorgeneGlobal.localIds
        });
    },
    uploadImg: function(localIds) {
        if (ThorgeneGlobal.localIds.length > 0) {
            var localId = localIds.pop();
            if (localId.indexOf('wxlocalresource') !== -1) {
                localId = localId.replace("wxlocalresource", "wxLocalResource");
            }
            wx.uploadImage({
                localId: localId,
                isShowProgressTips: 0,
                success: function(res) {
                    ThorgeneGlobal.serverIds.push(res.serverId);
                    ThorgeneGlobal.uploadImg(ThorgeneGlobal.localIds);
                },
                error: function() {
                    // TODO
                }
            });
        } else {
            ThorgeneGlobal.submitReport();
        }
    },
    submitReport: function() {
        $$.ajax({
            url: ThorgeneGlobal.apiPrefix + '/reports',
            method: 'POST',
            data: {
                // checkSite: $$('#check-site').prop('value'),
                checkTime: $$('#check-date').prop('value'),
                reportType: '图片',
                reportValues: ThorgeneGlobal.serverIds
            },
            success: function() {
                f7.hidePreloader();
                ThorgeneGlobal.serverIds = [];
                ThorgeneGlobal.localIds = [];
                f7.mainView.router.back();
                // TODO
            },
            error: function() {
                // TODO
            }
        });
    },
    deleteReport: function(ele) {
        var reportId = $$(ele).parents().prev().attr('report-id');

        var contentToDel = $$(ele).parents('div.list-block');
        var titleToDel = contentToDel.prev();
        f7.confirm('确定删除该报告?', '', function() {
            f7.showPreloader('删除中...');
            $$.ajax({
                url: ThorgeneGlobal.apiPrefix + '/reports/' + reportId,
                method: 'DELETE',
                success: function(data, status) {
                    f7.hidePreloader();
                    if (status === 200) {
                        f7.swipeoutDelete($$(ele).parents('li.swipeout'));
                        contentToDel.remove();
                        titleToDel.remove();

                        var reportContainer = $$('.page[data-page=home-page] .detail');
                        reportContainer.data('report-cnt', parseInt(reportContainer.data('report-cnt')) - 1);

                        ThorgeneGlobal.trendPage.invalidate = true;

                        if(reportContainer.data('report-cnt') === 0){
                            ThorgeneGlobal.homePage.refreshHomeCbk();
                        }else{
                            $$.ajax({
                                url: ThorgeneGlobal.apiPrefix + '/report-aggregation',
                                method: 'GET',
                                dataType: 'json',
                                success: function (data, status) {
                                    if (status === 200) {
                                        ThorgeneGlobal.homePage.refreHmHead($$('.page[data-page=home-page]'), data);
                                    }
                                },
                                error: function () {
                                    // TODO
                                }
                            });
                       }


                    } else {
                        // TODO
                    }
                },
                error: function() {
                    f7.hidePreloader();
                    // TODO
                }
            });
        });

    },
    initCheckitemList: function(data) {
        f7.virtualList('.page[data-page=checkitem-list] .list-block.virtual-list', {
            dynamicHeightBufferSize: 5,
            items: (function() {
                var listItems = [];
                var i;
                for (i = 0; i < data.length; ++i) {
                    listItems.push({
                        title: data[i].headLetter
                    });
                    var j;
                    for (j = 0; j < data[i].items.length; ++j) {
                        var collected = parseInt(data[i].items[j].isCollected) === 1;
                        listItems.push({
                            id: data[i].items[j].id,
                            name: data[i].items[j].name,
                            iconFontCode: data[i].items[j].iconFontCode,
                            isCollected: collected ? '1' : '0',
                            starColor: collected ? '#FFD700' : '#919191'
                        });
                    }
                }
                return listItems;
            })(),
            renderItem: function(index, item) {
                if (item.title) {
                    return '<li class="item-divider">' + item.title + '</li>';
                }
                return Template7.templates.checkitemListTpl(item);
            },
            height: function(item) {
                if (item.title) {
                    return 31;
                }
                return 44;
            }
        });
    },
    showReportDetail: function(ele, status) {
        if (status === '处理中') {
            f7.alert('该报告还在处理中,请稍后', '');
            return;
        }
        f7.showIndicator();
        $$.ajax({
            method: 'GET',
            url: ThorgeneGlobal.apiPrefix + '/reports/' + $$(ele).attr('report-id'),
            dataType: 'json',
            success: function(data, status) {
                if (status === 200) {
                    f7.hideIndicator();
                    f7.mainView.router.load({
                        content: Template7.templates.reportDetailTpl({
                            reportDetails: data
                        })
                    });

                    var filterButtons = $$('.subnavbar > .buttons-row').children();
                    for (var i = 0; i < filterButtons.length; ++i) {
                        $$(filterButtons[i]).on('click', function() {
                            if ($$(this).hasClass('active')) {
                                return;
                            }

                            var j;
                            for (j = 0; j < filterButtons.length; ++j) {
                                if ($$(filterButtons[j]).hasClass('active')) {
                                    $$(filterButtons[j]).removeClass('active');
                                    break;
                                }
                            }
                            $$(this).addClass('active');

                            var filter = $$(this).attr('filter');
                            var itemValues = $$('.list-block.accordion-list');
                            for (j = 0; j < itemValues.length; ++j) {
                                if (!filter || $$(itemValues[j]).attr('state-level') === filter) {
                                    $$(itemValues[j]).show();
                                } else {
                                    $$(itemValues[j]).hide();
                                }
                            }
                        });
                    }
                } else {
                    // TODO
                }
            },
            error: function() {
                f7.hideIndicator();

                // TODO
            }
        });
    },
    slideOnChange: function(ele) {
        var val = $$(ele).val();
        $$('.picker-modal').find('input[type=number]').val(val);
    },
    popupPicker: function(ele) {
        if ($$('.picker-modal').length > 0) {
            f7.closeModal('.picker-modal');
        } else {
            var item = $$(ele);
            var id;
            var iconFont;
            var curVal;
            var apiUrl;
            var data;
            if (item.hasClass('collect-checkitem')) {
                id = item.attr('item-id');
                iconFont = item.children('i').html();
                curVal = item.children('p.value').html();
                apiUrl = ThorgeneGlobal.apiPrefix + '/check-items/' + id;

                data = ThorgeneGlobal.cacheGet(apiUrl);
                if (data !== undefined) {
                    f7.pickerModal(Template7.templates.modalPickerTpl({
                        id: id,
                        name: data.name,
                        dataType: data.dataType,
                        iconFontCode: iconFont,
                        unit: data.unit,
                        low: data.low,
                        high: data.high,
                        default: curVal === '---' ? data.default : curVal,
                        accuracy: data.accuracy
                    }));
                    $$('.picker-modal').find('input[type=checkbox]').change(function() {
                        if ($$(this)[0].checked) {
                            $$(this).parents('.item-input').prev().html('阳性');
                        } else {
                            $$(this).parents('.item-input').prev().html('阴性');
                        }
                    });
                } else {
                    $$.ajax({
                        method: 'GET',
                        url: apiUrl,
                        dataType: 'json',
                        success: function(data, status) {
                            ThorgeneGlobal.cacheSet(apiUrl, data);
                            if (status === 200) {
                                f7.pickerModal(Template7.templates.modalPickerTpl({
                                    id: id,
                                    name: data.name,
                                    dataType: data.dataType,
                                    iconFontCode: iconFont,
                                    unit: data.unit,
                                    low: data.low,
                                    high: data.high,
                                    default: curVal === '---' ? data.default : curVal,
                                    accuracy: data.accuracy
                                }));
                                $$('.picker-modal').find('input[type=checkbox]').change(function() {
                                    if ($$(this)[0].checked) {
                                        $$(this).parents('.item-input').prev().html('阳性');
                                    } else {
                                        $$(this).parents('.item-input').prev().html('阴性');
                                    }
                                });
                            } else {
                                // TODO
                            }
                        },
                        error: function() {
                            // TODO
                        }
                    });
                }
            } else if (item.hasClass('check-item')) {
                id = item.find('.item-title').attr('item-id');
                iconFont = item.find('i').html();

                var collectItems = $$('.page[data-page=manual-add]').find('.collect-checkitems').children();
                var itemInManualAdd;
                var i;
                for (i = 0; i < collectItems.length; ++i) {
                    if ($$(collectItems[i]).attr('item-id') === id) {
                        itemInManualAdd = $$(collectItems[i]);
                        break;
                    }
                }

                curVal = '---';
                if (itemInManualAdd) {
                    curVal = itemInManualAdd.children('p.value').html();
                }

                apiUrl = ThorgeneGlobal.apiPrefix + '/check-items/' + id;
                data = ThorgeneGlobal.cacheGet(apiUrl);
                if (data !== undefined) {
                    f7.pickerModal(Template7.templates.modalPickerTpl({
                        id: id,
                        name: data.name,
                        dataType: data.dataType,
                        iconFontCode: iconFont,
                        unit: data.unit,
                        low: data.low,
                        high: data.high,
                        default: curVal === '---' ? data.default : curVal,
                        accuracy: data.accuracy
                    }));
                    $$('.picker-modal').find('input[type=checkbox]').change(function() {
                        if ($$(this)[0].checked) {
                            $$(this).parents('.item-input').prev().html('阳性');
                        } else {
                            $$(this).parents('.item-input').prev().html('阴性');
                        }
                    });
                } else {
                    $$.ajax({
                        method: 'GET',
                        url: apiUrl,
                        dataType: 'json',
                        success: function(data, status) {
                            ThorgeneGlobal.cacheSet(apiUrl, data);
                            if (status === 200) {
                                f7.pickerModal(Template7.templates.modalPickerTpl({
                                    id: id,
                                    name: data.name,
                                    dataType: data.dataType,
                                    iconFontCode: iconFont,
                                    unit: data.unit,
                                    low: data.low,
                                    high: data.high,
                                    default: curVal === '---' ? data.default : curVal,
                                    accuracy: data.accuracy
                                }));
                                $$('.picker-modal').find('input[type=checkbox]').change(function() {
                                    if ($$(this)[0].checked) {
                                        $$(this).parents('.item-input').prev().html('阳性');
                                    } else {
                                        $$(this).parents('.item-input').prev().html('阴性');
                                    }
                                });
                            } else {
                                // TODO
                            }
                        },
                        error: function() {
                            // TODO
                        }
                    });
                }
            }
        }
    },
    appendOneItem: function(checkitem) {
        $$('.page[data-page=manual-add] .collect-checkitems').append(Template7.templates.itemToAddTpl({
            id: checkitem.id,
            iconFontCode: checkitem.iconFontCode,
            name: checkitem.name,
            value: checkitem.value
        }));

        $$('.page[data-page=manual-add] .collect-checkitems')
            .append($$('.page[data-page=manual-add] .collect-checkitems > a'));
    },
    manualAddOneDone: function(ele) {
        var dataType = $$(ele).attr('data-type');
        var val;
        if (dataType === '数值') {
            val = $$('.picker-modal').find('input[type=number]').val();
            if (isNaN(Number(val))) {
                f7.alert('输入必须为数字', '');
                return;
            }
            if (val === '') {
                val = '---';
            }
        } else {
            val = $$('.picker-modal').find('.item-title.label').html();
        }

        var itemId = $$(ele).attr('item-id');

        var item = $$('.page[data-page=manual-add]').find('.collect-checkitem[item-id=\'' + itemId + '\']');
        if (item.length === 0) {
            ThorgeneGlobal.appendOneItem({
                id: itemId,
                iconFontCode: $$(ele).attr('item-iconfont'),
                name: $$(ele).attr('item-name'),
                value: val
            });
        } else {
            item.children('p.value').html(val);
        }
    },
    toggleCollect: function(ele) {
        var itemId = $$(ele).parent().next().children().attr('item-id');
        var itemTmp = $$(ele).parents('[data-collected]');
        var isCollected = itemTmp.data('collected') === '1';
        $$(ele).removeAttr('onclick');
        ThorgeneGlobal.cacheDelete(ThorgeneGlobal.apiPrefix + '/check-items?type_ne=日常');
        ThorgeneGlobal.cacheDelete(ThorgeneGlobal.apiPrefix + '/collect-items');

        if (isCollected) {
            $$.ajax({
                url: ThorgeneGlobal.apiPrefix + '/collect-items/' + itemId,
                method: 'DELETE',
                success: function(data, status) {
                    if (status === 200) {
                        $$(ele).css('color', '#919191');
                        itemTmp.data('collected', '0');

                        // TODO $$('.page[data-page=manual-add]').find('[item-id=\'' + itemId + '\']').remove();
                    } else {
                        // TODO
                    }
                    $$(ele).attr('onclick', 'ThorgeneGlobal.toggleCollect(this)');
                },
                error: function() {
                    // TODO
                    $$(ele).attr('onclick', 'ThorgeneGlobal.toggleCollect(this)');
                }
            });
        } else {
            $$.ajax({
                url: ThorgeneGlobal.apiPrefix + '/collect-items',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: itemId
                }),
                success: function(data, status) {
                    if (status === 200) {
                        $$(ele).css('color', '#FFD700');
                        itemTmp.data('collected', '1');

                        var item = $$('.page[data-page=manual-add]').find('[item-id=\'' + itemId + '\']');
                        if (item.length === 0) {
                            var itemTitle = $$(ele).parent().next().children('.item-title');
                            ThorgeneGlobal.appendOneItem({
                                id: itemId,
                                iconFontCode: itemTitle.children('i').html(),
                                name: itemTitle.children('.item-name').html(),
                                value: '---'
                            });
                        }
                    } else {
                        // TODO
                    }
                    $$(ele).attr('onclick', 'ThorgeneGlobal.toggleCollect(this)');
                },
                error: function() {
                    // TODO
                    $$(ele).attr('onclick', 'ThorgeneGlobal.toggleCollect(this)');
                }
            });
        }
    },
    homePage: {
        reportsAOToVO: function(reports) {
            var results = [];
            reports.forEach(function(report) {
                var checkTime = Framework7.prototype.device.ios ?
                  report.checkTime.split('-').join('/') : report.checkTime;
                var date = new Date(checkTime);
                results.push({
                    id: report.id,
                    type: report.type,
                    status: report.status === '返回用户' ? '返回用户' : '处理中',
                    time: checkTime,
                    reportDate: ThorgeneGlobal.week[date.getDay()] + ',' + dateFormat(date, 'mm') + '月' +
                    dateFormat(date, 'dd') + '日',
                    reportTime: dateFormat(date, 'HH') + ':' + dateFormat(date, 'MM'),
                    normal: isNaN(parseInt(report.normal)) ? '-' : report.normal,
                    warning: isNaN(parseInt(report.warning)) ? '-' : report.warning,
                    danger: isNaN(parseInt(report.danger)) ? '-' : report.danger
                });
            });

            return {
                reports: results
            };
        },
        refreHmHead:function(pageContainer, aggregation){
                var score = aggregation.score;
                if (score) {
                    pageContainer.find('.score-border > .score').html(score);
                }
                var statisticValues = pageContainer
                    .find('.statistic-value-wrapper > .statistic-value');
                var normal = aggregation.normal;
                if (normal !== undefined) {
                    $$(statisticValues[0]).html(normal);
                }
                var warning = aggregation.warning;
                if (warning !== undefined) {
                    $$(statisticValues[1]).html(warning);
                }
                var danger = aggregation.worst;
                if (danger !== undefined) {
                    $$(statisticValues[2]).html(danger);
                }
        } ,
        refreshHome: function(pageContainer, aggregation, reports) {

            ThorgeneGlobal.homePage.refreHmHead(pageContainer,aggregation);

            pageContainer.find('.detail').children().remove();
            pageContainer.find('.detail').append(Template7.templates.reportsTpl(
              ThorgeneGlobal.homePage.reportsAOToVO(reports)
            ));
            pageContainer.find('.detail').data('report-cnt', reports.length);
            f7.attachInfiniteScroll(pageContainer.find('.infinite-scroll'));
        },
        refreshHomeCbk: function() {
            $$.ajax({
                method: 'GET',
                url: ThorgeneGlobal.apiPrefix + '/report-aggregation',
                dataType: 'json',
                success: function(data, status) {
                    if (status === 200) {
                        var aggregation = data;

                        $$.ajax({
                            method: 'GET',
                            url: ThorgeneGlobal.apiPrefix + '/reports?_limit=' +
                            ThorgeneGlobal.reportsLimit,
                            dataType: 'json',
                            success: function(data, status) {
                                if (status === 200) {
                                    ThorgeneGlobal.homePage.refreshHome($$('.page[data-page=home-page]'),
                                      aggregation, data);
                                } else {
                                    // TODO
                                }
                                f7.pullToRefreshDone();
                            },
                            error: function() {
                                f7.pullToRefreshDone();
                                // TODO
                            }
                        });
                    } else {
                        // TODO
                    }
                },
                error: function() {
                    // TODO
                }
            });
        }
    },
    recordPage: {
        invalidate: true,
        recordsLimits: 5,
        emptyInfo:"暂无数据",
        thisUrl: '',
        imgUrls: {},
        tempUrls: [],
        init: function() {
            if (ThorgeneGlobal.recordPage.invalidate) {
                ThorgeneGlobal.recordPage.invalidate = false;
                var recordPage = $$('.page[data-page=record]');
                $$.ajax({
                    url: ThorgeneGlobal.apiPrefix + '/records?_limit=' + ThorgeneGlobal.recordPage.recordsLimits,
                    method: 'GET',
                    dataType: 'json',
                        success: function(data, status) {
                            if(data.length===0){
                                recordPage.find(".page-content").append("<div class='empty'>" + ThorgeneGlobal.recordPage.emptyInfo + " </div>")
                            }
                        if (status === 200) {
                            recordPage.find('.record-container').append(Template7.templates.recordItemTpl(
                              ThorgeneGlobal.recordPage.json2Report(data)));

                            recordPage.find('.record-container').data('record-cnt', data.length);

                            f7.initImagesLazyLoad(recordPage);
                            // 下拉刷新
                            recordPage.find('.pull-to-refresh-content').on('refresh', function() {
                                $$.ajax({
                                    url: ThorgeneGlobal.apiPrefix + '/records',
                                    method: 'GET',
                                    dataType: 'json',
                                    success: function(data) {
                                        ThorgeneGlobal.recordPage.imgUrls = {};
                                        var container = recordPage.find('.record-container');
                                        container.children().remove();
                                        container.append(Template7.templates.recordItemTpl(
                                          ThorgeneGlobal.recordPage.json2Report(data)));
                                        f7.initImagesLazyLoad(recordPage);
                                        recordPage.find('.record-container').data('record-cnt', data.length);
                                        f7.attachInfiniteScroll(recordPage.find('.infinite-scroll'));
                                        f7.pullToRefreshDone();
                                    },
                                    error: function() {
                                        // TODO
                                    }
                                });
                            });
                            // 上滑刷新
                            var loading = false;
                            recordPage.find('.infinite-scroll').on('infinite', function() {
                                if (loading) {
                                    return;
                                }
                                loading = true;
                                recordPage.children('.page-content').append(Template7.templates.preloaderTpl());
                                // var recordList = recordPage.find('.record-container').find('[record-id]');
                                // var lastId = $$(recordList[recordList.length - 1]).attr('record-id');
                                // if (!lastId) {
                                //     return;
                                // }
                                var offset = recordPage.find('.record-container').data('record-cnt');

                                $$.ajax({
                                    url: ThorgeneGlobal.apiPrefix + '/records?_offset=' + offset + '&_limit' +
                                    ThorgeneGlobal.recordPage.recordsLimits,
                                    method: 'GET',
                                    dataType: 'json',
                                    success: function(data) {
                                        loading = false;
                                        recordPage.find('.infinite-scroll-preloader').remove();
                                        if (data.length !== 0) {
                                            recordPage.find('.record-container').append(Template7.templates
                                              .recordItemTpl(ThorgeneGlobal.recordPage.json2Report(data)));

                                            recordPage.find('.record-container').data('record-cnt',
                                              parseInt(recordPage.find('.record-container').data('record-cnt')) +
                                                data.length);
                                        } else {
                                            f7.detachInfiniteScroll(recordPage.find('.infinite-scroll'));
                                        }
                                    },
                                    error: function() {
                                        loading = false;
                                        recordPage.find('.infinite-scroll-preloader').remove();
                                        // TODO
                                    }
                                });
                            });
                        } else {
                            // TODO
                        }
                    },
                    error: function() {
                        // TODO
                    }
                });
            }
        },
        json2Report: function(jsondata) {
            var recordJson = {};
            recordJson.records = [];
            jsondata.forEach(function(data) {
                var record = {};
                record.id = data.id;
                record.day = data.eventTime.split(' ')[0].split('-')[2];
                record.month = data.eventTime.split(' ')[0].split('-')[1];
                record.images = [];
                data.images.forEach(function(src) {
                    var img = {};
                    img.imgSrc = ThorgeneGlobal.aliOssPrefix + '/' + src + ThorgeneGlobal.aliOssSuffix;
                    img.imgId = data.id;
                    record.images.push(img);
                });
                ThorgeneGlobal.recordPage.imgUrls[data.id] = [];
                var i;
                for (i = 0; i < data.images.length; ++i) {
                    ThorgeneGlobal.recordPage.imgUrls[data.id].push(ThorgeneGlobal.aliOssPrefix + '/' + data.images[i]);
                }
                record.content = data.content;
                record.time = data.eventTime;
                recordJson.records.push(record);
            });
            return recordJson;
        },
        previewImg: function(img) {
            var id = img.id;
            ThorgeneGlobal.recordPage.tempUrls = ThorgeneGlobal.recordPage.imgUrls[id];
            ThorgeneGlobal.recordPage.thisUrl = img.src;
            wx.previewImage({
                current: ThorgeneGlobal.recordPage.thisUrl,
                urls: ThorgeneGlobal.recordPage.tempUrls
            });
        },
        delRecord: function(ele) {
            f7.confirm('确定删除该记录?', '', function() {
                f7.showPreloader('删除中...');
                var recordDiv = $$(ele).parents('.record-div[record-id]');
                $$.ajax({
                    url: ThorgeneGlobal.apiPrefix + '/records/' + recordDiv.attr('record-id'),
                    method: 'DELETE',
                    success: function(data, status) {
                        if (status === 200) {
                            recordDiv.remove();

                            var curCnt = recordDiv.parent('.record-container').data('record-cnt');
                            recordDiv.parent('.record-container').data('record-cnt', parseInt(curCnt) - 1);

                            ThorgeneGlobal.recordPage.imgUrls[recordDiv.attr('record-id')] = undefined;
                        } else {
                            // TODO
                        }
                        f7.hidePreloader();
                    },
                    error: function() {
                        // TODO
                        f7.hidePreloader();
                    }
                });
            });
        },
        addRecord: function() {
            f7.recordView.router.load({
                url: "add-record.html",
                pushState: true
            });
        }
    },
    addRecord: {
        today: function() {
            var date = new Date();
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + '-' + month + '-' + day;
        },
        time: function() {
            var date = new Date();
            return date.getHours() + ':' + date.getMinutes();
        },
        localIds: [],
        serverIds: [],
        previewImg: function() {
            wx.previewImage({
                current: this.tempUrl,
                urls: ThorgeneGlobal.addRecord.localIds
            });
        },

        uploadImg: function(localIds) {
            if (ThorgeneGlobal.addRecord.localIds.length > 0) {
                var localId = localIds.pop();
                if (localId.indexOf('wxlocalresource') !== -1) {
                    localId = localId.replace("wxlocalresource", "wxLocalResource");
                }
                wx.uploadImage({
                    localId: localId,
                    isShowProgressTips: 0,
                    success: function(res) {
                        ThorgeneGlobal.addRecord.serverIds.push(res.serverId);
                        ThorgeneGlobal.addRecord.uploadImg(ThorgeneGlobal.addRecord.localIds);
                    },
                    error: function() {
                        // TODO
                    }
                });
            } else {
                ThorgeneGlobal.addRecord.submitReport();
            }
        },

        submitReport: function() {
            var subTime = $$('#check-date').prop('value') + ' ' + $$('#check-time').prop('value') + ':00';
            $$.ajax({
                url: ThorgeneGlobal.apiPrefix + '/records',
                method: 'POST',
                data: {
                    eventTime: subTime,
                    content: $$('.view[data-page=add-record] .report-note').val(),
                    images: ThorgeneGlobal.addRecord.serverIds
                },
                success: function() {
                    f7.hidePreloader();
                    ThorgeneGlobal.addRecord.localIds = [];
                    ThorgeneGlobal.addRecord.serverIds = [];
                    f7.recordView.router.back();
                    f7.pullToRefreshTrigger($$('.view[data-page=record] .pull-to-refresh-content'));
                },
                error: function() {

                }
            });
        }
    },
    trendPage: {}
};

f7.onPageInit('home-page', function(page) {
    // init wx jsapi
    $$.ajax({
        url: ThorgeneGlobal.apiPrefix + '/test-signature',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareAppMessage',
                    'uploadImage',
                    'previewImage',
                    'chooseImage'
                ]
            });
        },
        error: function() {
            // TODO
        }
    });

    var homePage = $$(page.container);
    $$.ajax({
        method: 'GET',
        url: ThorgeneGlobal.apiPrefix + '/report-aggregation',
        dataType: 'json',
        success: function(data, status) {
            var aggregation = data;
            if (status === 200) {
                $$.ajax({
                    method: 'GET',
                    url: ThorgeneGlobal.apiPrefix + '/reports?_limit=' + ThorgeneGlobal.reportsLimit,
                    dataType: 'json',
                    success: function(data, status) {
                        if (status === 200) {
                            ThorgeneGlobal.homePage.refreshHome($$(page.container), aggregation, data);

                            // homepage下拉刷新
                            homePage.find('.pull-to-refresh-content').on('refresh',
                              ThorgeneGlobal.homePage.refreshHomeCbk);

                            // homepage上拉加载
                            f7.attachInfiniteScroll('.infinite-scroll');
                            var loading = false;
                            homePage.find('.infinite-scroll').on('infinite', function() {
                                if (loading) {
                                    return;
                                }
                                loading = true;

                                homePage.children('.page-content').append(Template7.templates.preloaderTpl());

                                var reportList = homePage.find('.detail').find('[report-id]');
                                var lastReport = $$(reportList[reportList.length - 1]);
                                if (!lastReport) {
                                    return;
                                }

                                $$.ajax({
                                    method: 'GET',
                                    url: ThorgeneGlobal.apiPrefix + '/reports?_offset=' + homePage.find('.detail')
                                        .data('report-cnt') + '&_limit=' + ThorgeneGlobal.reportsLimit,
                                    dataType: 'json',
                                    success: function(data, status) {
                                        loading = false;
                                        if (status === 200) {
                                            homePage.find('.infinite-scroll-preloader').remove();
                                            if (data.length !== 0) {
                                                var curCnt = homePage.find('.detail').data('report-cnt');
                                                homePage.find('.detail').data('report-cnt', parseInt(curCnt) +
                                                    data.length);
                                                homePage.find('.detail').append(Template7.templates
                                                  .reportsTpl(ThorgeneGlobal.homePage.reportsAOToVO(data)));
                                            } else {
                                                f7.detachInfiniteScroll(homePage.find('.infinite-scroll'));
                                            }
                                        } else {
                                            // TODO
                                        }
                                    },
                                    error: function() {
                                        loading = false;
                                        homePage.find('.infinite-scroll-preloader').remove();
                                        // TODO
                                    }
                                });
                            });
                        } else {
                            // TODO
                        }
                    },
                    error: function() {
                        // TODO
                    }
                });
            } else {
                // TODO
            }
        },
        error: function() {
            // TODO
        }
    });
});

f7.onPageInit('manual-add', function(page) {
    $$(page.container).find('input[type="datetime-local"]').val(dateFormat(new Date(), 'yyyy-mm-dd\'T\'HH:MM'));

    $$(page.navbarInnerContainer).find('.right a').on('click', function() {
        var items = $$(page.container).find('.collect-checkitem');

        var i;
        var reportValues = [];
        for (i = 0; i < items.length; ++i) {
            var result = $$(items[i]).children('p.value').html();
            if (result !== '---') {
                reportValues.push({
                    id: $$(items[i]).attr('item-id'),
                    result: result
                });
            }
        }
        if (reportValues.length === 0) {
            f7.alert('请至少选择一个项目进行取值', '');
            return;
        }

        var checkTime = $$(page.container).find('input[type="datetime-local"]').val();
        if (!checkTime) {
            f7.alert('时间不能为空');
            return;
        }

        f7.showPreloader('保存中...');
        $$.ajax({
            url: ThorgeneGlobal.apiPrefix + '/reports',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                checkTime: checkTime,
                reportType: '手动',
                reportValues: reportValues
            }),
            success: function(data, status) {
                f7.hidePreloader();
                if (status === 200) {
                    f7.mainView.router.back();
                    ThorgeneGlobal.homePage.refreshHomeCbk();
                    ThorgeneGlobal.trendPage.invalidate = true;
                } else {
                    // TODO
                }
            },
            error: function() {
                // TODO
                f7.hidePreloader();
            }
        });
    });
});

f7.onPageInit('photo-uploader', function(page) {
    // 默认为今天时间
    $$(page.container).find('#check-date').prop('value', ThorgeneGlobal.today());

    $$(page.container).find(".addImgButton").click(function() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                var tmpLocalIds = res.localIds;
                ThorgeneGlobal.localIds = ThorgeneGlobal.localIds.concat(tmpLocalIds);
                var images = $$('.imgs');
                var addImgButton = $$('.addImgButton');
                $$('#hidden').append(addImgButton);
                for (var i = 0; i < tmpLocalIds.length; i++) {
                    var img = document.createElement("img");
                    img.src = tmpLocalIds[i];
                    img.className = "part-img";
                    img.tempUrl = tmpLocalIds[i];
                    images.append(img);
                }
                images.append(addImgButton);
                $$('img').click(function() {
                    ThorgeneGlobal.previewImg();
                });
            },
            error: function() {
                // TODO
            }
        });
    });

    $$(page.navbarInnerContainer).find('#save').click(function() {
        if (ThorgeneGlobal.localIds.length === 0) {
            f7.alert('未添加检测报告图片');
        } else {
            f7.showPreloader('保存中...');
            ThorgeneGlobal.uploadImg(ThorgeneGlobal.localIds);
        }
    });

    $$(page.navbarInnerContainer).find('#cancel').click(function() {
        ThorgeneGlobal.serverIds = [];
        ThorgeneGlobal.localIds = [];
        f7.mainView.router.back();
    });
});

f7.onPageInit('checkitem-list', function() {
    var apiUrl = ThorgeneGlobal.apiPrefix + '/check-items?type_ne=日常项';
    var data = ThorgeneGlobal.cacheGet(apiUrl);

    if (data !== undefined) {
        ThorgeneGlobal.initCheckitemList(data);
    } else {
        $$.getJSON(apiUrl, function(data, status) {
            if (status === 200) {
                ThorgeneGlobal.cacheSet(apiUrl, data);
                ThorgeneGlobal.initCheckitemList(data);
            } else {
                // TODO
            }
        });
    }
});

f7.onPageInit('add-record', function(page) {
    var pageContainer = $$(page.container);

    // 默认为今天时间
    pageContainer.find('#check-date').prop('value', ThorgeneGlobal.addRecord.today());
    pageContainer.find('#check-time').prop('value', ThorgeneGlobal.addRecord.time());

    pageContainer.find(".addImgButton").click(function() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                var tmpLocalIds = res.localIds;
                ThorgeneGlobal.addRecord.localIds = ThorgeneGlobal.addRecord.localIds.concat(tmpLocalIds);
                var images = $$('.imgs');
                var addImgButton = $$('.addImgButton');
                $$('#hidden').append(addImgButton);
                for (var i = 0; i < tmpLocalIds.length; i++) {
                    var img = document.createElement("img");
                    img.src = tmpLocalIds[i];
                    img.className = "part-img";
                    img.tempUrl = tmpLocalIds[i];
                    images.append(img);
                }
                images.append(addImgButton);
                $$('img').click(function() {
                    ThorgeneGlobal.addRecord.previewImg();
                });
            },
            error: function() {
                // TODO
            }
        });
    });

    $$('.view[data-page=add-record]').find('#save').click(function() {
        if (ThorgeneGlobal.addRecord.localIds.length === 0) {
            f7.alert('未添加检测报告图片');
        } else {
            f7.showPreloader('保存中...');
            ThorgeneGlobal.addRecord.uploadImg(ThorgeneGlobal.addRecord.localIds);
        }
    });

    $$('.view[data-page=add-record]').find('.navbar .left').click(function() {
        ThorgeneGlobal.addRecord.localIds = [];
        ThorgeneGlobal.addRecord.serverIds = [];
        f7.recordView.router.back();
    });
});
