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
    boxIn: {
      height: '100%',
      width: '100%'
    },
    item: {
      marginRight: '0.5rem',
      marginLeft: '0.5rem',
      float: 'left',
      fontSize: '0.7rem',
      textDecoration: 'none',
      color: '#FFF',
      // IE滤镜，透明度50%
      filter: 'alpha(opacity=60)',
      // Firefox私有，透明度50%
      MozOpacity: 0.6,
      // 其他，透明度50%
      opacity: 0.6
    },
    littleItem: {
      marginRight: '0.8rem',
      marginLeft: '0.7rem',
      float: 'left',
      fontSize: '0.6rem',
      textDecoration: 'none',
      color: '#FFF',
      // IE滤镜，透明度50%
      filter: 'alpha(opacity=60)',
      // Firefox私有，透明度50%
      MozOpacity: 0.6,
      // 其他，透明度50%
      opacity: 0.6
    }
  };

  class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isChoosenOne: 0,
        isChoosenTwo: 0
      };
      this.clickChangeOne = this.clickChangeOne.bind(this);
      this.clickChangeTwo = this.clickChangeTwo.bind(this);
    }
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
    clickChangeOne(e) {
      this.setState({
        isChoosenOne: parseInt(e.target.getAttribute('data-index'), 10),
        isChoosenTwo: 0
      });
      this.props.handleChangeDataOne(parseInt(e.target.getAttribute('data-index'), 10));
    }
    clickChangeTwo(e) {
      this.setState({
        isChoosenTwo: parseInt(e.target.getAttribute('data-index'), 10)
      });
      this.props.handleChangeDataTwo(
        parseInt(e.target.getAttribute('data-index'), 10)
      );
    }
    render() {
      // let containerOne;
      // let containerTwo;
      // if(this.props.itemListOne)
      return (
        <div>
          <div className="weightLine"></div>
          <div style={CategoryStyle.box}>
            <div ref="container" style={CategoryStyle.boxIn}>
              {
                this.props.itemListOne.map((item, i) => {
                  let colorChoosen = {};
                  if (this.state.isChoosenOne === i) {
                    colorChoosen = {
                      // IE滤镜，透明度50%
                      filter: 'alpha(opacity=100)',
                      // Firefox私有，透明度50%
                      MozOpacity: 1,
                      // 其他，透明度50%
                      opacity: 1
                    };
                  }
                  return (
                    <a
                      key={i}
                      data-index={i}
                      style={Object.assign({}, CategoryStyle.item, colorChoosen)}
                      onClick={this.clickChangeOne}
                    >
                      {item.name}
                    </a>
                  );
                })
              }
            </div>
          </div>
          <div style={CategoryStyle.box}>
            <div ref="container2" style={CategoryStyle.boxIn}>
              {
                this.props.itemListTwo.map((item, i) => {
                  let circleChoosen = {};
                  if (this.state.isChoosenTwo === i) {
                    circleChoosen = {
                      // IE滤镜，透明度50%
                      filter: 'alpha(opacity=100)',
                      // Firefox私有，透明度50%
                      MozOpacity: 1,
                      // 其他，透明度50%
                      opacity: 1,
                      borderWidth: '0.026667rem',
                      borderStyle: 'solid',
                      borderRadius: '0.266667rem',
                      display: 'table'
                    };
                  }
                  return (
                    <a
                      key={i}
                      data-index={i}
                      style={Object.assign({}, CategoryStyle.littleItem, circleChoosen)}
                      onClick={this.clickChangeTwo}
                    >
                      {item.name}
                    </a>
                  );
                })
              }
            </div>
          </div>
          <div className="weightLine"></div>
        </div>
      );
    }
  }
  Category.propTypes = {
    itemListOne: React.PropTypes.array,
    itemListTwo: React.PropTypes.array,
    handleChangeDataOne: React.PropTypes.func,
    handleChangeDataTwo: React.PropTypes.func
  };
  export default Category;