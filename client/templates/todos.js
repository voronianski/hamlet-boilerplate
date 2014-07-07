module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h2"));
    __runtime.text("Todos by Hamlet\n");
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("type", "text");
    __runtime.attribute("value", this.value);
    __runtime.attribute("placeholder", "What needs to be done?");
    __runtime.attribute("onkeydown", this.add);
    __runtime.pop();
    __runtime.push(document.createElement("ul"));
    __runtime.each(this.todos, function() {
      __runtime.push(document.createElement("li"));
      __runtime.text(this.description);
      return __runtime.pop();
    });
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
};
