import backImg from './example.jpg';
import imgDel from './img/imgDel.svg';

class PhotosToUpload extends React.Component {
  constructor(props) {
    super(props);
    this.clickDeleteImage = this.clickDeleteImage.bind(this);
    this.clickPreview = this.clickPreview.bind(this);
  }
  clickPreview(e) {
    if (CORDOVA_ENV === 'false') {
      wx.previewImage({
        current: e.target.getAttribute('data-url'), // 当前显示图片的http链接
        urls: this.props.items // 需要预览的图片http链接列表
      });
    } else {
      const dataUrl = e.target.getAttribute('data-url');
      const base64 = dataUrl.split(',')[1];
      const type = dataUrl.split(';')[0].split('/')[1];
      FullScreenImage.showImageBase64(base64, ' ', type);
    }
  }
  clickDeleteImage(e) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    if (confirm('确定要删除这张图片吗？')) {
      this.props.onUserImageDelete(index);
    }
  }
  render() {
    const styles = {
      layOut: {
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
        marginTop: '0.4rem'
      },
      allImage: {
        minHeight: 'calc(100% - 2.76rem)',
        // height: '6.40625rem',
        // overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
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
      }
    };
    return (
      <div style={styles.layOut}>
        <div style={styles.allImage}>
          {
            this.props.items.map((imgId, i) => {
              const background = {
                backgroundImage: `url(${imgId})`
              };
              const displayDel = {
                display: this.props.isDelete ? 'block' : 'none'
              };
              return (
                <div style={styles.imgDelBox}>
                  <div
                    data-url={imgId}
                    key={i}
                    style={Object.assign({}, styles.img, background)}
                    onTouchTap={this.clickPreview}
                  >
                  </div>
                  <div
                    data-index={i}
                    style={Object.assign({}, styles.imgDel, displayDel)}
                    onTouchTap={this.clickDeleteImage}
                  >
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

PhotosToUpload.propTypes = {
  onUserImageDelete: React.PropTypes.func,
  items: React.PropTypes.array,
  isDelete: React.PropTypes.bool
};

export default PhotosToUpload;