var Crumb = React.createClass({displayName: "Crumb",
  activate: function() {
    this.props.onSelected(this.props.idx);
  },
  onKeyPress: function(event) {
    if (event.nativeEvent.which == 13) {
      this.activate();
    }
  },
  render: function() {
    return (
      React.createElement("span", {className: "crumb", tabIndex: "0", onKeyPress: this.onKeyPress, onClick: this.activate}, this.props.value)
    )
  }
});

var CrumbSeparator = React.createClass({displayName: "CrumbSeparator",
  render: function() {
    return (
      React.createElement("span", {className: "crumb-separator", title: this.props.tooltip}, this.props.value)
    )
  }
});

var Breadcrumbs = React.createClass({displayName: "Breadcrumbs",
  onSelected: function(idx) {
    if (idx < 0) {
      return;
    }
    var newPath = this.props.path.slice(0, idx + 1);

    if (newPath.join('/') != this.props.path.join('/')) {
      this.props.onChange(newPath);
    }
  },
  render: function() {
    var self = this;
    var path = this.props.path;
    var maxEntries = this.props.maxEntries || -1;
    var hasShortened = false;
    var crumbs = [];

    path.forEach(function(pathPart, idx) {

      //Skip path entries in the middle
      if ((maxEntries >= 1) && (idx >= maxEntries - 1) && (idx < path.length - 1)) {

        //Render the dots separator once
        if (!hasShortened) {
          var tooltipParts = path.slice(maxEntries - 1);

          tooltipParts.pop();
          crumbs.push(
            React.createElement(CrumbSeparator, {value: "...", key: idx, tooltip: tooltipParts.join(' > ')}),
            React.createElement(CrumbSeparator, {value: ">", key: path.length + idx})
          );
          hasShortened = true;
        }
        return;
      }
      crumbs.push(
        React.createElement(Crumb, {idx: idx, value: pathPart, key: idx, onSelected: self.onSelected})
      );
      if (idx != path.length - 1) {
        crumbs.push(
          React.createElement(CrumbSeparator, {value: ">", key: path.length + idx})
        );
      }
    });

    return (
      React.createElement("div", {className: "breadcrumbs"}, 
        crumbs
      )
    );
  }
});