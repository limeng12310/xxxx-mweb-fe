/**
 * Created by zc on 2016/8/11.
 */
  class CircleProgress extends React.Component {
    componentDidUpdate() {
      this.drawArc(this.props.per, this.props.x);
    }
    drawArc(per, x) {
      const canvas = this.refs.myCanvas.getContext('2d');
      const angle = per * 360;
      const endArc = Math.PI / 180 * angle - Math.PI / 2;
      canvas.beginPath();
      canvas.lineWidth = 2;
      canvas.strokeStyle = 'rgba(235,235,235,0.4)';
      canvas.arc(x + 3, x + 3, x, 0, Math.PI * 2, false);
      canvas.stroke();
      canvas.beginPath();
      canvas.lineWidth = 0.06 * x;
      const sR = x - 1 - 0.03 * x;
      canvas.strokeStyle = '#fff';
      canvas.arc(x + 3, x + 3, sR, -0.5 * Math.PI, endArc, false);
      canvas.stroke();
    }
    render() {
      const { x } = this.props;
      return (
        <canvas id="myCanvas" ref="myCanvas" width={2 * x + 6} height={2 * x + 6} />
      );
    }
}
  CircleProgress.propTypes = {
    per: React.PropTypes.number,
    x: React.PropTypes.number
  };
  export default CircleProgress;