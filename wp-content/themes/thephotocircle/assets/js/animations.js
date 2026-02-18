(function () {
  // Stagger animations — apply incremental delays to animated descendants
  // of .bweib-stagger containers. Uses inline styles so they aren't reset
  // by the animation shorthand on each element's class.
  var animationSelector = [
    '.bweib-fade-in',
    '.bweib-fade-in-up',
    '.bweib-fade-in-down',
    '.bweib-fade-in-left',
    '.bweib-fade-in-right',
    '.bweib-scale-in'
  ].join(',');

  function initStagger() {
    document.querySelectorAll('.bweib-stagger').forEach(function (parent) {
      var children = parent.querySelectorAll(animationSelector);
      children.forEach(function (child, i) {
        child.style.animationDelay = (i + 1) * 0.1 + 's';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStagger);
  } else {
    initStagger();
  }
})();
