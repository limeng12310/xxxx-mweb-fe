/**
 * Created by zc on 2016/7/26.
 */

const UploadStyle = {
  right: {
    width: '20%',
    height: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '120px'
  },
  rightUpload: {
    flex: 1,
    border: '1px solid green',
    width: '100%'
  }
};

class Upload extends React.Component {
  render() {
    return (
      <div style={UploadStyle.right}>
        <div style={UploadStyle.rightUpload}>手动上传</div>
        <div style={UploadStyle.rightUpload}>拍照上传</div>
      </div>
    );
  }
}
export default Upload;