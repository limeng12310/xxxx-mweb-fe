import backImg from './example.jpg';
import addImg from './add.jpg';

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
        marginLeft: 102,
        marginRight: 102,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 40,
        height: 1000,
        fontSize: 40,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'between',
        alignContent: 'flex-start',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#D7D7D7'
      },
      img: {
        margin: 20,
        width: 200,
        height: 200,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        backgroundImage: `url(${backImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      add: {
        margin: 20,
        width: 200,
        height: 200,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
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
        {
          this.props.items.map((imgId) => {
            const background = {
              backgroundImage: `url(${imgId})`
            };
            return (
              <div style={[styles.img, background]}></div>
            );
          })
        }
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