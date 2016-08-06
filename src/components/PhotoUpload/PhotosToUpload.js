import backImg from './example.jpg';
import addImg from './img/add.png';
import delImg from './img/del.png';

class PhotosToUpload extends React.Component {
  constructor(props) {
    super(props);
    this.clickAlert = this.clickAlert.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.wxChooseImgSuccess = this.wxChooseImgSuccess.bind(this);
    this.clickPreview = this.clickPreview.bind(this);
  }
  clickChange() {
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
      wx.uploadImage({
        localId: res.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: this.wxUploadImageSuccess
      });
    }
  }
  wxUploadImageSuccess(res) {
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
    
  }
  render() {
    const styles = {
      layOut: {
        marginLeft: '1.1rem',
        marginRight: '1.1rem',
        marginTop: '0.78125rem'
      },
      allImage: {
        minHeight: '6.40625rem',
        // height: '6.40625rem',
        // overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'between',
        alignContent: 'flex-start'
      },
      img: {
        margin: '0.3125rem',
        width: '1.875rem',
        height: '1.875rem',
        borderWidth: '0.03125rem',
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        borderRadius: '0.178125rem',
        backgroundImage: `url(${backImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      add: {
        margin: '0.1875rem',
        width: '2.65625rem',
        height: '2.66625rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${addImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      del: {
        marginTop: '0.3125rem',
        marginBottom: '0.1875rem',
        width: '0.890625rem',
        height: '0.890625rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${delImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
    let add, del;
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
        <div style={styles.del}></div>
      );
    }
    return (
      <div style={styles.layOut}>
        <div style={styles.allImage}>
          {
            this.props.items.map((imgId, i) => {
              const background = {
                backgroundImage: `url(${imgId})`
              };
              return (
                <div
                  data-url={imgId}
                  key={i}
                  style={Object.assign({}, styles.img, background)}
                  onClick={this.clickPreview}
                >
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
  onUserImageInput: React.PropTypes.function,
  imgCount: React.PropTypes.string,
  items: React.PropTypes.string
};

export default PhotosToUpload;