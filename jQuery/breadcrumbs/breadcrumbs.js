(function ($) {

  $.fn.breadcrumbs = function(options) {
    var self = this;

    options = $.extend({
      maxEntries: -1,
      path: []
    }, options);

    var maxEntries = options.maxEntries;
    var path = options.path;

    var $container = $('<div></div>').attr('class', 'breadcrumbs').appendTo(self);
    $container.on('click', '.crumb', function(event) {
      activateCrumb(self, $(event.target));
    }).on('keypress', '.crumb', function(event) {
      if (event.which == 13) {
        activateCrumb(self, $(event.target));
      }
    });
    renderPath(this, path);

    this.on('setPath', function(event, newPath) {
      path = newPath;
      renderPath(this, path);
    });

    function activateCrumb(self, $crumb) {
      var idx = parseInt($crumb.attr('idx'));
      var newPath = path.slice(0, idx + 1);

      if (newPath.join('/') != path.join('/')) {
        self.trigger('pathChange', [newPath]);
      }
    }

    function renderPath(self, path) {
      var renderedDotsSeparator = false;

      $container.empty();
      path.forEach(function(pathPart, idx) {

        //Skip path entries in the middle
        if ((maxEntries >= 1) && (idx >= maxEntries - 1) && (idx < path.length - 1)) {

          //Render the dots separator once
          if (!renderedDotsSeparator) {
            createDotsSeparator(path, maxEntries).appendTo($container);
            createCrumbSeparator().appendTo($container);
            renderedDotsSeparator = true;
          }
          return;
        }

        createCrumb(pathPart, idx).appendTo($container);
        if (idx != path.length - 1) {
          createCrumbSeparator().appendTo($container);
        }
      });
    }

    function createDotsSeparator(path, maxEntries) {
      var $crumbSeparator = $('<span></span>');
      var tooltipParts = path.slice(maxEntries - 1);

      tooltipParts.pop();

      var tooltip = tooltipParts.join(' > ');

      return $crumbSeparator.attr('class', 'crumb-separator')
        .attr('title', tooltip).text('...');
    }

    function createCrumb(pathPart, idx) {
      return $('<span></span>').attr('class', 'crumb')
        .attr('tabindex', '0').attr('idx', idx).text(pathPart);
    }

    function createCrumbSeparator() {
      return $('<span></span>').attr('class', 'crumb-separator').text('>');
    }

    return this;
  };
}(jQuery));