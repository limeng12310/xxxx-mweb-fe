import bottomBackground from './img/background2.2.svg';
import config from '../../config';

class ReportShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChoosen: 0,
            imgsNew: []
        };
        this.clickChange = this.clickChange.bind(this);
        this.setTab1 = this.setTab1.bind(this);
        this.setTab2 = this.setTab2.bind(this);
        this.clickPreview = this.clickPreview.bind(this);
        this.goItemReport = this.goItemReport.bind(this);
    }

    componentDidUpdate() {
        let leftSelectContent = this.refs.leftSelectContent;
        let rightSelectContent = this.refs.rightSelectContent;
        let leftSelectOffsetArr = [];
        let rightSelectOffsetArr = [0];
        let leftSelectEles = $(leftSelectContent).find('li');
        for (var i = 0; i < leftSelectEles.length; i++){
            leftSelectOffsetArr.push(leftSelectEles[i].offsetTop-64);
        }
        let contentHeight = $(window).height() - lib.flexible.rem * 2.2;
        this.props.messages.values.map((firstItem, i) => {
            rightSelectOffsetArr.push(rightSelectOffsetArr[rightSelectOffsetArr.length - 1] + this.props.messages.values[i].items.length * lib.flexible.rem * 1.3);
        });
        $(leftSelectContent).find('li').eq(0).addClass('leftSelect');
        $(rightSelectContent).scroll(() => {
            let top = $(rightSelectContent).scrollTop();
            for (var i = 1; i <= rightSelectOffsetArr.length; i++) {
                if (top >= rightSelectOffsetArr[i - 1] && top < rightSelectOffsetArr[i]) {
                    $(leftSelectContent).find('li').removeClass('leftSelect');
                    $(leftSelectContent).find('li').eq(i - 1).addClass('leftSelect');
                    if($(leftSelectContent).scrollTop()>leftSelectOffsetArr[i-1]){
                        let end = leftSelectOffsetArr[i-1];
                        let start = $(leftSelectContent).scrollTop();
                        this.fx(function (now) {
                            $(leftSelectContent).scrollTop(now);
                        }, start, end);
                    }else if(leftSelectOffsetArr[i-1]-$(leftSelectContent).scrollTop()>contentHeight-lib.flexible.rem * 2){
                        let end = $(leftSelectContent).scrollTop() + lib.flexible.rem * 3;
                        let start = $(leftSelectContent).scrollTop();
                        this.fx(function (now) {
                            $(leftSelectContent).scrollTop(now);
                        }, start, end);
                    }
                    return
                }
            }
        });
    }

    componentDidMount() {
        let handleDomHeight = lib.flexible.rem2px(7.8);
        $('#scrollBox').swipeUp(e => {
            if ($('#scroll').scrollTop() <= handleDomHeight) {
                this.props.changeScrollUp();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        $('#scrollBox').swipeDown(e => {
            if ($('#scroll').scrollTop() <= handleDomHeight) {
                this.props.changeScrollDown();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        $('#reportScroll').swipeUp(e => {
            if ($('#scroll').scrollTop() <= handleDomHeight) {
                this.props.changeScrollUp();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        $('#reportScroll').swipeDown(e => {
            if ($('#scroll').scrollTop() <= (handleDomHeight - 20) && $('#scroll').scrollTop() > 20) {
                this.props.changeScrollDown();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        $('#imageScroll').swipeUp(e => {
            if ($('#scroll').scrollTop() <= handleDomHeight) {
                this.props.changeScrollUp();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        $('#imageScroll').swipeDown(e => {
            if ($('#scroll').scrollTop() <= (handleDomHeight - 20) && $('#scroll').scrollTop() > 20) {
                this.props.changeScrollDown();
                //$('#reportScroll').css('overflow','auto');
                //$('#imageScroll').css('overflow','auto');
            }
        });
        // $('#reportScroll').scroll(() => {
        //   const reportScrollH = $('#reportScroll').scrollTop();
        //   if (reportScrollH <= 0) {
        //     this.props.changeScroll1();
        //   } else if (reportScrollH > 0) {
        //     this.props.changeScroll2();
        //   }
        // });
        // $('#imageScroll').scroll(() => {
        //   const imageScrollH = $('#imageScroll').scrollTop();
        //   if (imageScrollH <= 0) {
        //     this.props.changeScroll1();
        //   } else if (imageScrollH > 0) {
        //     this.props.changeScroll2();
        //   }
        // });
    }

    setTab1() {
        $('#report').css({
            width: '100%'
        });
        $('#image').css({
            width: 0
        });
        $('#tabName1').css({
            filter: 'alpha(opacity=100)',
            MozOpacity: 1,
            opacity: 1
        });
        $('#tabName2').css({
            filter: 'alpha(opacity=60)',
            MozOpacity: 0.6,
            opacity: 0.6
        });
    }

    setTab2() {
        $('#image').css({
            width: '100%'
        });
        $('#report').css({
            width: 0
        });
        $('#tabName1').css({
            filter: 'alpha(opacity=60)',
            MozOpacity: 0.6,
            opacity: 0.6
        });
        $('#tabName2').css({
            filter: 'alpha(opacity=100)',
            MozOpacity: 1,
            opacity: 1
        });
    }

    fx(fn, begin, end) {

        //  渐出特效
        this.easeOut = (t, b, c, d) => {
            return -c * (t /= d) * (t - 2) + b;
        }

        let options = arguments[3] || {};
        let duration = options.duration || 500;
        let ease = options.ease || this.easeOut;

        let startTime = new Date().getTime();
        this.respon = ()=> {
            let timestamp = new Date().getTime() - startTime;
            fn(ease(timestamp, begin, ( end - begin), duration), 'step');

            if (duration <= timestamp) {
                fn(end, 'end');
            } else {
                setTimeout(this.respon, 20);
            }
        }
        (() => {
            setTimeout(this.respon, 20)
        })();
    }

    clickChange(e) {
        let rightSelectOffsetArr = [0];

        this.props.messages.values.map((firstItem, i) => {
            rightSelectOffsetArr.push(rightSelectOffsetArr[rightSelectOffsetArr.length - 1] + this.props.messages.values[i].items.length * lib.flexible.rem * 1.3);
        });
        let end = rightSelectOffsetArr[e.target.getAttribute('data-index') - 0] + 10;
        let start = $('#rightSelectContent').scrollTop();
        this.fx(function (now) {
            $('#rightSelectContent').scrollTop(now);
        }, start, end);
        // this.setState({
        //   isChoosen: parseInt(e.target.getAttribute('data-index'), 10)
        // });
    }

    clickPreview(e) {
        wx.previewImage({
            current: e.target.getAttribute('data-url'), // 当前显示图片的http链接
            urls: this.props.messages.imgs.map(img => `${config.cdnPrefix}/${img}`) // 需要预览的图片http链接列表
        });
    }

    goItemReport(e) {
        this.props.handleGoItemReport(parseInt(e.target.getAttribute('data-leftIndex'), 10), parseInt(e.target.getAttribute('data-rightIndex'), 10));
    }

    render() {
        const styles = {
            nav: {
                display: 'flex',
                fontSize: '0.533333rem',
                height: '0.94rem',
                paddingTop: '0.1rem'
            },
            activeMenu: {
                fontSize: '0.666667rem',
                color: '#fff',
                width: '50%',
                textAlign: 'center'
            },
            inactiveMenu: {
                fontSize: '0.666667rem',
                color: '#fff',
                filter: 'alpha(opacity=60)',
                MozOpacity: 0.6,
                opacity: 0.6,
                width: '50%',
                textAlign: 'center'
            },
            boxOut1: {
                width: '100%',
                backgroundImage: `url(${bottomBackground})`,
                minHeight: 'calc(100% - 7.8rem - 0.94rem)',
                // 图片自适应屏幕大小
                position: 'absolute',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                backgroundRepeat: 'no-repeat',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                height: 'calc(100% - 0.92rem)'
            },
            boxOut2: {
                width: 0,
                backgroundImage: `url(${bottomBackground})`,
                minHeight: 'calc(100% - 7.8rem - 0.94rem)',
                // 图片自适应屏幕大小
                position: 'absolute',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                backgroundRepeat: 'no-repeat',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                height: 'calc(100% - 0.92rem)'
            },
            box: {
                width: '100%',
                minHeight: 'calc(100% - 7.8rem - 0.94rem)',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                height: 'calc(100% - 0.3rem)'
            },
            leftBox: {
                width: '30%',
                marginLeft: '1.2rem',
                fontSize: '0.533333rem',
                color: '#9C9C9C',
                listStyle: 'none',
                overflowY: 'auto',
                height: '100%'
            },
            rightBox: {
                width: '70%',
                fontSize: '0.533333rem',
                color: '#9C9C9C',
                listStyle: 'none',
                marginLeft: '0.8rem',
                overflowY: 'auto',
                height: '100%'
            },
            leftList: {
                marginBottom: '0.8rem'
            },
            rightList: {
                marginBottom: '0.7rem'
            },
            allImage: {
                minHeight: '6.40625rem',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'between',
                alignContent: 'flex-start',
                margin: '0 1.4rem'
            },
            img: {
                position: 'relative',
                margin: '0.2rem 0.4rem',
                width: '1.573333rem',
                height: '1.573333rem',
                borderWidth: '0.03125rem',
                borderStyle: 'solid',
                borderColor: '#D7D7D7',
                borderRadius: '0.178125rem',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }
        };
        let reportScrollBox;
        let imageScrollBox;
        if (this.props.messages.values.length !== 0) {
            reportScrollBox = (
                <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="reportScroll">
                    <ul style={styles.leftBox} ref="leftSelectContent" id="leftSelectContent">
                        {
                            this.props.messages.values.map((item, i) => {
                                let circleBorder = {};
                                //if (this.state.isChoosen === i) {
                                //  circleBorder = {
                                //    borderWidth: '0.026667rem',
                                //    borderStyle: 'solid',
                                //    borderRadius: '0.266667rem',
                                //    display: 'table'
                                //  };
                                //}
                                return (
                                    <li
                                        key={i}
                                        data-index={i}
                                        style={Object.assign({}, styles.leftList, circleBorder)}
                                        onClick={this.clickChange}
                                    >
                                        {item.classify}
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <ul style={styles.rightBox} ref="rightSelectContent" id="rightSelectContent">
                        {
                            this.props.messages.values.map((firstItem, i) => {
                                return (
                                    <div>
                                        {
                                            this.props.messages.values[i].items.map((item, j) => (
                                                <li
                                                    data-rightIndex={j}
                                                    data-leftIndex={i}
                                                    key={j}
                                                    style={styles.rightList}
                                                    onClick={this.goItemReport}
                                                >{item.name}</li>
                                            ))
                                        }
                                        <div className="weightLine"></div>
                                    </div>
                                );
                            })

                        }
                        <li style={{height: 'calc(100% - 1.3rem)'}}></li>
                    </ul>
                </div>
            );
        } else {
            reportScrollBox = (
                <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="reportScroll">
                    <ul style={styles.leftBox} ref="leftSelectContent"></ul>
                    <ul style={styles.rightBox} ref="rightSelectContent"></ul>
                </div>
            )
        }
        imageScrollBox = (
            <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="imageScroll">
                <div style={styles.allImage}>
                    {
                        this.props.messages.imgs.map((imgId, i) => {
                            const background = {
                                backgroundImage: `url(${config.cdnPrefix}/${imgId})`
                            };
                            return (
                                <div
                                    data-url={`${config.cdnPrefix}/${imgId}`}
                                    key={i}
                                    style={Object.assign({}, styles.img, background)}
                                    onClick={this.clickPreview}
                                >
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
        return (
            <div>
                <div style={styles.nav} id="scrollBox">
                    <div style={styles.activeMenu} onClick={this.setTab1} id="tabName1">看报告</div>
                    <div style={styles.inactiveMenu} onClick={this.setTab2} id="tabName2">看图片</div>
                </div>
                <div style={styles.boxOut1} id="report">
                    {reportScrollBox}
                </div>
                <div style={styles.boxOut2} id="image">
                    {imageScrollBox}
                </div>
            </div>
        );
    }
}

ReportShow.propTypes = {
    messages: React.PropTypes.object,
    scrollStyle: React.PropTypes.object,
    changeScroll1: React.PropTypes.func.isRequired,
    changeScrollUp: React.PropTypes.func.isRequired,
    changeScrollDown: React.PropTypes.func.isRequired,
    changeScroll2: React.PropTypes.func.isRequired,
    handleGoItemReport: React.PropTypes.func
};

export default ReportShow;