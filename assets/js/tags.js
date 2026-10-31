/* Styles #hashtags inside entries as small chips. Plain text only; no links, no dependencies. */
(function () {
  'use strict';
  var re = /(^|\s)(#[\p{L}\p{N}_]+)/gu;
  var bodies = document.querySelectorAll('.entry__body');
  Array.prototype.forEach.call(bodies, function (body) {
    var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || p.closest('a, code, pre, h1, h2, h3, h4, h5, h6')) return NodeFilter.FILTER_REJECT;
        return /#[\p{L}\p{N}_]/u.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var text = node.nodeValue, last = 0, m, frag = document.createDocumentFragment(), hit = false;
      re.lastIndex = 0;
      while ((m = re.exec(text))) {
        hit = true;
        var start = m.index + m[1].length;
        frag.appendChild(document.createTextNode(text.slice(last, start)));
        var span = document.createElement('span');
        span.className = 'tag';
        span.textContent = m[2];
        frag.appendChild(span);
        last = start + m[2].length;
      }
      if (hit) {
        frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      }
    });
  });
})();
