/**
 * Created by zc on 2016/8/11.
 */
  class CircleProgress extends React.Component {
    componentDidMount() {
      this.drawArc(this.props.per, this.props.x);
    }
    drawArc(per, x) {
      const canvas = this.refs.myCanvas.getContext('2d');
      const angle = per * 360;
      const endArc = Math.PI / 180 * angle - Math.PI / 2;
      canvas.beginPath();
      canvas.lineWidth = 2;
      canvas.strokeStyle = 'rgba(235,235,235,0.4)';
      canvas.arc(x, x, x, 0, Math.PI * 2, false);
      canvas.stroke();
      canvas.beginPath();
      canvas.lineWidth = 0.06 * x;
      const sR = x - 1 - 0.03 * x;
      canvas.strokeStyle = '#f00';
      canvas.arc(x, x, sR, -0.5 * Math.PI, endArc, false);
      canvas.stroke();
    }
    render() {
      const { x } = this.props;
      return (
        <canvas id="myCanvas" ref="myCanvas" width={2 * x} height={2 * x} />
      );
    }
}
  CircleProgress.propTypes = {
    per: React.PropTypes.number,
    x: React.PropTypes.number
  };
  export default CircleProgress;