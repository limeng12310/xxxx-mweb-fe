import backImg from './example.jpg';
import addImg from './img/add.png';

class PhotosToUpload extends React.Component {
  constructor(props) {
    super(props);
    this.clickAlert = this.clickAlert.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.wxChooseImgSuccess = this.wxChooseImgSuccess.bind(this);
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
    this.props.onUserImageInput(res.localIds);
  }
  clickAlert() {
    alert('最多只能添加九张图片！');
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
        margin: '0.3125rem',
        width: '2.65625rem',
        height: '2.66625rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${addImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
    let add;
    if (this.props.imgCount >= 9) {
      add = (
        <div onClick={this.clickAlert} style={styles.add}></div>
      );
    } else {
      add = (
        <div onClick={this.clickChange} style={styles.add}></div>
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
                <div key={i} style={Object.assign({}, styles.img, background)}></div>
              );
            })
          }
        </div>
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