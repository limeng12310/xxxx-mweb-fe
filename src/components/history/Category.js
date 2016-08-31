/**
 * Created by zc on 2016/8/30.
 */
  const CategoryStyle = {
    box: {
      overflowX: 'scroll',
      overflowY: 'hidden',
      width: '100%',
      height: '1rem',
      lineHeight: '1rem'
    },
    item: {
      marginRight: '0.5rem',
      marginLeft: '0.5rem',
      float: 'left',
      fontSize: '0.8rem',
      textDecoration: 'none',
      color: '#FFF'
    },
    littleItem: {
      marginRight: '0.8rem',
      marginLeft: '0.7rem',
      float: 'left',
      fontSize: '0.6rem',
      textDecoration: 'none',
      color: '#FFF'
    }
  };

  class Category extends React.Component {
    componentDidMount() {
      let width = 0;
      $(this.refs.container).children('a').each(
        function () {
          width += (this.offsetWidth + 100);
        });
      width = lib.flexible.px2rem(width);
      $(this.refs.container).css('width', `${width}rem`);

      let width2 = 0;
      $(this.refs.container2).children('a').each(
        function () {
          width2 += (this.offsetWidth + 120);
        });
      width2 = lib.flexible.px2rem(width2);
      $(this.refs.container2).css('width', `${width2}rem`);
    }
    render() {
      return (
        <div>
          <div className="weightLine"></div>
          <div style={CategoryStyle.box}>
            <div ref="container">
              <a href="###" style={CategoryStyle.item}>项目1</a>
              <a href="###" style={CategoryStyle.item}>项目2</a>
              <a href="###" style={CategoryStyle.item}>项目3</a>
              <a href="###" style={CategoryStyle.item}>项目4</a>
              <a href="###" style={CategoryStyle.item}>项目5</a>
              <a href="###" style={CategoryStyle.item}>项目6</a>
              <a href="###" style={CategoryStyle.item}>项目7</a>
              <a href="###" style={CategoryStyle.item}>项目8</a>
              <a href="###" style={CategoryStyle.item}>项目9</a>
              <a href="###" style={CategoryStyle.item}>项目10</a>
            </div>
          </div>
          <div style={CategoryStyle.box}>
            <div ref="container2">
              <a href="###" style={CategoryStyle.littleItem}>项目1</a>
              <a href="###" style={CategoryStyle.littleItem}>项目2</a>
              <a href="###" style={CategoryStyle.littleItem}>项目3</a>
              <a href="###" style={CategoryStyle.littleItem}>项目4</a>
              <a href="###" style={CategoryStyle.littleItem}>项目5</a>
              <a href="###" style={CategoryStyle.littleItem}>项目6</a>
              <a href="###" style={CategoryStyle.littleItem}>项目7</a>
              <a href="###" style={CategoryStyle.littleItem}>项目8</a>
              <a href="###" style={CategoryStyle.littleItem}>项目9</a>
              <a href="###" style={CategoryStyle.littleItem}>项目10</a>
            </div>
          </div>
          <div className="weightLine"></div>
        </div>
      );
    }
  }
  export default Category;