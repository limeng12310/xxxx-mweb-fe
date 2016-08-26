import backImg from './example.jpg';
import addImg from './img/add.png';
import backgroudDelImg from './img/del.png';
import imgDel from './img/imgDel.svg';


class PhotosToUpload extends React.Component {
  constructor(props) {
    super(props);
    this.clickAlert = this.clickAlert.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickDeleteImage = this.clickDeleteImage.bind(this);
    this.wxChooseImgSuccess = this.wxChooseImgSuccess.bind(this);
    this.clickPreview = this.clickPreview.bind(this);
    this.state = {
      isDelete: false,
      i: true
    };
  }
  clickChange() {
    this.setState({
      isDelete: false,
      i: true
    });
  //   this.props.onUserImageInput();
  // }
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: this.wxChooseImgSuccess,
      error() {
        alert('图片选择失败');
      }
    });
  }
  wxChooseImgSuccess(res) {
    if ((this.props.imgCount + res.localIds.length) > 9) {
      alert('最多只能添加九张图片！');
    } else {
      this.props.onUserImageInput(res.localIds);
      for (let i = 0; i < res.localIds.length; i ++) {
        wx.uploadImage({
          localId: res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: this.wxUploadImageSuccess.call(this)
        });
      }
    }
  }
  wxUploadImageSuccess(ctx, res) {                                 // 使用闭包，实现服务器端ID和图片的本地ID一一对应起来
    this.props.onUserImageUpload(res.serverId); // 返回图片的服务器端ID
  }
  clickPreview(e) {
    wx.previewImage({
      current: e.target.getAttribute('data-url'), // 当前显示图片的http链接
      urls: this.props.items // 需要预览的图片http链接列表
    });
  }
  clickAlert() {
    alert('最多只能添加九张图片！');
  }
  clickDelete() {
    if (this.state.i) {
      this.setState({
        isDelete: true,
        i: false
      });
    } else {
      this.setState({
        isDelete: false,
        i: true
      });
    }
  }
  clickDeleteImage(e) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    this.props.onUserImageDelete(index);
  }
  render() {
    const styles = {
      layOut: {
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        marginTop: '0.4rem'
      },
      allImage: {
        minHeight: 'calc((100% - 2.4rem) - 5rem - 2.76rem)',
        // height: '6.40625rem',
        // overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'between',
        alignContent: 'flex-start'
      },
      imgDelBox: {
        margin: '0.109375rem',
        width: '2rem',
        height: '2rem'
      },
      img: {
        position: 'relative',
        margin: '0.2rem',
        width: '1.573333rem',
        height: '1.573333rem',
        borderWidth: '0.03125rem',
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        borderRadius: '0.178125rem',
        backgroundImage: `url(${backImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      imgDel: {
        position: 'relative',
        marginTop: '-2.1rem',
        marginLeft: 0,
        marginRight: 'auto',
        marginBottom: 'auto',
        width: '0.533333rem',
        height: '0.533333rem',
        backgroundImage: `url(${imgDel})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      add: {
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: '1.05rem',
        margin: '0.1875rem',
        width: '2.24rem',
        height: '2.24rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${addImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: 100
      },
      delNone: {
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: '3.53rem',
        marginTop: '0.3125rem',
        marginBottom: '0.1875rem',
        width: '0.7815rem',
        height: '0.77rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: 'none',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      del: {
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: '3.53rem',
        marginTop: '0.3125rem',
        marginBottom: '0.1875rem',
        width: '0.7815rem',
        height: '0.77rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${backgroudDelImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
    let add;
    let del;
    if (this.props.imgCount >= 9) {
      add = (
        <div onClick={this.clickAlert} style={styles.add}></div>
      );
    } else {
      add = (
        <div onClick={this.clickChange} style={styles.add}></div>
      );
    }
    if (this.props.imgCount >= 1) {
      del = (
        <div onClick={this.clickDelete} style={styles.del}></div>
      );
    } else {
      del = (
        <div style={styles.delNone}></div>
      );
    }
    return (
      <div style={styles.layOut}>
        <div style={styles.allImage}>
          {
            this.props.items.map((imgId, i) => {
              const background = {
                backgroundImage: `url(${imgId})`
                // backgroundImage: `url(${backImg})`
                // display: imgId != null ? 'block' : 'none'
              };
              const displayDel = {
                display: this.state.isDelete ? 'block' : 'none'
              };
              return (
                <div style={styles.imgDelBox}>
                  <div
                    data-url={imgId}
                    key={i}
                    style={Object.assign({}, styles.img, background)}
                    onClick={this.clickPreview}
                  >
                  </div>
                  <div
                    data-index={i}
                    style={Object.assign({}, styles.imgDel, displayDel)}
                    onClick={this.clickDeleteImage}
                  >
                  </div>
                </div>
              );
            })
          }
        </div>
        {del}
        {add}
      </div>
    );
  }
}

PhotosToUpload.propTypes = {
  onUserImageInput: React.PropTypes.func,
  onUserImageUpload: React.PropTypes.func,
  onUserImageDelete: React.PropTypes.func,
  imgCount: React.PropTypes.number,
  items: React.PropTypes.array
};

export default PhotosToUpload;