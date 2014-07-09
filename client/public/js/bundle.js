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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L2FwcC5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L2NvZmZlZS9iaW5kaW5nLmNvZmZlZSIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9jbGllbnQvY29mZmVlL2hlbGxvLmNvZmZlZSIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9jbGllbnQvY29mZmVlL3RvZG9zLmNvZmZlZSIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9jbGllbnQvdGVtcGxhdGVzL2JpbmRpbmcuanMiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L3RlbXBsYXRlcy9oZWxsby5qcyIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9jbGllbnQvdGVtcGxhdGVzL3RvZG9zLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL25vZGVfbW9kdWxlcy9oYW1sZXQtcnVudGltZS9kaXN0L3J1bnRpbWUuanMiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvbm9kZV9tb2R1bGVzL29fMC9kaXN0L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHFCQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZ0JBQVIsQ0FBUixDQUFBOztBQUFBLE9BQ0EsR0FBVSxPQUFBLENB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hYQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaGVsbG8gPSByZXF1aXJlICcuL2NvZmZlZS9oZWxsbydcbmJpbmRpbmcgPSByZXF1aXJlICcuL2NvZmZlZS9iaW5kaW5nJ1xudG9kb3MgPSByZXF1aXJlICcuL2NvZmZlZS90b2RvcydcblxuaGVsbG8uaW5pdCgpXG5iaW5kaW5nLmluaXQoKVxudG9kb3MuaW5pdCgpXG4iLCIjIHNpbXBsZSAyLXdheSBkYXRhIGJpbmRpbmcgZXhhbXBsZVxuXG5iaW5kaW5nVGVtcGxhdGUgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvYmluZGluZydcbk9ic2VydmFibGUgPSByZXF1aXJlICdvXzAnXG5cbm1vZGVsID1cblx0bmFtZTogLT5cblx0XHRAZmlyc3QoKSArICcgJyArIEBsYXN0KClcblx0Zmlyc3Q6IE9ic2VydmFibGUgJ1ByaW5jZSdcblx0bGFzdDogT2JzZXJ2YWJsZSAnSGFtbGV0J1xuXG5leHBvcnRzLmluaXQgPSAtPlxuXHR2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2JpbmRpbmcnXG5cdHZpZXcuYXBwZW5kQ2hpbGQgYmluZGluZ1RlbXBsYXRlKG1vZGVsKVxuIiwiIyBoZWxsbyB3b3JsZCBleGFtcGxlXG5cbmhlbGxvVGVtcGxhdGUgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvaGVsbG8nXG5cbmRhdGEgPVxuXHR0aXRsZTogJ0J1ZW5vcyBEaWFzLCBIYW1sZXQhJ1xuXG5leHBvcnRzLmluaXQgPSAtPlxuXHR2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2hlbGxvJ1xuXHR2aWV3LmFwcGVuZENoaWxkIGhlbGxvVGVtcGxhdGUoZGF0YSlcbiIsIiMgc2ltcGxlIHRvLWRvIGFwcCBleGFtcGxlXG5cbnRvZG9UZW1wbGF0ZSA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy90b2Rvcydcbk9ic2VydmFibGUgPSByZXF1aXJlICdvXzAnXG5cbmNvbGxlY3Rpb24gPSBPYnNlcnZhYmxlIFtdXG5cbmNoZWNrQ29tcGxldGVBbGwgPSBPYnNlcnZhYmxlIGZhbHNlXG5jaGVja0NvbXBsZXRlQWxsLm9ic2VydmUgKHZhbCkgLT5cblx0Y29sbGVjdGlvbi5mb3JFYWNoIChpKSAtPlxuXHRcdGkuY2hlY2tlZCh2YWwpXG5cbm1vZGVsID1cblx0dmFsdWU6IE9ic2VydmFibGUgJydcblx0dG9kb3M6IGNvbGxlY3Rpb25cblx0Y2hlY2tDb21wbGV0ZUFsbDogY2hlY2tDb21wbGV0ZUFsbFxuXG5cdGRvbmU6IC0+XG5cdFx0QHRvZG9zLmZpbHRlciAodG9kbykgLT5cblx0XHRcdHRvZG8uY2hlY2tlZCgpXG5cblx0dW5kb25lOiAtPlxuXHRcdEB0b2Rvcy5maWx0ZXIgKHRvZG8pIC0+XG5cdFx0XHQhdG9kby5jaGVja2VkKClcblxuXHRkb25lQ291bnQ6IC0+XG5cdFx0QGRvbmUoKS5sZW5ndGhcblxuXHR1bmRvbmVDb3VudDogLT5cblx0XHRAdW5kb25lKCkubGVuZ3RoXG5cblx0cmVtb3ZlRG9uZTogLT5cblx0XHRAZG9uZSgpLmZvckVhY2ggY29sbGVjdGlvbi5yZW1vdmVcblx0XHRAY2hlY2tDb21wbGV0ZUFsbChmYWxzZSlcblxuXHRhZGQ6IChlKSAtPlxuXHRcdHJldHVybiB1bmxlc3MgZS5rZXlDb2RlIGlzIDEzXG5cdFx0cmV0dXJuIHVubGVzcyBAdmFsdWUoKSBpc250ICcnXG5cblx0XHR0b2RvID1cblx0XHRcdGRlc2NyaXB0aW9uOiBAdmFsdWUoKVxuXHRcdFx0Y2hlY2tlZDogT2JzZXJ2YWJsZSBmYWxzZVxuXHRcdFx0Y2xhc3M6IC0+XG5cdFx0XHRcdCdjb21wbGV0ZWQnIGlmIHRvZG8uY2hlY2tlZCgpXG5cblx0XHRAdG9kb3MucHVzaCB0b2RvXG5cdFx0QHZhbHVlICcnXG5cblxuZXhwb3J0cy5pbml0ID0gLT5cblx0dmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICd0b2RvJ1xuXHR2aWV3LmFwcGVuZENoaWxkIHRvZG9UZW1wbGF0ZShtb2RlbClcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfX3J1bnRpbWU7XG4gICAgX19ydW50aW1lID0gcmVxdWlyZShcImhhbWxldC1ydW50aW1lXCIpKHRoaXMpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpKTtcbiAgICBfX3J1bnRpbWUudGV4dChcIjEuIFR3byBXYXkgQmluZGluZ1wiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICBfX3J1bnRpbWUudGV4dCh0aGlzLm5hbWUpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgIF9fcnVudGltZS5jbGFzc2VzKFwiZmlyc3RcIik7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aGlzLmZpcnN0KTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJGaXJzdCBuYW1lXCIpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgIF9fcnVudGltZS5jbGFzc2VzKFwibGFzdFwiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInZhbHVlXCIsIHRoaXMubGFzdCk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiTGFzdCBuYW1lXCIpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICB9KS5jYWxsKGRhdGEpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfX3J1bnRpbWU7XG4gICAgX19ydW50aW1lID0gcmVxdWlyZShcImhhbWxldC1ydW50aW1lXCIpKHRoaXMpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpKTtcbiAgICBfX3J1bnRpbWUudGV4dCh0aGlzLnRpdGxlKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgcmV0dXJuIF9fcnVudGltZS5wb3AoKTtcbiAgfSkuY2FsbChkYXRhKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgX19ydW50aW1lO1xuICAgIF9fcnVudGltZSA9IHJlcXVpcmUoXCJoYW1sZXQtcnVudGltZVwiKSh0aGlzKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgX19ydW50aW1lLnRleHQoXCIyLiBUbyBEbyBMaXN0XCIpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidmFsdWVcIiwgdGhpcy52YWx1ZSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiV2hhdCBuZWVkcyB0byBiZSBkb25lP1wiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwib25rZXlkb3duXCIsIHRoaXMuYWRkKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcIm1hcmtcIik7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJjaGVja2VkXCIsIHRoaXMuY2hlY2tDb21wbGV0ZUFsbCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcIm1hcmtcIik7XG4gICAgX19ydW50aW1lLnRleHQoXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVxcblwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgX19ydW50aW1lLmNsYXNzZXMoXCJsaXN0XCIpO1xuICAgIF9fcnVudGltZS5lYWNoKHRoaXMudG9kb3MsIGZ1bmN0aW9uKCkge1xuICAgICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpKTtcbiAgICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKSk7XG4gICAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJjaGVja2VkXCIsIHRoaXMuY2hlY2tlZCk7XG4gICAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICBfX3J1bnRpbWUuY2xhc3NlcyhcIml0ZW1cIiwgdGhpc1tcImNsYXNzXCJdKTtcbiAgICAgIF9fcnVudGltZS50ZXh0KHRoaXMuZGVzY3JpcHRpb24pO1xuICAgICAgX19ydW50aW1lLnBvcCgpO1xuICAgICAgX19ydW50aW1lLnBvcCgpO1xuICAgICAgcmV0dXJuIF9fcnVudGltZS5wb3AoKTtcbiAgICB9KTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgX19ydW50aW1lLmNsYXNzZXMoXCJ0b3RhbHNcIik7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgX19ydW50aW1lLmNsYXNzZXMoXCJ1bmRvbmVcIik7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgIF9fcnVudGltZS5jbGFzc2VzKFwiY291bnRcIik7XG4gICAgX19ydW50aW1lLnRleHQodGhpcy51bmRvbmVDb3VudCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS50ZXh0KFwibGVmdFxcblwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgX19ydW50aW1lLmNsYXNzZXMoXCJjbGVhclwiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVEb25lKTtcbiAgICBfX3J1bnRpbWUudGV4dChcIkNsZWFyXFxuXCIpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcImNvdW50XCIpO1xuICAgIF9fcnVudGltZS50ZXh0KHRoaXMuZG9uZUNvdW50KTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnRleHQoXCJpdGVtc1xcblwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIHJldHVybiBfX3J1bnRpbWUucG9wKCk7XG4gIH0pLmNhbGwoZGF0YSk7XG59O1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjcuMVxuKGZ1bmN0aW9uKCkge1xuICB2YXIgT2JzZXJ2YWJsZSwgUnVudGltZSwgYmluZEV2ZW50LCBiaW5kT2JzZXJ2YWJsZSwgY2xlYW51cCwgY29udGVudEJpbmQsIGVtcHR5LCBldmVudE5hbWVzLCBpbml0Q29udGVudCwgaXNFdmVudCwgaXNGcmFnbWVudCwgcmVtb3ZlLCBzcGVjaWFsQmluZGluZ3MsIHZhbHVlQmluZCwgdmFsdWVJbmRleE9mLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZTtcblxuICBPYnNlcnZhYmxlID0gcmVxdWlyZShcIm9fMFwiKTtcblxuICBldmVudE5hbWVzID0gXCJhYm9ydFxcbmJsdXJcXG5jaGFuZ2VcXG5jbGlja1xcbmRibGNsaWNrXFxuZHJhZ1xcbmRyYWdlbmRcXG5kcmFnZW50ZXJcXG5kcmFnbGVhdmVcXG5kcmFnb3ZlclxcbmRyYWdzdGFydFxcbmRyb3BcXG5lcnJvclxcbmZvY3VzXFxuaW5wdXRcXG5rZXlkb3duXFxua2V5cHJlc3NcXG5rZXl1cFxcbmxvYWRcXG5tb3VzZWRvd25cXG5tb3VzZW1vdmVcXG5tb3VzZW91dFxcbm1vdXNlb3Zlclxcbm1vdXNldXBcXG5yZXNldFxcbnJlc2l6ZVxcbnNjcm9sbFxcbnNlbGVjdFxcbnN1Ym1pdFxcbnRvdWNoY2FuY2VsXFxudG91Y2hlbmRcXG50b3VjaGVudGVyXFxudG91Y2hsZWF2ZVxcbnRvdWNobW92ZVxcbnRvdWNoc3RhcnRcXG51bmxvYWRcIi5zcGxpdChcIlxcblwiKTtcblxuICBpc0V2ZW50ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBldmVudE5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xO1xuICB9O1xuXG4gIGlzRnJhZ21lbnQgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIChub2RlICE9IG51bGwgPyBub2RlLm5vZGVUeXBlIDogdm9pZCAwKSA9PT0gMTE7XG4gIH07XG5cbiAgaW5pdENvbnRlbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIGFsbENvbnRlbnQsIHVwZGF0ZTtcbiAgICBpZiAoZWxlbWVudC5faGFtbGV0X2NvbnRlbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50Ll9oYW1sZXRfY29udGVudDtcbiAgICB9XG4gICAgYWxsQ29udGVudCA9IChlbGVtZW50Ll9oYW1sZXRfY29udGVudCAhPSBudWxsID8gZWxlbWVudC5faGFtbGV0X2NvbnRlbnQgOiBlbGVtZW50Ll9oYW1sZXRfY29udGVudCA9IE9ic2VydmFibGUuY29uY2F0KCkpO1xuICAgIHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgZW1wdHkoZWxlbWVudCk7XG4gICAgICByZXR1cm4gYWxsQ29udGVudC5lYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIGFsbENvbnRlbnQsIG51bGwsIHVwZGF0ZSk7XG4gICAgcmV0dXJuIGFsbENvbnRlbnQ7XG4gIH07XG5cbiAgY29udGVudEJpbmQgPSBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZSkge1xuICAgIGluaXRDb250ZW50KGVsZW1lbnQpLnB1c2godmFsdWUpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIHZhbHVlQmluZCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHVwZGF0ZTtcbiAgICB2YWx1ZSA9IE9ic2VydmFibGUodmFsdWUsIGNvbnRleHQpO1xuICAgIHN3aXRjaCAoZWxlbWVudC5ub2RlTmFtZSkge1xuICAgICAgY2FzZSBcIlNFTEVDVFwiOlxuICAgICAgICBlbGVtZW50Lm9uaW5wdXQgPSBlbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9wdGlvblZhbHVlLCBfcmVmLCBfdmFsdWU7XG4gICAgICAgICAgX3JlZiA9IHRoaXMuY2hpbGRyZW5bdGhpcy5zZWxlY3RlZEluZGV4XSwgb3B0aW9uVmFsdWUgPSBfcmVmLnZhbHVlLCBfdmFsdWUgPSBfcmVmLl92YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdmFsdWUoX3ZhbHVlIHx8IG9wdGlvblZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICB2YXIgb3B0aW9ucztcbiAgICAgICAgICBlbGVtZW50Ll92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGlmICgob3B0aW9ucyA9IGVsZW1lbnQuX29wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZSA9ICh0eXBlb2YgbmV3VmFsdWUudmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IG5ld1ZhbHVlLnZhbHVlKCkgOiB2b2lkIDApIHx8IG5ld1ZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHZhbHVlSW5kZXhPZihvcHRpb25zLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgdXBkYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbGVtZW50Lm9uaW5wdXQgPSBlbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlKGVsZW1lbnQudmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgc3BlY2lhbEJpbmRpbmdzID0ge1xuICAgIElOUFVUOiB7XG4gICAgICBjaGVja2VkOiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZSwgY29udGV4dCkge1xuICAgICAgICBlbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdmFsdWUoZWxlbWVudC5jaGVja2VkKSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmNoZWNrZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBTRUxFQ1Q6IHtcbiAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlcywgY29udGV4dCkge1xuICAgICAgICB2YXIgdXBkYXRlVmFsdWVzO1xuICAgICAgICB2YWx1ZXMgPSBPYnNlcnZhYmxlKHZhbHVlcywgY29udGV4dCk7XG4gICAgICAgIHVwZGF0ZVZhbHVlcyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICAgIGVtcHR5KGVsZW1lbnQpO1xuICAgICAgICAgIGVsZW1lbnQuX29wdGlvbnMgPSB2YWx1ZXM7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9uLCBvcHRpb25OYW1lLCBvcHRpb25WYWx1ZTtcbiAgICAgICAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICBvcHRpb24uX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgIG9wdGlvblZhbHVlID0gKHZhbHVlICE9IG51bGwgPyB2YWx1ZS52YWx1ZSA6IHZvaWQgMCkgfHwgaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvcHRpb25WYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5kT2JzZXJ2YWJsZShvcHRpb24sIG9wdGlvblZhbHVlLCB2YWx1ZSwgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvcHRpb25OYW1lID0gKHZhbHVlICE9IG51bGwgPyB2YWx1ZS5uYW1lIDogdm9pZCAwKSB8fCB2YWx1ZTtcbiAgICAgICAgICAgIGJpbmRPYnNlcnZhYmxlKG9wdGlvbiwgb3B0aW9uTmFtZSwgdmFsdWUsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb24udGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBlbGVtZW50Ll92YWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZXMsIGNvbnRleHQsIHVwZGF0ZVZhbHVlcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGJpbmRPYnNlcnZhYmxlID0gZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIHVwZGF0ZSkge1xuICAgIHZhciBvYnNlcnZhYmxlLCBvYnNlcnZlLCB1bm9ic2VydmU7XG4gICAgb2JzZXJ2YWJsZSA9IE9ic2VydmFibGUodmFsdWUsIGNvbnRleHQpO1xuICAgIG9ic2VydmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9ic2VydmFibGUub2JzZXJ2ZSh1cGRhdGUpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShvYnNlcnZhYmxlKCkpO1xuICAgIH07XG4gICAgdW5vYnNlcnZlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdG9wT2JzZXJ2aW5nKHVwZGF0ZSk7XG4gICAgfTtcbiAgICBvYnNlcnZlKCk7XG4gICAgKGVsZW1lbnQuX2hhbWxldF9jbGVhbnVwIHx8IChlbGVtZW50Ll9oYW1sZXRfY2xlYW51cCA9IFtdKSkucHVzaCh1bm9ic2VydmUpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIGJpbmRFdmVudCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGVsZW1lbnRbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgY2xlYW51cCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgX3JlZjtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsZW1lbnQuY2hpbGRyZW4sIGNsZWFudXApO1xuICAgIGlmICgoX3JlZiA9IGVsZW1lbnQuX2hhbWxldF9jbGVhbnVwKSAhPSBudWxsKSB7XG4gICAgICBfcmVmLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBtZXRob2QoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGUgZWxlbWVudC5faGFtbGV0X2NsZWFudXA7XG4gIH07XG5cbiAgUnVudGltZSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICB2YXIgYXBwZW5kLCBidWZmZXIsIGNsYXNzZXMsIGNvbnRleHRUb3AsIGlkLCBsYXN0UGFyZW50LCBvYnNlcnZlQXR0cmlidXRlLCBvYnNlcnZlVGV4dCwgcG9wLCBwdXNoLCByZW5kZXIsIHNlbGYsIHN0YWNrLCB0b3AsIHdpdGhDb250ZXh0O1xuICAgIHN0YWNrID0gW107XG4gICAgbGFzdFBhcmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsZW1lbnQsIGk7XG4gICAgICBpID0gc3RhY2subGVuZ3RoIC0gMTtcbiAgICAgIHdoaWxlICgoZWxlbWVudCA9IHN0YWNrW2ldKSAmJiBpc0ZyYWdtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgY29udGV4dFRvcCA9IHZvaWQgMDtcbiAgICB0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzdGFja1tzdGFjay5sZW5ndGggLSAxXSB8fCBjb250ZXh0VG9wO1xuICAgIH07XG4gICAgYXBwZW5kID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHZhciBwYXJlbnQsIF9yZWY7XG4gICAgICBwYXJlbnQgPSB0b3AoKTtcbiAgICAgIGlmIChpc0ZyYWdtZW50KGNoaWxkKSAmJiBjaGlsZC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjaGlsZCA9IGNoaWxkLmNoaWxkTm9kZXNbMF07XG4gICAgICB9XG4gICAgICBpZiAoKF9yZWYgPSB0b3AoKSkgIT0gbnVsbCkge1xuICAgICAgICBfcmVmLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIHB1c2ggPSBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgcmV0dXJuIHN0YWNrLnB1c2goY2hpbGQpO1xuICAgIH07XG4gICAgcG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYXBwZW5kKHN0YWNrLnBvcCgpKTtcbiAgICB9O1xuICAgIHJlbmRlciA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBwdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiBwb3AoKTtcbiAgICB9O1xuICAgIGlkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWxlbWVudCwgc291cmNlcywgdXBkYXRlLCB2YWx1ZTtcbiAgICAgIHNvdXJjZXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgZWxlbWVudCA9IHRvcCgpO1xuICAgICAgdXBkYXRlID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50LmlkID0gbmV3VmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvc3NpYmxlVmFsdWVzO1xuICAgICAgICBwb3NzaWJsZVZhbHVlcyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpZFZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGlkVmFsdWUgIT0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwb3NzaWJsZVZhbHVlc1twb3NzaWJsZVZhbHVlcy5sZW5ndGggLSAxXTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIHVwZGF0ZSk7XG4gICAgfTtcbiAgICBjbGFzc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWxlbWVudCwgc291cmNlcywgdXBkYXRlO1xuICAgICAgc291cmNlcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICBlbGVtZW50ID0gdG9wKCk7XG4gICAgICB1cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3VmFsdWU7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcG9zc2libGVWYWx1ZXM7XG4gICAgICAgICAgcG9zc2libGVWYWx1ZXMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5jYWxsKGNvbnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oc291cmNlVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VWYWx1ZSAhPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBwb3NzaWJsZVZhbHVlcy5qb2luKFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCB1cGRhdGUpO1xuICAgICAgfSkoY29udGV4dCk7XG4gICAgfTtcbiAgICBvYnNlcnZlQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBiaW5kaW5nLCBlbGVtZW50LCBub2RlTmFtZSwgX3JlZjtcbiAgICAgIGVsZW1lbnQgPSB0b3AoKTtcbiAgICAgIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgICAgIGlmIChuYW1lID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgdmFsdWVCaW5kKGVsZW1lbnQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYmluZGluZyA9IChfcmVmID0gc3BlY2lhbEJpbmRpbmdzW25vZGVOYW1lXSkgIT0gbnVsbCA/IF9yZWZbbmFtZV0gOiB2b2lkIDApIHtcbiAgICAgICAgYmluZGluZyhlbGVtZW50LCB2YWx1ZSwgY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUubWF0Y2goL15vbi8pICYmIGlzRXZlbnQobmFtZS5zdWJzdHIoMikpKSB7XG4gICAgICAgIGJpbmRFdmVudChlbGVtZW50LCBuYW1lLCB2YWx1ZSwgY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKGlzRXZlbnQobmFtZSkpIHtcbiAgICAgICAgYmluZEV2ZW50KGVsZW1lbnQsIFwib25cIiArIG5hbWUsIHZhbHVlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIGlmICgobmV3VmFsdWUgIT0gbnVsbCkgJiYgbmV3VmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgbmV3VmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgb2JzZXJ2ZVRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGVsZW1lbnQsIHVwZGF0ZTtcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICB1cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIH07XG4gICAgICBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgdXBkYXRlKTtcbiAgICAgIHJldHVybiByZW5kZXIoZWxlbWVudCk7XG4gICAgfTtcbiAgICB3aXRoQ29udGV4dCA9IGZ1bmN0aW9uKG5ld0NvbnRleHQsIG5ld0NvbnRleHRUb3AsIGZuKSB7XG4gICAgICB2YXIgb2xkQ29udGV4dDtcbiAgICAgIG9sZENvbnRleHQgPSBjb250ZXh0O1xuICAgICAgY29udGV4dCA9IG5ld0NvbnRleHQ7XG4gICAgICBjb250ZXh0VG9wID0gbmV3Q29udGV4dFRvcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgY29udGV4dFRvcCA9IHZvaWQgMDtcbiAgICAgICAgY29udGV4dCA9IG9sZENvbnRleHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICBidWZmZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIF9yZWYsIF9yZWYxLCBfcmVmMjtcbiAgICAgIHZhbHVlID0gT2JzZXJ2YWJsZSh2YWx1ZSwgY29udGV4dCk7XG4gICAgICBzd2l0Y2ggKChfcmVmID0gdmFsdWUoKSkgIT0gbnVsbCA/IF9yZWYubm9kZVR5cGUgOiB2b2lkIDApIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDM6XG4gICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgY29udGVudEJpbmQodG9wKCksIHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWUoKTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoKF9yZWYxID0gdmFsdWUoKSkgIT0gbnVsbCA/IChfcmVmMiA9IF9yZWYxWzBdKSAhPSBudWxsID8gX3JlZjIubm9kZVR5cGUgOiB2b2lkIDAgOiB2b2lkIDApIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDM6XG4gICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgcmV0dXJuIGNvbnRlbnRCaW5kKHRvcCgpLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzZXJ2ZVRleHQodmFsdWUpO1xuICAgIH07XG4gICAgc2VsZiA9IHtcbiAgICAgIHB1c2g6IHB1c2gsXG4gICAgICBwb3A6IHBvcCxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGU6IG9ic2VydmVBdHRyaWJ1dGUsXG4gICAgICB0ZXh0OiBidWZmZXIsXG4gICAgICBmaWx0ZXI6IGZ1bmN0aW9uKG5hbWUsIGNvbnRlbnQpIHt9LFxuICAgICAgZWFjaDogZnVuY3Rpb24oaXRlbXMsIGZuKSB7XG4gICAgICAgIHZhciBlbGVtZW50cywgcGFyZW50LCByZXBsYWNlO1xuICAgICAgICBpdGVtcyA9IE9ic2VydmFibGUoaXRlbXMsIGNvbnRleHQpO1xuICAgICAgICBlbGVtZW50cyA9IG51bGw7XG4gICAgICAgIHBhcmVudCA9IGxhc3RQYXJlbnQoKTtcbiAgICAgICAgaXRlbXMub2JzZXJ2ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZShlbGVtZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXBsYWNlID0gZnVuY3Rpb24ob2xkRWxlbWVudHMpIHtcbiAgICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgIGl0ZW1zLmVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgd2l0aENvbnRleHQoaXRlbSwgcGFyZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPSBmbi5jYWxsKGl0ZW0sIGl0ZW0sIGluZGV4LCBhcnJheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc0ZyYWdtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2guYXBwbHkoZWxlbWVudHMsIGVsZW1lbnQuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG9sZEVsZW1lbnRzICE9IG51bGwgPyBvbGRFbGVtZW50cy5mb3JFYWNoKHJlbW92ZSkgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXBsYWNlKG51bGwsIGl0ZW1zKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIFJ1bnRpbWUuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBSdW50aW1lO1xuXG4gIGVtcHR5ID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBjaGlsZCwgX3Jlc3VsdHM7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICB3aGlsZSAoY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIF9yZXN1bHRzLnB1c2gobm9kZS5yZW1vdmVDaGlsZChjaGlsZCkpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgdmFsdWVJbmRleE9mID0gZnVuY3Rpb24ob3B0aW9ucywgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gb3B0aW9uLnRvU3RyaW5nKCk7XG4gICAgICB9KS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfTtcblxuICByZW1vdmUgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIF9yZWY7XG4gICAgY2xlYW51cChlbGVtZW50KTtcbiAgICBpZiAoKF9yZWYgPSBlbGVtZW50LnBhcmVudE5vZGUpICE9IG51bGwpIHtcbiAgICAgIF9yZWYucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuIWZ1bmN0aW9uKCl7dmFyIE9ic2VydmFibGUsYXV0b0RlcHMsY29tcHV0ZURlcGVuZGVuY2llcyxjb3B5LGV4dGVuZCxmbGF0dGVuLGdldCxsYXN0LG1hZ2ljRGVwZW5kZW5jeSxyZW1vdmUsc3BsYXQsd2l0aEJhc2UsX19zbGljZT1bXS5zbGljZTtPYnNlcnZhYmxlPWZ1bmN0aW9uKHZhbHVlLGNvbnRleHQpe3ZhciBjaGFuZ2VkLGZuLGxpc3RlbmVycyxub3RpZnksbm90aWZ5UmV0dXJuaW5nLHNlbGY7aWYodHlwZW9mKHZhbHVlIT1udWxsP3ZhbHVlLm9ic2VydmU6dm9pZCAwKT09PVwiZnVuY3Rpb25cIil7cmV0dXJuIHZhbHVlfWxpc3RlbmVycz1bXTtub3RpZnk9ZnVuY3Rpb24obmV3VmFsdWUpe3JldHVybiBjb3B5KGxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcil7cmV0dXJuIGxpc3RlbmVyKG5ld1ZhbHVlKX0pfTtpZih0eXBlb2YgdmFsdWU9PT1cImZ1bmN0aW9uXCIpe2ZuPXZhbHVlO3NlbGY9ZnVuY3Rpb24oKXttYWdpY0RlcGVuZGVuY3koc2VsZik7cmV0dXJuIHZhbHVlfTtzZWxmLmVhY2g9ZnVuY3Rpb24oKXt2YXIgYXJncyxfcmVmO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO21hZ2ljRGVwZW5kZW5jeShzZWxmKTtyZXR1cm4oX3JlZj1zcGxhdCh2YWx1ZSkpLmZvckVhY2guYXBwbHkoX3JlZixhcmdzKX07Y2hhbmdlZD1mdW5jdGlvbigpe3ZhbHVlPWNvbXB1dGVEZXBlbmRlbmNpZXMoc2VsZixmbixjaGFuZ2VkLGNvbnRleHQpO3JldHVybiBub3RpZnkodmFsdWUpfTt2YWx1ZT1jb21wdXRlRGVwZW5kZW5jaWVzKHNlbGYsZm4sY2hhbmdlZCxjb250ZXh0KX1lbHNle3NlbGY9ZnVuY3Rpb24obmV3VmFsdWUpe2lmKGFyZ3VtZW50cy5sZW5ndGg+MCl7aWYodmFsdWUhPT1uZXdWYWx1ZSl7dmFsdWU9bmV3VmFsdWU7bm90aWZ5KG5ld1ZhbHVlKX19ZWxzZXttYWdpY0RlcGVuZGVuY3koc2VsZil9cmV0dXJuIHZhbHVlfX1zZWxmLmVhY2g9ZnVuY3Rpb24oKXt2YXIgYXJncyxfcmVmO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO21hZ2ljRGVwZW5kZW5jeShzZWxmKTtpZih2YWx1ZSE9bnVsbCl7cmV0dXJuKF9yZWY9W3ZhbHVlXSkuZm9yRWFjaC5hcHBseShfcmVmLGFyZ3MpfX07aWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkpe1tcImNvbmNhdFwiLFwiZXZlcnlcIixcImZpbHRlclwiLFwiZm9yRWFjaFwiLFwiaW5kZXhPZlwiLFwiam9pblwiLFwibGFzdEluZGV4T2ZcIixcIm1hcFwiLFwicmVkdWNlXCIsXCJyZWR1Y2VSaWdodFwiLFwic2xpY2VcIixcInNvbWVcIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2Qpe3JldHVybiBzZWxmW21ldGhvZF09ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTttYWdpY0RlcGVuZGVuY3koc2VsZik7cmV0dXJuIHZhbHVlW21ldGhvZF0uYXBwbHkodmFsdWUsYXJncyl9fSk7W1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic3BsaWNlXCIsXCJzb3J0XCIsXCJ1bnNoaWZ0XCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKXtyZXR1cm4gc2VsZlttZXRob2RdPWZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107cmV0dXJuIG5vdGlmeVJldHVybmluZyh2YWx1ZVttZXRob2RdLmFwcGx5KHZhbHVlLGFyZ3MpKX19KTtub3RpZnlSZXR1cm5pbmc9ZnVuY3Rpb24ocmV0dXJuVmFsdWUpe25vdGlmeSh2YWx1ZSk7cmV0dXJuIHJldHVyblZhbHVlfTtleHRlbmQoc2VsZix7ZWFjaDpmdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO3NlbGYuZm9yRWFjaC5hcHBseShzZWxmLGFyZ3MpO3JldHVybiBzZWxmfSxyZW1vdmU6ZnVuY3Rpb24ob2JqZWN0KXt2YXIgaW5kZXg7aW5kZXg9dmFsdWUuaW5kZXhPZihvYmplY3QpO2lmKGluZGV4Pj0wKXtyZXR1cm4gbm90aWZ5UmV0dXJuaW5nKHZhbHVlLnNwbGljZShpbmRleCwxKVswXSl9fSxnZXQ6ZnVuY3Rpb24oaW5kZXgpe3JldHVybiB2YWx1ZVtpbmRleF19LGZpcnN0OmZ1bmN0aW9uKCl7cmV0dXJuIHZhbHVlWzBdfSxsYXN0OmZ1bmN0aW9uKCl7cmV0dXJuIHZhbHVlW3ZhbHVlLmxlbmd0aC0xXX19KX1leHRlbmQoc2VsZix7bGlzdGVuZXJzOmxpc3RlbmVycyxvYnNlcnZlOmZ1bmN0aW9uKGxpc3RlbmVyKXtyZXR1cm4gbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpfSxzdG9wT2JzZXJ2aW5nOmZ1bmN0aW9uKGZuKXtyZXR1cm4gcmVtb3ZlKGxpc3RlbmVycyxmbil9LHRvZ2dsZTpmdW5jdGlvbigpe3JldHVybiBzZWxmKCF2YWx1ZSl9LGluY3JlbWVudDpmdW5jdGlvbihuKXtyZXR1cm4gc2VsZih2YWx1ZStuKX0sZGVjcmVtZW50OmZ1bmN0aW9uKG4pe3JldHVybiBzZWxmKHZhbHVlLW4pfSx0b1N0cmluZzpmdW5jdGlvbigpe3JldHVyblwiT2JzZXJ2YWJsZShcIit2YWx1ZStcIilcIn19KTtyZXR1cm4gc2VsZn07T2JzZXJ2YWJsZS5jb25jYXQ9ZnVuY3Rpb24oKXt2YXIgYXJncyxvO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO2FyZ3M9T2JzZXJ2YWJsZShhcmdzKTtvPU9ic2VydmFibGUoZnVuY3Rpb24oKXtyZXR1cm4gZmxhdHRlbihhcmdzLm1hcChzcGxhdCkpfSk7by5wdXNoPWFyZ3MucHVzaDtyZXR1cm4gb307bW9kdWxlLmV4cG9ydHM9T2JzZXJ2YWJsZTtleHRlbmQ9ZnVuY3Rpb24oKXt2YXIgbmFtZSxzb3VyY2Usc291cmNlcyx0YXJnZXQsX2ksX2xlbjt0YXJnZXQ9YXJndW1lbnRzWzBdLHNvdXJjZXM9Mjw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDEpOltdO2ZvcihfaT0wLF9sZW49c291cmNlcy5sZW5ndGg7X2k8X2xlbjtfaSsrKXtzb3VyY2U9c291cmNlc1tfaV07Zm9yKG5hbWUgaW4gc291cmNlKXt0YXJnZXRbbmFtZV09c291cmNlW25hbWVdfX1yZXR1cm4gdGFyZ2V0fTtnbG9iYWwuT0JTRVJWQUJMRV9ST09UX0hBQ0s9W107YXV0b0RlcHM9ZnVuY3Rpb24oKXtyZXR1cm4gbGFzdChnbG9iYWwuT0JTRVJWQUJMRV9ST09UX0hBQ0spfTttYWdpY0RlcGVuZGVuY3k9ZnVuY3Rpb24oc2VsZil7dmFyIG9ic2VydmVyU3RhY2s7aWYob2JzZXJ2ZXJTdGFjaz1hdXRvRGVwcygpKXtyZXR1cm4gb2JzZXJ2ZXJTdGFjay5wdXNoKHNlbGYpfX07d2l0aEJhc2U9ZnVuY3Rpb24oc2VsZix1cGRhdGUsZm4pe3ZhciBkZXBzLHZhbHVlLF9yZWY7Z2xvYmFsLk9CU0VSVkFCTEVfUk9PVF9IQUNLLnB1c2goZGVwcz1bXSk7dHJ5e3ZhbHVlPWZuKCk7aWYoKF9yZWY9c2VsZi5fZGVwcykhPW51bGwpe19yZWYuZm9yRWFjaChmdW5jdGlvbihvYnNlcnZhYmxlKXtyZXR1cm4gb2JzZXJ2YWJsZS5zdG9wT2JzZXJ2aW5nKHVwZGF0ZSl9KX1zZWxmLl9kZXBzPWRlcHM7ZGVwcy5mb3JFYWNoKGZ1bmN0aW9uKG9ic2VydmFibGUpe3JldHVybiBvYnNlcnZhYmxlLm9ic2VydmUodXBkYXRlKX0pfWZpbmFsbHl7Z2xvYmFsLk9CU0VSVkFCTEVfUk9PVF9IQUNLLnBvcCgpfXJldHVybiB2YWx1ZX07Y29tcHV0ZURlcGVuZGVuY2llcz1mdW5jdGlvbihzZWxmLGZuLHVwZGF0ZSxjb250ZXh0KXtyZXR1cm4gd2l0aEJhc2Uoc2VsZix1cGRhdGUsZnVuY3Rpb24oKXtyZXR1cm4gZm4uY2FsbChjb250ZXh0KX0pfTtyZW1vdmU9ZnVuY3Rpb24oYXJyYXksdmFsdWUpe3ZhciBpbmRleDtpbmRleD1hcnJheS5pbmRleE9mKHZhbHVlKTtpZihpbmRleD49MCl7cmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwxKVswXX19O2NvcHk9ZnVuY3Rpb24oYXJyYXkpe3JldHVybiBhcnJheS5jb25jYXQoW10pfTtnZXQ9ZnVuY3Rpb24oYXJnKXtpZih0eXBlb2YgYXJnPT09XCJmdW5jdGlvblwiKXtyZXR1cm4gYXJnKCl9ZWxzZXtyZXR1cm4gYXJnfX07c3BsYXQ9ZnVuY3Rpb24oaXRlbSl7dmFyIHJlc3VsdCxyZXN1bHRzO3Jlc3VsdHM9W107aWYodHlwZW9mIGl0ZW0uZm9yRWFjaD09PVwiZnVuY3Rpb25cIil7aXRlbS5mb3JFYWNoKGZ1bmN0aW9uKGkpe3JldHVybiByZXN1bHRzLnB1c2goaSl9KX1lbHNle3Jlc3VsdD1nZXQoaXRlbSk7aWYocmVzdWx0IT1udWxsKXtyZXN1bHRzLnB1c2gocmVzdWx0KX19cmV0dXJuIHJlc3VsdHN9O2xhc3Q9ZnVuY3Rpb24oYXJyYXkpe3JldHVybiBhcnJheVthcnJheS5sZW5ndGgtMV19O2ZsYXR0ZW49ZnVuY3Rpb24oYXJyYXkpe3JldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5jb25jYXQoYil9LFtdKX19LmNhbGwodGhpcyk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
