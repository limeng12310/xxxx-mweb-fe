/**
 * Created by zc on 2016/8/23.
 */
class EnumTu extends React.Component {
  componentDidMount() {
    this.drawDial('myCanvas');
  }
  drawDial(ref) {
    const myCanvas = this.refs[ref];
    const ctx = myCanvas.getContext('2d');
    const clientWidth = document.documentElement.clientWidth;
    const canvasWidth = Math.floor(clientWidth * 400 / 750);
    myCanvas.setAttribute('width', `${canvasWidth}px`);
    myCanvas.setAttribute('height', `${canvasWidth}px`);
    const r = canvasWidth / 2;
    const r2 = 0.8 * r;
    const r3 = (r - r2) / 2;
    const angle = 10;
    const angle2 = 40;
    const radian = angle * Math.PI / 180;
    const radian2 = angle2 * Math.PI / 180;
    const x1 = r - r * Math.sin(radian);
    const y1 = r - r * Math.cos(radian);
    const x2 = r - r * Math.sin(radian2);
    const y2 = r + r * Math.cos(radian2);
    const x3 = r + r * Math.sin(radian);
    const x4 = r + r * Math.sin(radian2);
    const x11 = r - r2 * Math.sin(radian);
    const y11 = r - r2 * Math.cos(radian);
    const x22 = r - r2 * Math.sin(radian2);
    const y22 = r + r2 * Math.cos(radian2);
    const x33 = r + r2 * Math.sin(radian);
    const x44 = r + r2 * Math.sin(radian2);
    const cx1 = (x1 + x11) / 2;
    const cy1 = (y1 + y11) / 2;
    const cx2 = (x2 + x22) / 2;
    const cy2 = (y2 + y22) / 2;
    const cx3 = (x3 + x33) / 2;
    const cx4 = (x4 + x44) / 2;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(r, r, r, 1.5 * Math.PI - radian, 0.5 * Math.PI + radian2, true);
    ctx.arc(cx2, cy2, r3, 0.5 * Math.PI + radian2, 1.5 * Math.PI + radian2, true);
    ctx.arc(r, r, r2, 0.5 * Math.PI + radian2, 1.5 * Math.PI - radian, false);
    ctx.arc(cx1, cy1, r3, 0.5 * Math.PI - radian, 1.5 * Math.PI - radian, true);
    ctx.fillStyle = 'rgb(39, 240, 188)';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(r, r, r, 1.5 * Math.PI + radian, 0.5 * Math.PI - radian2, false);
    ctx.arc(cx4, cy2, r3, 0.5 * Math.PI - radian2, 1.5 * Math.PI - radian2, false);
    ctx.arc(r, r, r2, 0.5 * Math.PI - radian2, 1.5 * Math.PI + radian, true);
    ctx.arc(cx3, cy1, r3, 0.5 * Math.PI + radian, 1.5 * Math.PI + radian, false);
    ctx.fillStyle = 'rgba(252, 252, 252, 0.5)';
    ctx.fill();
    ctx.closePath();
  }
  render() {
    return (
      <canvas id="myCanvas" ref="myCanvas" />
    );
  }
}

export default EnumTu;