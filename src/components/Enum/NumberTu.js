/**
 * Created by zc on 2016/8/24.
 */
  import Normol from './normol.png';
  import Warning from './warning.png';
  class NumberTu extends React.Component {
    componentDidMount() {
      const { min, max, value } = this.props;
      this.drawDial('myCanvas', min, max, value);
    }
    drawDial(ref, min, max, value) {
      const myCanvas = this.refs[ref];
      const ctx = myCanvas.getContext('2d');
      const clientWidth = document.documentElement.clientWidth;
      const canvasWidth = Math.floor(clientWidth * 400 / 750);
      myCanvas.setAttribute('width', `${canvasWidth}px`);
      myCanvas.setAttribute('height', `${canvasWidth}px`);
      const r = canvasWidth / 2;
      const r2 = 0.8 * r;
      const r3 = (r - r2) / 2;
      const angle = 30;
      const angle2 = (360 - 2 * angle) / 3;
      const angle3 = angle2 + angle - 90;
      const radian1 = angle * Math.PI / 180;
      const radian2 = angle3 * Math.PI / 180;
      const radian3 = angle2 * Math.PI / 180;
      const x1 = r - r * Math.sin(radian1);
      const y1 = r + r * Math.cos(radian1);
      const x2 = r - r * Math.cos(radian2);
      const y2 = r - r * Math.sin(radian2);
      const x3 = r + r * Math.cos(radian2);
      const x4 = r + r * Math.sin(radian1);
      const x11 = r - r2 * Math.sin(radian1);
      const y11 = r + r2 * Math.cos(radian1);
      const x22 = r - r2 * Math.cos(radian2);
      const y22 = r - r2 * Math.sin(radian2);
      const x33 = r + r2 * Math.cos(radian2);
      const x44 = r + r2 * Math.sin(radian1);
      const cx1 = (x1 + x11) / 2;
      const cy1 = (y1 + y11) / 2;
      const cx2 = (x2 + x22) / 2;
      const cy2 = (y2 + y22) / 2;
      const cx3 = (x3 + x33) / 2;
      const cx4 = (x4 + x44) / 2;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(r, r, r, Math.PI + radian2, 0.5 * Math.PI + radian1, true);
      ctx.arc(cx1, cy1, r3, 0.5 * Math.PI + radian1, 1.5 * Math.PI + radian1, true);
      ctx.arc(r, r, r2, 0.5 * Math.PI + radian1, Math.PI + radian2, false);
      ctx.arc(cx2, cy2, r3, 0.5 * Math.PI - radian2, Math.PI + radian2, true);
      ctx.fillStyle = 'rgb(251,248,176)';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(r, r, r, Math.PI + radian2, 2 * Math.PI - radian2, false);
      ctx.arc(cx3, cy2, r3, 2 * Math.PI - radian2, Math.PI - radian2, false);
      ctx.arc(r, r, r2, 2 * Math.PI - radian2, Math.PI + radian2, true);
      ctx.arc(cx2, cy2, r3, 0.5 * Math.PI - radian2, Math.PI + radian2, true);
      ctx.fillStyle = 'rgb(163,248,224)';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(r, r, r, 2 * Math.PI - radian2, 0.5 * Math.PI - radian1, false);
      ctx.arc(cx4, cy1, r3, 0.5 * Math.PI - radian1, 1.5 * Math.PI - radian1, false);
      ctx.arc(r, r, r2, 0.5 * Math.PI - radian1, 2 * Math.PI - radian2, true);
      ctx.arc(cx3, cy2, r3, Math.PI - radian2, 2 * Math.PI - radian2, true);
      ctx.fillStyle = 'rgb(251,248,176)';
      ctx.fill();
      ctx.closePath();
      const image = new Image();
      image.onload = function () {
        let radian;
        let per;
        if (value < min) {
          per = value / min;
          radian = - (1.5 - per) * radian3;
        } else if (value <= max && value >= min) {
          per = (value - min) / (max - min);
          if (per > 0.5) {
            radian = (per - 0.5) * radian3;
          } else {
            radian = - (0.5 - per) * radian3;
          }
        } else {
          radian = -1 / (value - max + 1 / radian3) + radian3 + 0.5 * Math.PI - radian2;
        }
        const rx = r;
        const ry = r;
        const py = 70;
        const radius = ry - py;
        const dx = rx + radius * Math.sin(radian);
        const dy = ry - radius * Math.cos(radian);
        ctx.translate(dx, dy);
        ctx.rotate(radian);
        ctx.translate(-dx, -dy);
        ctx.drawImage(image, dx - image.width / 2, dy - image.height / 2);
      };
      if (value <= max && value >= min) {
        image.src = Normol;
      } else {
        image.src = Warning;
      }
    }
    render() {
      return (
        <canvas ref="myCanvas" />
      );
    }
  }
  NumberTu.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
  };
  export default NumberTu;