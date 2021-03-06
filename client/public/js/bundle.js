(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var binding, hello, todos;

hello = require('./coffee/hello');

binding = require('./coffee/binding');

todos = require('./coffee/todos');

hello.init();

binding.init();

todos.init();


},{"./coffee/binding":2,"./coffee/hello":3,"./coffee/todos":4}],2:[function(require,module,exports){
var Observable, bindingTemplate, model;

bindingTemplate = require('../templates/binding');

Observable = require('o_0');

model = {
  name: function() {
    return this.first() + ' ' + this.last();
  },
  first: Observable('Prince'),
  last: Observable('Hamlet')
};

exports.init = function() {
  var view;
  view = document.getElementById('binding');
  return view.appendChild(bindingTemplate(model));
};


},{"../templates/binding":5,"o_0":9}],3:[function(require,module,exports){
var data, helloTemplate;

helloTemplate = require('../templates/hello');

data = {
  title: 'Buenos Dias, Hamlet!'
};

exports.init = function() {
  var view;
  view = document.getElementById('hello');
  return view.appendChild(helloTemplate(data));
};


},{"../templates/hello":6}],4:[function(require,module,exports){
var Observable, checkCompleteAll, collection, model, todoTemplate;

todoTemplate = require('../templates/todos');

Observable = require('o_0');

collection = Observable([]);

checkCompleteAll = Observable(false);

checkCompleteAll.observe(function(val) {
  return collection.forEach(function(i) {
    return i.checked(val);
  });
});

model = {
  value: Observable(''),
  todos: collection,
  checkCompleteAll: checkCompleteAll,
  done: function() {
    return this.todos.filter(function(todo) {
      return todo.checked();
    });
  },
  undone: function() {
    return this.todos.filter(function(todo) {
      return !todo.checked();
    });
  },
  doneCount: function() {
    return this.done().length;
  },
  undoneCount: function() {
    return this.undone().length;
  },
  removeDone: function() {
    this.done().forEach(collection.remove);
    return this.checkCompleteAll(false);
  },
  add: function(e) {
    var todo;
    if (e.keyCode !== 13) {
      return;
    }
    if (this.value() === '') {
      return;
    }
    todo = {
      description: this.value(),
      checked: Observable(false),
      "class": function() {
        if (todo.checked()) {
          return 'completed';
        }
      }
    };
    this.todos.push(todo);
    return this.value('');
  }
};

exports.init = function() {
  var view;
  view = document.getElementById('todo');
  return view.appendChild(todoTemplate(model));
};


},{"../templates/todos":7,"o_0":9}],5:[function(require,module,exports){
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

},{"hamlet-runtime":8}],6:[function(require,module,exports){
module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h1"));
    __runtime.text(this.title);
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
};

},{"hamlet-runtime":8}],7:[function(require,module,exports){
module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h2"));
    __runtime.text("2. To Do List");
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("type", "text");
    __runtime.attribute("value", this.value);
    __runtime.attribute("placeholder", "What needs to be done?");
    __runtime.attribute("onkeydown", this.add);
    __runtime.pop();
    __runtime.push(document.createElement("label"));
    __runtime.classes("mark");
    __runtime.push(document.createElement("input"));
    __runtime.attribute("type", "checkbox");
    __runtime.attribute("checked", this.checkCompleteAll);
    __runtime.pop();
    __runtime.push(document.createElement("span"));
    __runtime.classes("mark");
    __runtime.text("Mark all as complete\n");
    __runtime.pop();
    __runtime.pop();
    __runtime.push(document.createElement("ul"));
    __runtime.classes("list");
    __runtime.each(this.todos, function() {
      __runtime.push(document.createElement("li"));
      __runtime.push(document.createElement("label"));
      __runtime.push(document.createElement("input"));
      __runtime.attribute("type", "checkbox");
      __runtime.attribute("checked", this.checked);
      __runtime.pop();
      __runtime.push(document.createElement("span"));
      __runtime.classes("item", this["class"]);
      __runtime.text(this.description);
      __runtime.pop();
      __runtime.pop();
      return __runtime.pop();
    });
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("totals");
    __runtime.push(document.createElement("div"));
    __runtime.classes("undone");
    __runtime.push(document.createElement("span"));
    __runtime.classes("count");
    __runtime.text(this.undoneCount);
    __runtime.pop();
    __runtime.text("left\n");
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("clear");
    __runtime.attribute("click", this.removeDone);
    __runtime.text("Clear\n");
    __runtime.push(document.createElement("span"));
    __runtime.classes("count");
    __runtime.text(this.doneCount);
    __runtime.pop();
    __runtime.text("items\n");
    __runtime.pop();
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
};

},{"hamlet-runtime":8}],8:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var Observable, Runtime, bindEvent, bindObservable, cleanup, contentBind, empty, eventNames, initContent, isEvent, isFragment, remove, specialBindings, valueBind, valueIndexOf,
    __slice = [].slice;

  Observable = require("o_0");

  eventNames = "abort\nblur\nchange\nclick\ndblclick\ndrag\ndragend\ndragenter\ndragleave\ndragover\ndragstart\ndrop\nerror\nfocus\ninput\nkeydown\nkeypress\nkeyup\nload\nmousedown\nmousemove\nmouseout\nmouseover\nmouseup\nreset\nresize\nscroll\nselect\nsubmit\ntouchcancel\ntouchend\ntouchenter\ntouchleave\ntouchmove\ntouchstart\nunload".split("\n");

  isEvent = function(name) {
    return eventNames.indexOf(name) !== -1;
  };

  isFragment = function(node) {
    return (node != null ? node.nodeType : void 0) === 11;
  };

  initContent = function(element) {
    var allContent, update;
    if (element._hamlet_content) {
      return element._hamlet_content;
    }
    allContent = (element._hamlet_content != null ? element._hamlet_content : element._hamlet_content = Observable.concat());
    update = function() {
      empty(element);
      return allContent.each(function(item) {
        return element.appendChild(item);
      });
    };
    bindObservable(element, allContent, null, update);
    return allContent;
  };

  contentBind = function(element, value) {
    initContent(element).push(value);
    return element;
  };

  valueBind = function(element, value, context) {
    var update;
    value = Observable(value, context);
    switch (element.nodeName) {
      case "SELECT":
        element.oninput = element.onchange = function() {
          var optionValue, _ref, _value;
          _ref = this.children[this.selectedIndex], optionValue = _ref.value, _value = _ref._value;
          return value(_value || optionValue);
        };
        update = function(newValue) {
          var options;
          element._value = newValue;
          if ((options = element._options)) {
            if (newValue.value != null) {
              return element.value = (typeof newValue.value === "function" ? newValue.value() : void 0) || newValue.value;
            } else {
              return element.selectedIndex = valueIndexOf(options, newValue);
            }
          } else {
            return element.value = newValue;
          }
        };
        bindObservable(element, value, context, update);
        break;
      default:
        element.oninput = element.onchange = function() {
          return value(element.value);
        };
        bindObservable(element, value, context, function(newValue) {
          if (element.value !== newValue) {
            return element.value = newValue;
          }
        });
    }
  };

  specialBindings = {
    INPUT: {
      checked: function(element, value, context) {
        element.onchange = function() {
          return typeof value === "function" ? value(element.checked) : void 0;
        };
        return bindObservable(element, value, context, function(newValue) {
          return element.checked = newValue;
        });
      }
    },
    SELECT: {
      options: function(element, values, context) {
        var updateValues;
        values = Observable(values, context);
        updateValues = function(values) {
          empty(element);
          element._options = values;
          return values.map(function(value, index) {
            var option, optionName, optionValue;
            option = document.createElement("option");
            option._value = value;
            if (typeof value === "object") {
              optionValue = (value != null ? value.value : void 0) || index;
            } else {
              optionValue = value.toString();
            }
            bindObservable(option, optionValue, value, function(newValue) {
              return option.value = newValue;
            });
            optionName = (value != null ? value.name : void 0) || value;
            bindObservable(option, optionName, value, function(newValue) {
              return option.textContent = newValue;
            });
            element.appendChild(option);
            if (value === element._value) {
              element.selectedIndex = index;
            }
            return option;
          });
        };
        return bindObservable(element, values, context, updateValues);
      }
    }
  };

  bindObservable = function(element, value, context, update) {
    var observable, observe, unobserve;
    observable = Observable(value, context);
    observe = function() {
      observable.observe(update);
      return update(observable());
    };
    unobserve = function() {
      return observable.stopObserving(update);
    };
    observe();
    (element._hamlet_cleanup || (element._hamlet_cleanup = [])).push(unobserve);
    return element;
  };

  bindEvent = function(element, name, fn, context) {
    return element[name] = function() {
      return fn.apply(context, arguments);
    };
  };

  cleanup = function(element) {
    var _ref;
    Array.prototype.forEach.call(element.children, cleanup);
    if ((_ref = element._hamlet_cleanup) != null) {
      _ref.forEach(function(method) {
        return method();
      });
    }
    delete element._hamlet_cleanup;
  };

  Runtime = function(context) {
    var append, buffer, classes, contextTop, id, lastParent, observeAttribute, observeText, pop, push, render, self, stack, top, withContext;
    stack = [];
    lastParent = function() {
      var element, i;
      i = stack.length - 1;
      while ((element = stack[i]) && isFragment(element)) {
        i -= 1;
      }
      return element;
    };
    contextTop = void 0;
    top = function() {
      return stack[stack.length - 1] || contextTop;
    };
    append = function(child) {
      var parent, _ref;
      parent = top();
      if (isFragment(child) && child.childNodes.length === 1) {
        child = child.childNodes[0];
      }
      if ((_ref = top()) != null) {
        _ref.appendChild(child);
      }
      return child;
    };
    push = function(child) {
      return stack.push(child);
    };
    pop = function() {
      return append(stack.pop());
    };
    render = function(child) {
      push(child);
      return pop();
    };
    id = function() {
      var element, sources, update, value;
      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      element = top();
      update = function(newValue) {
        if (typeof newValue === "function") {
          newValue = newValue();
        }
        return element.id = newValue;
      };
      value = function() {
        var possibleValues;
        possibleValues = sources.map(function(source) {
          if (typeof source === "function") {
            return source();
          } else {
            return source;
          }
        }).filter(function(idValue) {
          return idValue != null;
        });
        return possibleValues[possibleValues.length - 1];
      };
      return bindObservable(element, value, context, update);
    };
    classes = function() {
      var element, sources, update;
      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      element = top();
      update = function(newValue) {
        if (typeof newValue === "function") {
          newValue = newValue();
        }
        return element.className = newValue;
      };
      return (function(context) {
        var value;
        value = function() {
          var possibleValues;
          possibleValues = sources.map(function(source) {
            if (typeof source === "function") {
              return source.call(context);
            } else {
              return source;
            }
          }).filter(function(sourceValue) {
            return sourceValue != null;
          });
          return possibleValues.join(" ");
        };
        return bindObservable(element, value, context, update);
      })(context);
    };
    observeAttribute = function(name, value) {
      var binding, element, nodeName, _ref;
      element = top();
      nodeName = element.nodeName;
      if (name === "value") {
        valueBind(element, value);
      } else if (binding = (_ref = specialBindings[nodeName]) != null ? _ref[name] : void 0) {
        binding(element, value, context);
      } else if (name.match(/^on/) && isEvent(name.substr(2))) {
        bindEvent(element, name, value, context);
      } else if (isEvent(name)) {
        bindEvent(element, "on" + name, value, context);
      } else {
        bindObservable(element, value, context, function(newValue) {
          if ((newValue != null) && newValue !== false) {
            return element.setAttribute(name, newValue);
          } else {
            return element.removeAttribute(name);
          }
        });
      }
      return element;
    };
    observeText = function(value) {
      var element, update;
      element = document.createTextNode('');
      update = function(newValue) {
        return element.nodeValue = newValue;
      };
      bindObservable(element, value, context, update);
      return render(element);
    };
    withContext = function(newContext, newContextTop, fn) {
      var oldContext;
      oldContext = context;
      context = newContext;
      contextTop = newContextTop;
      try {
        return fn();
      } finally {
        contextTop = void 0;
        context = oldContext;
      }
    };
    buffer = function(value) {
      var _ref, _ref1, _ref2;
      value = Observable(value, context);
      switch ((_ref = value()) != null ? _ref.nodeType : void 0) {
        case 1:
        case 3:
        case 11:
          contentBind(top(), value);
          return value();
      }
      switch ((_ref1 = value()) != null ? (_ref2 = _ref1[0]) != null ? _ref2.nodeType : void 0 : void 0) {
        case 1:
        case 3:
        case 11:
          return contentBind(top(), value);
      }
      return observeText(value);
    };
    self = {
      push: push,
      pop: pop,
      id: id,
      classes: classes,
      attribute: observeAttribute,
      text: buffer,
      filter: function(name, content) {},
      each: function(items, fn) {
        var elements, parent, replace;
        items = Observable(items, context);
        elements = null;
        parent = lastParent();
        items.observe(function() {
          return replace(elements);
        });
        replace = function(oldElements) {
          elements = [];
          items.each(function(item, index, array) {
            var element;
            element = null;
            withContext(item, parent, function() {
              return element = fn.call(item, item, index, array);
            });
            if (isFragment(element)) {
              elements.push.apply(elements, element.childNodes);
            } else {
              elements.push(element);
            }
            parent.appendChild(element);
            return element;
          });
          return oldElements != null ? oldElements.forEach(remove) : void 0;
        };
        return replace(null, items);
      }
    };
    return self;
  };

  Runtime.Observable = Observable;

  module.exports = Runtime;

  empty = function(node) {
    var child, _results;
    _results = [];
    while (child = node.firstChild) {
      _results.push(node.removeChild(child));
    }
    return _results;
  };

  valueIndexOf = function(options, value) {
    if (typeof value === "object") {
      return options.indexOf(value);
    } else {
      return options.map(function(option) {
        return option.toString();
      }).indexOf(value.toString());
    }
  };

  remove = function(element) {
    var _ref;
    cleanup(element);
    if ((_ref = element.parentNode) != null) {
      _ref.removeChild(element);
    }
  };

}).call(this);

},{"o_0":9}],9:[function(require,module,exports){
(function (global){
!function(){var Observable,autoDeps,computeDependencies,copy,extend,flatten,get,last,magicDependency,remove,splat,withBase,__slice=[].slice;Observable=function(value,context){var changed,fn,listeners,notify,notifyReturning,self;if(typeof(value!=null?value.observe:void 0)==="function"){return value}listeners=[];notify=function(newValue){return copy(listeners).forEach(function(listener){return listener(newValue)})};if(typeof value==="function"){fn=value;self=function(){magicDependency(self);return value};self.each=function(){var args,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);return(_ref=splat(value)).forEach.apply(_ref,args)};changed=function(){value=computeDependencies(self,fn,changed,context);return notify(value)};value=computeDependencies(self,fn,changed,context)}else{self=function(newValue){if(arguments.length>0){if(value!==newValue){value=newValue;notify(newValue)}}else{magicDependency(self)}return value}}self.each=function(){var args,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);if(value!=null){return(_ref=[value]).forEach.apply(_ref,args)}};if(Array.isArray(value)){["concat","every","filter","forEach","indexOf","join","lastIndexOf","map","reduce","reduceRight","slice","some"].forEach(function(method){return self[method]=function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);return value[method].apply(value,args)}});["pop","push","reverse","shift","splice","sort","unshift"].forEach(function(method){return self[method]=function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return notifyReturning(value[method].apply(value,args))}});notifyReturning=function(returnValue){notify(value);return returnValue};extend(self,{each:function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];self.forEach.apply(self,args);return self},remove:function(object){var index;index=value.indexOf(object);if(index>=0){return notifyReturning(value.splice(index,1)[0])}},get:function(index){return value[index]},first:function(){return value[0]},last:function(){return value[value.length-1]}})}extend(self,{listeners:listeners,observe:function(listener){return listeners.push(listener)},stopObserving:function(fn){return remove(listeners,fn)},toggle:function(){return self(!value)},increment:function(n){return self(value+n)},decrement:function(n){return self(value-n)},toString:function(){return"Observable("+value+")"}});return self};Observable.concat=function(){var args,o;args=1<=arguments.length?__slice.call(arguments,0):[];args=Observable(args);o=Observable(function(){return flatten(args.map(splat))});o.push=args.push;return o};module.exports=Observable;extend=function(){var name,source,sources,target,_i,_len;target=arguments[0],sources=2<=arguments.length?__slice.call(arguments,1):[];for(_i=0,_len=sources.length;_i<_len;_i++){source=sources[_i];for(name in source){target[name]=source[name]}}return target};global.OBSERVABLE_ROOT_HACK=[];autoDeps=function(){return last(global.OBSERVABLE_ROOT_HACK)};magicDependency=function(self){var observerStack;if(observerStack=autoDeps()){return observerStack.push(self)}};withBase=function(self,update,fn){var deps,value,_ref;global.OBSERVABLE_ROOT_HACK.push(deps=[]);try{value=fn();if((_ref=self._deps)!=null){_ref.forEach(function(observable){return observable.stopObserving(update)})}self._deps=deps;deps.forEach(function(observable){return observable.observe(update)})}finally{global.OBSERVABLE_ROOT_HACK.pop()}return value};computeDependencies=function(self,fn,update,context){return withBase(self,update,function(){return fn.call(context)})};remove=function(array,value){var index;index=array.indexOf(value);if(index>=0){return array.splice(index,1)[0]}};copy=function(array){return array.concat([])};get=function(arg){if(typeof arg==="function"){return arg()}else{return arg}};splat=function(item){var result,results;results=[];if(typeof item.forEach==="function"){item.forEach(function(i){return results.push(i)})}else{result=get(item);if(result!=null){results.push(result)}}return results};last=function(array){return array[array.length-1]};flatten=function(array){return array.reduce(function(a,b){return a.concat(b)},[])}}.call(this);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])