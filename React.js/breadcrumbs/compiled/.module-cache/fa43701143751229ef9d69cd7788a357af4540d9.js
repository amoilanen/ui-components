var BreadcrumbsDemo = React.createClass({displayName: "BreadcrumbsDemo",
  getContent: function(path) {
    return path[path.length - 1];
  },
  getInitialState: function() {
    return {
      path: this.props.path
    };
  },
  onPathChange: function(value) {
    this.setState({
      path: value
    });
  },
  reset: function() {
    this.setState({
      path: this.props.path
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {id: "breadcrumb-container"}, 
          React.createElement(Breadcrumbs, {path: this.state.path, maxEntries: "5", onChange: this.onPathChange})
        ), 
        React.createElement("div", {id: "content"}, this.getContent(this.state.path)), 
        React.createElement("button", {id: "resetButton", onClick: this.reset}, "Reset")
      )
    )
  }
});

var fullPath = ['element1', 'element2', 'element3', 'element4', 'element5', 'element6', 'element7'];

React.render(
  React.createElement(BreadcrumbsDemo, {path: fullPath}),
  document.querySelector('#container')
);