import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
function patchLeafletMarker(L) {
  const Icon = L.Icon;
  const IconDefault = Icon.Default;

  function getStyle(el, style) {
    var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

    if ((!value || value === "auto") && document.defaultView) {
      var css = document.defaultView.getComputedStyle(el, null);
      value = css ? css[style] : null;
    }
    return value === "auto" ? null : value;
  }

  function create$1(tagName, className, container) {
    var el = document.createElement(tagName);
    el.className = className || "";

    if (container) {
      container.appendChild(el);
    }
    return el;
  }

  IconDefault.prototype._getIconUrl = function(name) {
    if (!IconDefault.imagePath) {
      // Deprecated, backwards-compatibility only
      var path = this._detectIconPath(name);
      // Compatible with webpack
      // Don't attach data url onto IconDefault.imagePath
      if (path.indexOf("data:image/") === 0) {
        return path;
      }
      IconDefault.imagePath = path;
    }

    // @option imagePath: String
    // `Icon.Default` will try to auto-detect the location of the
    // blue icon images. If you are placing these images in a non-standard
    // way, set this option to point to the right path.
    return (
      (this.options.imagePath || IconDefault.imagePath) +
      Icon.prototype._getIconUrl.call(this, name)
    );
  };

  IconDefault.prototype._detectIconPath = function(name) {
    const el = create$1("div", "leaflet-default-marker-" + name, document.body);
    let path =
      getStyle(el, "background-image") || getStyle(el, "backgroundImage"); // IE8

    document.body.removeChild(el);

    if (path === null || path.indexOf("url") !== 0) {
      path = "";
    } else {
      // Compatible with webpack
      path = path.replace(
        /^url\((["']?)(.+?)(marker-(icon|shadow)\.png)?\1\)/,
        "$2"
      );
    }

    return path;
  };

  // CSS
  const css = [
    `.leaflet-default-marker-icon {background-image: url(${markerIcon});}`,
    `.leaflet-default-marker-icon-2x {background-image: url(${markerIcon2x});}`,
    `.leaflet-default-marker-shadow {background-image: url(${markerShadow});}`
  ].join("\n");
  const style = create$1("style", null, document.head);
  style.setAttribute("data-type", "leaflet-marker-patch");
  style.appendChild(document.createTextNode(css));
}
export default patchLeafletMarker;
