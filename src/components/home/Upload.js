/**
 * Created by zc on 2016/7/26.
 */
import manualUpload from './img/manualUpload.png';
import imgUpload from './img/imgUpload.png';

const UploadStyle = {
  right: {
    width: '20%',
    height: '4.8rem',
    display: 'flex',
    flexDirection: 'column'
  },
  rightUpload: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  },
  icon: {
    width: '1rem'
  }
};

class Upload extends React.Component {
  render() {
    return (
      <div style={UploadStyle.right}>
        <div style={UploadStyle.rightUpload}>
          <img src={manualUpload} alt="" style={UploadStyle.icon} />
        </div>
        <div style={UploadStyle.rightUpload}>
          <img src={imgUpload} alt="" style={UploadStyle.icon} />
        </div>
      </div>
    );
  }
}
export default Upload;