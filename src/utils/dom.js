export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export const offsetTop = function(element) {
  const offsetParent = element.offsetParent;
  return element.offsetTop + (offsetParent ? offsetTop(offsetParent) : 0);
};

export const isVisible = function(ele, offset = 0, target = window) {
  const element = window.document.documentElement;
  const offsetTopN = offsetTop(ele);
  const viewTop = target.scrollTop || window.pageYOffset;
  const elClientHeight = ele.clientHeight;
  const innerHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewBottom =
    viewTop + Math.min(element.clientHeight, innerHeight) - offset;
  const bottom = offsetTopN + elClientHeight;
  return offsetTopN <= viewBottom && bottom >= viewTop;
};
