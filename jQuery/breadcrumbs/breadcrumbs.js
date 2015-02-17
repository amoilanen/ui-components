(function ($) {

  $.fn.breadcrumbs = function(options) {
    options = $.extend({
      maxEntries: -1,
      path: []
    }, options);

    var maxEntries = options.maxEntries;
    var path = options.path;

    function activateCrumb(self, crumb) {
      var idx = parseInt(crumb.getAttribute('idx'));
      var newPath = self.path.slice(0, idx + 1);

      if (newPath.join('/') != self.path.join('/')) {
        var event = new CustomEvent('pathChange', {
          'detail': newPath
        });
        self.dispatchEvent(event);
      }
    }

    function renderPath(self, path) {
      var renderedDotsSeparator = false;

      while(self.container.firstChild) {
        self.container.removeChild(self.container.firstChild);
      }
      path.forEach(function(pathPart, idx) {

        //Skip path entries in the middle
        if ((maxEntries >= 1) && (idx >= maxEntries - 1) && (idx < path.length - 1)) {

          //Render the dots separator once
          if (!renderedDotsSeparator) {
            self.container.appendChild(createDotsSeparator(path, maxEntries));
            self.container.appendChild(createCrumbSeparator());
            renderedDotsSeparator = true;
          }
          return;
        }

        self.container.appendChild(createCrumb(pathPart, idx));
        if (idx != path.length - 1) {
          self.container.appendChild(createCrumbSeparator());
        }
      });
    }

    function createDotsSeparator(path, maxEntries) {
      var crumbSeparator = document.createElement('span');
      var tooltipParts = path.slice(maxEntries - 1);

      tooltipParts.pop();

      var tooltip = tooltipParts.join(' > ');

      crumbSeparator.appendChild(document.createTextNode('...'));
      crumbSeparator.setAttribute('class', 'crumb-separator');
      crumbSeparator.setAttribute('title', tooltip);
      return crumbSeparator;
    }

    function createCrumb(pathPart, idx) {
      var crumb = document.createElement('span');

      crumb.setAttribute('class', 'crumb');
      crumb.setAttribute('tabindex', '0');
      crumb.setAttribute('idx', idx);
      crumb.appendChild(document.createTextNode(pathPart));
      return crumb;
    }

    function createCrumbSeparator() {
      var crumbSeparator = document.createElement('span');

      crumbSeparator.appendChild(document.createTextNode('>'));
      crumbSeparator.setAttribute('class', 'crumb-separator');
      return crumbSeparator;
    }

    function created(self) {
      self.container = $('<div></div>').attr('class', 'breadcrumbs');
      self.container.appendTo(self);
      self.container = self.container[0];
      self.container.addEventListener('click', function(event) {
        if (event.target.getAttribute('class') === 'crumb') {
          activateCrumb(self, event.target);
        }
      }, false);
      self.container.addEventListener('keypress', function(event) {
        if ((event.target.getAttribute('class') === 'crumb') && (event.which == 13)) {
          activateCrumb(self, event.target);
        }
      }, false);
      renderPath(self, path);
    };

    created(this);
    return this;
  };
}(jQuery));