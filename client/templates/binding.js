module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h2"));
    __runtime.text("1. Two Way Binding");
    __runtime.pop();
    __runtime.push(document.createElement("h3"));
    __runtime.text(this.name);
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.classes("first");
    __runtime.attribute("type", "text");
    __runtime.attribute("value", this.first);
    __runtime.attribute("placeholder", "First name");
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.classes("last");
    __runtime.attribute("type", "text");
    __runtime.attribute("value", this.last);
    __runtime.attribute("placeholder", "Last name");
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
};
