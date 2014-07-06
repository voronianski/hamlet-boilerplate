module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h2"));
    __runtime.text(this.name);
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("value", this.first);
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("value", this.last);
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
};
