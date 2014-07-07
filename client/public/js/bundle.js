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


},{"../templates/binding":5,"o_0":10}],3:[function(require,module,exports){
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


},{"../templates/todos":7,"o_0":10}],5:[function(require,module,exports){
module.exports = function(data) {
  return (function() {
    var __runtime;
    __runtime = require("hamlet-runtime")(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("h2"));
    __runtime.text("Two Way Binding");
    __runtime.pop();
    __runtime.push(document.createElement("h3"));
    __runtime.text(this.name);
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("value", this.first);
    __runtime.attribute("placeholder", "First name");
    __runtime.pop();
    __runtime.push(document.createElement("input"));
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
    __runtime.text("To Do List\n");
    __runtime.pop();
    __runtime.push(document.createElement("input"));
    __runtime.attribute("type", "text");
    __runtime.attribute("value", this.value);
    __runtime.attribute("placeholder", "What needs to be done?");
    __runtime.attribute("onkeydown", this.add);
    __runtime.pop();
    __runtime.push(document.createElement("label"));
    __runtime.push(document.createElement("input"));
    __runtime.attribute("type", "checkbox");
    __runtime.attribute("checked", this.checkCompleteAll);
    __runtime.pop();
    __runtime.push(document.createElement("span"));
    __runtime.text("Mark all as complete\n");
    __runtime.pop();
    __runtime.pop();
    __runtime.push(document.createElement("ul"));
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
},{}],10:[function(require,module,exports){
module.exports=require(9)
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC9hcHAuY29mZmVlIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC9jb2ZmZWUvYmluZGluZy5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L2NvZmZlZS9oZWxsby5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L2NvZmZlZS90b2Rvcy5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L3RlbXBsYXRlcy9iaW5kaW5nLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC90ZW1wbGF0ZXMvaGVsbG8uanMiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L3RlbXBsYXRlcy90b2Rvcy5qcyIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9ub2RlX21vZHVsZXMvaGFtbGV0LXJ1bnRpbWUvZGlzdC9ydW50aW1lLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL25vZGVfbW9kdWxlcy9oYW1sZXQtcnVudGltZS9ub2RlX21vZHVsZXMvb18wL2Rpc3QvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEscUJBQUE7O0FBQUEsS0FBQSxHQUFR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QUEsQ0FBYSxLQUFiLENBQWpCLEVBRmM7QUFBQSxDQS9DZixDQUFBOzs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hYQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImhlbGxvID0gcmVxdWlyZSAnLi9jb2ZmZWUvaGVsbG8nXG5iaW5kaW5nID0gcmVxdWlyZSAnLi9jb2ZmZWUvYmluZGluZydcbnRvZG9zID0gcmVxdWlyZSAnLi9jb2ZmZWUvdG9kb3MnXG5cbmhlbGxvLmluaXQoKVxuYmluZGluZy5pbml0KClcbnRvZG9zLmluaXQoKVxuIiwiIyBzaW1wbGUgMi13YXkgZGF0YSBiaW5kaW5nIGV4YW1wbGVcblxuYmluZGluZ1RlbXBsYXRlID0gcmVxdWlyZSAnLi4vdGVtcGxhdGVzL2JpbmRpbmcnXG5PYnNlcnZhYmxlID0gcmVxdWlyZSAnb18wJ1xuXG5tb2RlbCA9XG5cdG5hbWU6IC0+XG5cdFx0QGZpcnN0KCkgKyAnICcgKyBAbGFzdCgpXG5cdGZpcnN0OiBPYnNlcnZhYmxlICdQcmluY2UnXG5cdGxhc3Q6IE9ic2VydmFibGUgJ0hhbWxldCdcblxuZXhwb3J0cy5pbml0ID0gLT5cblx0dmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdiaW5kaW5nJ1xuXHR2aWV3LmFwcGVuZENoaWxkIGJpbmRpbmdUZW1wbGF0ZShtb2RlbClcbiIsIiMgaGVsbG8gd29ybGQgZXhhbXBsZVxuXG5oZWxsb1RlbXBsYXRlID0gcmVxdWlyZSAnLi4vdGVtcGxhdGVzL2hlbGxvJ1xuXG5kYXRhID1cblx0dGl0bGU6ICdCdWVub3MgRGlhcywgSGFtbGV0ISdcblxuZXhwb3J0cy5pbml0ID0gLT5cblx0dmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdoZWxsbydcblx0dmlldy5hcHBlbmRDaGlsZCBoZWxsb1RlbXBsYXRlKGRhdGEpXG4iLCIjIHNpbXBsZSB0by1kbyBhcHAgZXhhbXBsZVxuXG50b2RvVGVtcGxhdGUgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvdG9kb3MnXG5PYnNlcnZhYmxlID0gcmVxdWlyZSAnb18wJ1xuXG5jb2xsZWN0aW9uID0gT2JzZXJ2YWJsZSBbXVxuXG5jaGVja0NvbXBsZXRlQWxsID0gT2JzZXJ2YWJsZSBmYWxzZVxuY2hlY2tDb21wbGV0ZUFsbC5vYnNlcnZlICh2YWwpIC0+XG5cdGNvbGxlY3Rpb24uZm9yRWFjaCAoaSkgLT5cblx0XHRpLmNoZWNrZWQodmFsKVxuXG5tb2RlbCA9XG5cdHZhbHVlOiBPYnNlcnZhYmxlICcnXG5cdHRvZG9zOiBjb2xsZWN0aW9uXG5cdGNoZWNrQ29tcGxldGVBbGw6IGNoZWNrQ29tcGxldGVBbGxcblxuXHRkb25lOiAtPlxuXHRcdEB0b2Rvcy5maWx0ZXIgKHRvZG8pIC0+XG5cdFx0XHR0b2RvLmNoZWNrZWQoKVxuXG5cdHVuZG9uZTogLT5cblx0XHRAdG9kb3MuZmlsdGVyICh0b2RvKSAtPlxuXHRcdFx0IXRvZG8uY2hlY2tlZCgpXG5cblx0ZG9uZUNvdW50OiAtPlxuXHRcdEBkb25lKCkubGVuZ3RoXG5cblx0dW5kb25lQ291bnQ6IC0+XG5cdFx0QHVuZG9uZSgpLmxlbmd0aFxuXG5cdHJlbW92ZURvbmU6IC0+XG5cdFx0QGRvbmUoKS5mb3JFYWNoIGNvbGxlY3Rpb24ucmVtb3ZlXG5cdFx0QGNoZWNrQ29tcGxldGVBbGwoZmFsc2UpXG5cblx0YWRkOiAoZSkgLT5cblx0XHRyZXR1cm4gdW5sZXNzIGUua2V5Q29kZSBpcyAxM1xuXHRcdHJldHVybiB1bmxlc3MgQHZhbHVlKCkgaXNudCAnJ1xuXG5cdFx0dG9kbyA9XG5cdFx0XHRkZXNjcmlwdGlvbjogQHZhbHVlKClcblx0XHRcdGNoZWNrZWQ6IE9ic2VydmFibGUgZmFsc2Vcblx0XHRcdGNsYXNzOiAtPlxuXHRcdFx0XHQnY29tcGxldGVkJyBpZiB0b2RvLmNoZWNrZWQoKVxuXG5cdFx0QHRvZG9zLnB1c2ggdG9kb1xuXHRcdEB2YWx1ZSAnJ1xuXG5cbmV4cG9ydHMuaW5pdCA9IC0+XG5cdHZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAndG9kbydcblx0dmlldy5hcHBlbmRDaGlsZCB0b2RvVGVtcGxhdGUobW9kZWwpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgX19ydW50aW1lO1xuICAgIF9fcnVudGltZSA9IHJlcXVpcmUoXCJoYW1sZXQtcnVudGltZVwiKSh0aGlzKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgX19ydW50aW1lLnRleHQoXCJUd28gV2F5IEJpbmRpbmdcIik7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgX19ydW50aW1lLnRleHQodGhpcy5uYW1lKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidmFsdWVcIiwgdGhpcy5maXJzdCk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiRmlyc3QgbmFtZVwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidmFsdWVcIiwgdGhpcy5sYXN0KTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJMYXN0IG5hbWVcIik7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIHJldHVybiBfX3J1bnRpbWUucG9wKCk7XG4gIH0pLmNhbGwoZGF0YSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9fcnVudGltZTtcbiAgICBfX3J1bnRpbWUgPSByZXF1aXJlKFwiaGFtbGV0LXJ1bnRpbWVcIikodGhpcyk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIikpO1xuICAgIF9fcnVudGltZS50ZXh0KHRoaXMudGl0bGUpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICB9KS5jYWxsKGRhdGEpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfX3J1bnRpbWU7XG4gICAgX19ydW50aW1lID0gcmVxdWlyZShcImhhbWxldC1ydW50aW1lXCIpKHRoaXMpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpKTtcbiAgICBfX3J1bnRpbWUudGV4dChcIlRvIERvIExpc3RcXG5cIik7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aGlzLnZhbHVlKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJXaGF0IG5lZWRzIHRvIGJlIGRvbmU/XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJvbmtleWRvd25cIiwgdGhpcy5hZGQpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIikpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwiY2hlY2tlZFwiLCB0aGlzLmNoZWNrQ29tcGxldGVBbGwpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgX19ydW50aW1lLnRleHQoXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVxcblwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgX19ydW50aW1lLmVhY2godGhpcy50b2RvcywgZnVuY3Rpb24oKSB7XG4gICAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpKTtcbiAgICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgX19ydW50aW1lLmF0dHJpYnV0ZShcImNoZWNrZWRcIiwgdGhpcy5jaGVja2VkKTtcbiAgICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgIF9fcnVudGltZS5jbGFzc2VzKFwiaXRlbVwiLCB0aGlzW1wiY2xhc3NcIl0pO1xuICAgICAgX19ydW50aW1lLnRleHQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICAgIH0pO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcInRvdGFsc1wiKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcInVuZG9uZVwiKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgX19ydW50aW1lLmNsYXNzZXMoXCJjb3VudFwiKTtcbiAgICBfX3J1bnRpbWUudGV4dCh0aGlzLnVuZG9uZUNvdW50KTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnRleHQoXCJsZWZ0XFxuXCIpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBfX3J1bnRpbWUuY2xhc3NlcyhcImNsZWFyXCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJjbGlja1wiLCB0aGlzLnJlbW92ZURvbmUpO1xuICAgIF9fcnVudGltZS50ZXh0KFwiQ2xlYXJcXG5cIik7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgIF9fcnVudGltZS5jbGFzc2VzKFwiY291bnRcIik7XG4gICAgX19ydW50aW1lLnRleHQodGhpcy5kb25lQ291bnQpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUudGV4dChcIml0ZW1zXFxuXCIpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgcmV0dXJuIF9fcnVudGltZS5wb3AoKTtcbiAgfSkuY2FsbChkYXRhKTtcbn07XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBPYnNlcnZhYmxlLCBSdW50aW1lLCBiaW5kRXZlbnQsIGJpbmRPYnNlcnZhYmxlLCBjbGVhbnVwLCBjb250ZW50QmluZCwgZW1wdHksIGV2ZW50TmFtZXMsIGluaXRDb250ZW50LCBpc0V2ZW50LCBpc0ZyYWdtZW50LCByZW1vdmUsIHNwZWNpYWxCaW5kaW5ncywgdmFsdWVCaW5kLCB2YWx1ZUluZGV4T2YsXG4gICAgX19zbGljZSA9IFtdLnNsaWNlO1xuXG4gIE9ic2VydmFibGUgPSByZXF1aXJlKFwib18wXCIpO1xuXG4gIGV2ZW50TmFtZXMgPSBcImFib3J0XFxuYmx1clxcbmNoYW5nZVxcbmNsaWNrXFxuZGJsY2xpY2tcXG5kcmFnXFxuZHJhZ2VuZFxcbmRyYWdlbnRlclxcbmRyYWdsZWF2ZVxcbmRyYWdvdmVyXFxuZHJhZ3N0YXJ0XFxuZHJvcFxcbmVycm9yXFxuZm9jdXNcXG5pbnB1dFxcbmtleWRvd25cXG5rZXlwcmVzc1xcbmtleXVwXFxubG9hZFxcbm1vdXNlZG93blxcbm1vdXNlbW92ZVxcbm1vdXNlb3V0XFxubW91c2VvdmVyXFxubW91c2V1cFxcbnJlc2V0XFxucmVzaXplXFxuc2Nyb2xsXFxuc2VsZWN0XFxuc3VibWl0XFxudG91Y2hjYW5jZWxcXG50b3VjaGVuZFxcbnRvdWNoZW50ZXJcXG50b3VjaGxlYXZlXFxudG91Y2htb3ZlXFxudG91Y2hzdGFydFxcbnVubG9hZFwiLnNwbGl0KFwiXFxuXCIpO1xuXG4gIGlzRXZlbnQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGV2ZW50TmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gIH07XG5cbiAgaXNGcmFnbWVudCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gKG5vZGUgIT0gbnVsbCA/IG5vZGUubm9kZVR5cGUgOiB2b2lkIDApID09PSAxMTtcbiAgfTtcblxuICBpbml0Q29udGVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgYWxsQ29udGVudCwgdXBkYXRlO1xuICAgIGlmIChlbGVtZW50Ll9oYW1sZXRfY29udGVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuX2hhbWxldF9jb250ZW50O1xuICAgIH1cbiAgICBhbGxDb250ZW50ID0gKGVsZW1lbnQuX2hhbWxldF9jb250ZW50ICE9IG51bGwgPyBlbGVtZW50Ll9oYW1sZXRfY29udGVudCA6IGVsZW1lbnQuX2hhbWxldF9jb250ZW50ID0gT2JzZXJ2YWJsZS5jb25jYXQoKSk7XG4gICAgdXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBlbXB0eShlbGVtZW50KTtcbiAgICAgIHJldHVybiBhbGxDb250ZW50LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgYmluZE9ic2VydmFibGUoZWxlbWVudCwgYWxsQ29udGVudCwgbnVsbCwgdXBkYXRlKTtcbiAgICByZXR1cm4gYWxsQ29udGVudDtcbiAgfTtcblxuICBjb250ZW50QmluZCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgaW5pdENvbnRlbnQoZWxlbWVudCkucHVzaCh2YWx1ZSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgdmFsdWVCaW5kID0gZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUsIGNvbnRleHQpIHtcbiAgICB2YXIgdXBkYXRlO1xuICAgIHZhbHVlID0gT2JzZXJ2YWJsZSh2YWx1ZSwgY29udGV4dCk7XG4gICAgc3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XG4gICAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICAgIGVsZW1lbnQub25pbnB1dCA9IGVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgb3B0aW9uVmFsdWUsIF9yZWYsIF92YWx1ZTtcbiAgICAgICAgICBfcmVmID0gdGhpcy5jaGlsZHJlblt0aGlzLnNlbGVjdGVkSW5kZXhdLCBvcHRpb25WYWx1ZSA9IF9yZWYudmFsdWUsIF92YWx1ZSA9IF9yZWYuX3ZhbHVlO1xuICAgICAgICAgIHJldHVybiB2YWx1ZShfdmFsdWUgfHwgb3B0aW9uVmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIHZhciBvcHRpb25zO1xuICAgICAgICAgIGVsZW1lbnQuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgaWYgKChvcHRpb25zID0gZWxlbWVudC5fb3B0aW9ucykpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlID0gKHR5cGVvZiBuZXdWYWx1ZS52YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gbmV3VmFsdWUudmFsdWUoKSA6IHZvaWQgMCkgfHwgbmV3VmFsdWUudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gdmFsdWVJbmRleE9mKG9wdGlvbnMsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCB1cGRhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGVsZW1lbnQub25pbnB1dCA9IGVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUoZWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIGlmIChlbGVtZW50LnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzcGVjaWFsQmluZGluZ3MgPSB7XG4gICAgSU5QVVQ6IHtcbiAgICAgIGNoZWNrZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0KSB7XG4gICAgICAgIGVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZShlbGVtZW50LmNoZWNrZWQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2hlY2tlZCA9IG5ld1ZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFNFTEVDVDoge1xuICAgICAgb3B0aW9uczogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciB1cGRhdGVWYWx1ZXM7XG4gICAgICAgIHZhbHVlcyA9IE9ic2VydmFibGUodmFsdWVzLCBjb250ZXh0KTtcbiAgICAgICAgdXBkYXRlVmFsdWVzID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgICAgZW1wdHkoZWxlbWVudCk7XG4gICAgICAgICAgZWxlbWVudC5fb3B0aW9ucyA9IHZhbHVlcztcbiAgICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb24sIG9wdGlvbk5hbWUsIG9wdGlvblZhbHVlO1xuICAgICAgICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgIG9wdGlvbi5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgb3B0aW9uVmFsdWUgPSAodmFsdWUgIT0gbnVsbCA/IHZhbHVlLnZhbHVlIDogdm9pZCAwKSB8fCBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9wdGlvblZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbmRPYnNlcnZhYmxlKG9wdGlvbiwgb3B0aW9uVmFsdWUsIHZhbHVlLCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9wdGlvbk5hbWUgPSAodmFsdWUgIT0gbnVsbCA/IHZhbHVlLm5hbWUgOiB2b2lkIDApIHx8IHZhbHVlO1xuICAgICAgICAgICAgYmluZE9ic2VydmFibGUob3B0aW9uLCBvcHRpb25OYW1lLCB2YWx1ZSwgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGVsZW1lbnQuX3ZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlcywgY29udGV4dCwgdXBkYXRlVmFsdWVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYmluZE9ic2VydmFibGUgPSBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgdXBkYXRlKSB7XG4gICAgdmFyIG9ic2VydmFibGUsIG9ic2VydmUsIHVub2JzZXJ2ZTtcbiAgICBvYnNlcnZhYmxlID0gT2JzZXJ2YWJsZSh2YWx1ZSwgY29udGV4dCk7XG4gICAgb2JzZXJ2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgb2JzZXJ2YWJsZS5vYnNlcnZlKHVwZGF0ZSk7XG4gICAgICByZXR1cm4gdXBkYXRlKG9ic2VydmFibGUoKSk7XG4gICAgfTtcbiAgICB1bm9ic2VydmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlLnN0b3BPYnNlcnZpbmcodXBkYXRlKTtcbiAgICB9O1xuICAgIG9ic2VydmUoKTtcbiAgICAoZWxlbWVudC5faGFtbGV0X2NsZWFudXAgfHwgKGVsZW1lbnQuX2hhbWxldF9jbGVhbnVwID0gW10pKS5wdXNoKHVub2JzZXJ2ZSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgYmluZEV2ZW50ID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZSwgZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZWxlbWVudFtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICBjbGVhbnVwID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHZhciBfcmVmO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxlbWVudC5jaGlsZHJlbiwgY2xlYW51cCk7XG4gICAgaWYgKChfcmVmID0gZWxlbWVudC5faGFtbGV0X2NsZWFudXApICE9IG51bGwpIHtcbiAgICAgIF9yZWYuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRlbGV0ZSBlbGVtZW50Ll9oYW1sZXRfY2xlYW51cDtcbiAgfTtcblxuICBSdW50aW1lID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciBhcHBlbmQsIGJ1ZmZlciwgY2xhc3NlcywgY29udGV4dFRvcCwgaWQsIGxhc3RQYXJlbnQsIG9ic2VydmVBdHRyaWJ1dGUsIG9ic2VydmVUZXh0LCBwb3AsIHB1c2gsIHJlbmRlciwgc2VsZiwgc3RhY2ssIHRvcCwgd2l0aENvbnRleHQ7XG4gICAgc3RhY2sgPSBbXTtcbiAgICBsYXN0UGFyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWxlbWVudCwgaTtcbiAgICAgIGkgPSBzdGFjay5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKChlbGVtZW50ID0gc3RhY2tbaV0pICYmIGlzRnJhZ21lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICBjb250ZXh0VG9wID0gdm9pZCAwO1xuICAgIHRvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdIHx8IGNvbnRleHRUb3A7XG4gICAgfTtcbiAgICBhcHBlbmQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgdmFyIHBhcmVudCwgX3JlZjtcbiAgICAgIHBhcmVudCA9IHRvcCgpO1xuICAgICAgaWYgKGlzRnJhZ21lbnQoY2hpbGQpICYmIGNoaWxkLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGQuY2hpbGROb2Rlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmICgoX3JlZiA9IHRvcCgpKSAhPSBudWxsKSB7XG4gICAgICAgIF9yZWYuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG4gICAgcHVzaCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICByZXR1cm4gc3RhY2sucHVzaChjaGlsZCk7XG4gICAgfTtcbiAgICBwb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhcHBlbmQoc3RhY2sucG9wKCkpO1xuICAgIH07XG4gICAgcmVuZGVyID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHB1c2goY2hpbGQpO1xuICAgICAgcmV0dXJuIHBvcCgpO1xuICAgIH07XG4gICAgaWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbGVtZW50LCBzb3VyY2VzLCB1cGRhdGUsIHZhbHVlO1xuICAgICAgc291cmNlcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICBlbGVtZW50ID0gdG9wKCk7XG4gICAgICB1cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuaWQgPSBuZXdWYWx1ZTtcbiAgICAgIH07XG4gICAgICB2YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zc2libGVWYWx1ZXM7XG4gICAgICAgIHBvc3NpYmxlVmFsdWVzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGlkVmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gaWRWYWx1ZSAhPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlVmFsdWVzW3Bvc3NpYmxlVmFsdWVzLmxlbmd0aCAtIDFdO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgdXBkYXRlKTtcbiAgICB9O1xuICAgIGNsYXNzZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbGVtZW50LCBzb3VyY2VzLCB1cGRhdGU7XG4gICAgICBzb3VyY2VzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGVsZW1lbnQgPSB0b3AoKTtcbiAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUgPSBuZXdWYWx1ZTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwb3NzaWJsZVZhbHVlcztcbiAgICAgICAgICBwb3NzaWJsZVZhbHVlcyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICByZXR1cm4gc291cmNlLmNhbGwoY29udGV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihzb3VyY2VWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZVZhbHVlICE9IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHBvc3NpYmxlVmFsdWVzLmpvaW4oXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIHVwZGF0ZSk7XG4gICAgICB9KShjb250ZXh0KTtcbiAgICB9O1xuICAgIG9ic2VydmVBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGJpbmRpbmcsIGVsZW1lbnQsIG5vZGVOYW1lLCBfcmVmO1xuICAgICAgZWxlbWVudCA9IHRvcCgpO1xuICAgICAgbm9kZU5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lO1xuICAgICAgaWYgKG5hbWUgPT09IFwidmFsdWVcIikge1xuICAgICAgICB2YWx1ZUJpbmQoZWxlbWVudCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChiaW5kaW5nID0gKF9yZWYgPSBzcGVjaWFsQmluZGluZ3Nbbm9kZU5hbWVdKSAhPSBudWxsID8gX3JlZltuYW1lXSA6IHZvaWQgMCkge1xuICAgICAgICBiaW5kaW5nKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZS5tYXRjaCgvXm9uLykgJiYgaXNFdmVudChuYW1lLnN1YnN0cigyKSkpIHtcbiAgICAgICAgYmluZEV2ZW50KGVsZW1lbnQsIG5hbWUsIHZhbHVlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNFdmVudChuYW1lKSkge1xuICAgICAgICBiaW5kRXZlbnQoZWxlbWVudCwgXCJvblwiICsgbmFtZSwgdmFsdWUsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgaWYgKChuZXdWYWx1ZSAhPSBudWxsKSAmJiBuZXdWYWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICBvYnNlcnZlVGV4dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgZWxlbWVudCwgdXBkYXRlO1xuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfTtcbiAgICAgIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCB1cGRhdGUpO1xuICAgICAgcmV0dXJuIHJlbmRlcihlbGVtZW50KTtcbiAgICB9O1xuICAgIHdpdGhDb250ZXh0ID0gZnVuY3Rpb24obmV3Q29udGV4dCwgbmV3Q29udGV4dFRvcCwgZm4pIHtcbiAgICAgIHZhciBvbGRDb250ZXh0O1xuICAgICAgb2xkQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICBjb250ZXh0ID0gbmV3Q29udGV4dDtcbiAgICAgIGNvbnRleHRUb3AgPSBuZXdDb250ZXh0VG9wO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjb250ZXh0VG9wID0gdm9pZCAwO1xuICAgICAgICBjb250ZXh0ID0gb2xkQ29udGV4dDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGJ1ZmZlciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgX3JlZiwgX3JlZjEsIF9yZWYyO1xuICAgICAgdmFsdWUgPSBPYnNlcnZhYmxlKHZhbHVlLCBjb250ZXh0KTtcbiAgICAgIHN3aXRjaCAoKF9yZWYgPSB2YWx1ZSgpKSAhPSBudWxsID8gX3JlZi5ub2RlVHlwZSA6IHZvaWQgMCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICBjb250ZW50QmluZCh0b3AoKSwgdmFsdWUpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuICAgICAgfVxuICAgICAgc3dpdGNoICgoX3JlZjEgPSB2YWx1ZSgpKSAhPSBudWxsID8gKF9yZWYyID0gX3JlZjFbMF0pICE9IG51bGwgPyBfcmVmMi5ub2RlVHlwZSA6IHZvaWQgMCA6IHZvaWQgMCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICByZXR1cm4gY29udGVudEJpbmQodG9wKCksIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNlcnZlVGV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBzZWxmID0ge1xuICAgICAgcHVzaDogcHVzaCxcbiAgICAgIHBvcDogcG9wLFxuICAgICAgaWQ6IGlkLFxuICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgIGF0dHJpYnV0ZTogb2JzZXJ2ZUF0dHJpYnV0ZSxcbiAgICAgIHRleHQ6IGJ1ZmZlcixcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24obmFtZSwgY29udGVudCkge30sXG4gICAgICBlYWNoOiBmdW5jdGlvbihpdGVtcywgZm4pIHtcbiAgICAgICAgdmFyIGVsZW1lbnRzLCBwYXJlbnQsIHJlcGxhY2U7XG4gICAgICAgIGl0ZW1zID0gT2JzZXJ2YWJsZShpdGVtcywgY29udGV4dCk7XG4gICAgICAgIGVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgcGFyZW50ID0gbGFzdFBhcmVudCgpO1xuICAgICAgICBpdGVtcy5vYnNlcnZlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiByZXBsYWNlKGVsZW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcGxhY2UgPSBmdW5jdGlvbihvbGRFbGVtZW50cykge1xuICAgICAgICAgIGVsZW1lbnRzID0gW107XG4gICAgICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB3aXRoQ29udGV4dChpdGVtLCBwYXJlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudCA9IGZuLmNhbGwoaXRlbSwgaXRlbSwgaW5kZXgsIGFycmF5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzRnJhZ21lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgZWxlbWVudHMucHVzaC5hcHBseShlbGVtZW50cywgZWxlbWVudC5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gb2xkRWxlbWVudHMgIT0gbnVsbCA/IG9sZEVsZW1lbnRzLmZvckVhY2gocmVtb3ZlKSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2UobnVsbCwgaXRlbXMpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgUnVudGltZS5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFJ1bnRpbWU7XG5cbiAgZW1wdHkgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGNoaWxkLCBfcmVzdWx0cztcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIHdoaWxlIChjaGlsZCA9IG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgX3Jlc3VsdHMucHVzaChub2RlLnJlbW92ZUNoaWxkKGNoaWxkKSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuICB2YWx1ZUluZGV4T2YgPSBmdW5jdGlvbihvcHRpb25zLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5tYXAoZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBvcHRpb24udG9TdHJpbmcoKTtcbiAgICAgIH0pLmluZGV4T2YodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbW92ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgX3JlZjtcbiAgICBjbGVhbnVwKGVsZW1lbnQpO1xuICAgIGlmICgoX3JlZiA9IGVsZW1lbnQucGFyZW50Tm9kZSkgIT0gbnVsbCkge1xuICAgICAgX3JlZi5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4hZnVuY3Rpb24oKXt2YXIgT2JzZXJ2YWJsZSxhdXRvRGVwcyxjb21wdXRlRGVwZW5kZW5jaWVzLGNvcHksZXh0ZW5kLGZsYXR0ZW4sZ2V0LGxhc3QsbWFnaWNEZXBlbmRlbmN5LHJlbW92ZSxzcGxhdCx3aXRoQmFzZSxfX3NsaWNlPVtdLnNsaWNlO09ic2VydmFibGU9ZnVuY3Rpb24odmFsdWUsY29udGV4dCl7dmFyIGNoYW5nZWQsZm4sbGlzdGVuZXJzLG5vdGlmeSxub3RpZnlSZXR1cm5pbmcsc2VsZjtpZih0eXBlb2YodmFsdWUhPW51bGw/dmFsdWUub2JzZXJ2ZTp2b2lkIDApPT09XCJmdW5jdGlvblwiKXtyZXR1cm4gdmFsdWV9bGlzdGVuZXJzPVtdO25vdGlmeT1mdW5jdGlvbihuZXdWYWx1ZSl7cmV0dXJuIGNvcHkobGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKXtyZXR1cm4gbGlzdGVuZXIobmV3VmFsdWUpfSl9O2lmKHR5cGVvZiB2YWx1ZT09PVwiZnVuY3Rpb25cIil7Zm49dmFsdWU7c2VsZj1mdW5jdGlvbigpe21hZ2ljRGVwZW5kZW5jeShzZWxmKTtyZXR1cm4gdmFsdWV9O3NlbGYuZWFjaD1mdW5jdGlvbigpe3ZhciBhcmdzLF9yZWY7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107bWFnaWNEZXBlbmRlbmN5KHNlbGYpO3JldHVybihfcmVmPXNwbGF0KHZhbHVlKSkuZm9yRWFjaC5hcHBseShfcmVmLGFyZ3MpfTtjaGFuZ2VkPWZ1bmN0aW9uKCl7dmFsdWU9Y29tcHV0ZURlcGVuZGVuY2llcyhzZWxmLGZuLGNoYW5nZWQsY29udGV4dCk7cmV0dXJuIG5vdGlmeSh2YWx1ZSl9O3ZhbHVlPWNvbXB1dGVEZXBlbmRlbmNpZXMoc2VsZixmbixjaGFuZ2VkLGNvbnRleHQpfWVsc2V7c2VsZj1mdW5jdGlvbihuZXdWYWx1ZSl7aWYoYXJndW1lbnRzLmxlbmd0aD4wKXtpZih2YWx1ZSE9PW5ld1ZhbHVlKXt2YWx1ZT1uZXdWYWx1ZTtub3RpZnkobmV3VmFsdWUpfX1lbHNle21hZ2ljRGVwZW5kZW5jeShzZWxmKX1yZXR1cm4gdmFsdWV9fXNlbGYuZWFjaD1mdW5jdGlvbigpe3ZhciBhcmdzLF9yZWY7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107bWFnaWNEZXBlbmRlbmN5KHNlbGYpO2lmKHZhbHVlIT1udWxsKXtyZXR1cm4oX3JlZj1bdmFsdWVdKS5mb3JFYWNoLmFwcGx5KF9yZWYsYXJncyl9fTtpZihBcnJheS5pc0FycmF5KHZhbHVlKSl7W1wiY29uY2F0XCIsXCJldmVyeVwiLFwiZmlsdGVyXCIsXCJmb3JFYWNoXCIsXCJpbmRleE9mXCIsXCJqb2luXCIsXCJsYXN0SW5kZXhPZlwiLFwibWFwXCIsXCJyZWR1Y2VcIixcInJlZHVjZVJpZ2h0XCIsXCJzbGljZVwiLFwic29tZVwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCl7cmV0dXJuIHNlbGZbbWV0aG9kXT1mdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO21hZ2ljRGVwZW5kZW5jeShzZWxmKTtyZXR1cm4gdmFsdWVbbWV0aG9kXS5hcHBseSh2YWx1ZSxhcmdzKX19KTtbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzcGxpY2VcIixcInNvcnRcIixcInVuc2hpZnRcIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2Qpe3JldHVybiBzZWxmW21ldGhvZF09ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTtyZXR1cm4gbm90aWZ5UmV0dXJuaW5nKHZhbHVlW21ldGhvZF0uYXBwbHkodmFsdWUsYXJncykpfX0pO25vdGlmeVJldHVybmluZz1mdW5jdGlvbihyZXR1cm5WYWx1ZSl7bm90aWZ5KHZhbHVlKTtyZXR1cm4gcmV0dXJuVmFsdWV9O2V4dGVuZChzZWxmLHtlYWNoOmZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107c2VsZi5mb3JFYWNoLmFwcGx5KHNlbGYsYXJncyk7cmV0dXJuIHNlbGZ9LHJlbW92ZTpmdW5jdGlvbihvYmplY3Qpe3ZhciBpbmRleDtpbmRleD12YWx1ZS5pbmRleE9mKG9iamVjdCk7aWYoaW5kZXg+PTApe3JldHVybiBub3RpZnlSZXR1cm5pbmcodmFsdWUuc3BsaWNlKGluZGV4LDEpWzBdKX19LGdldDpmdW5jdGlvbihpbmRleCl7cmV0dXJuIHZhbHVlW2luZGV4XX0sZmlyc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdmFsdWVbMF19LGxhc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdmFsdWVbdmFsdWUubGVuZ3RoLTFdfX0pfWV4dGVuZChzZWxmLHtsaXN0ZW5lcnM6bGlzdGVuZXJzLG9ic2VydmU6ZnVuY3Rpb24obGlzdGVuZXIpe3JldHVybiBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcil9LHN0b3BPYnNlcnZpbmc6ZnVuY3Rpb24oZm4pe3JldHVybiByZW1vdmUobGlzdGVuZXJzLGZuKX0sdG9nZ2xlOmZ1bmN0aW9uKCl7cmV0dXJuIHNlbGYoIXZhbHVlKX0saW5jcmVtZW50OmZ1bmN0aW9uKG4pe3JldHVybiBzZWxmKHZhbHVlK24pfSxkZWNyZW1lbnQ6ZnVuY3Rpb24obil7cmV0dXJuIHNlbGYodmFsdWUtbil9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7cmV0dXJuXCJPYnNlcnZhYmxlKFwiK3ZhbHVlK1wiKVwifX0pO3JldHVybiBzZWxmfTtPYnNlcnZhYmxlLmNvbmNhdD1mdW5jdGlvbigpe3ZhciBhcmdzLG87YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107YXJncz1PYnNlcnZhYmxlKGFyZ3MpO289T2JzZXJ2YWJsZShmdW5jdGlvbigpe3JldHVybiBmbGF0dGVuKGFyZ3MubWFwKHNwbGF0KSl9KTtvLnB1c2g9YXJncy5wdXNoO3JldHVybiBvfTttb2R1bGUuZXhwb3J0cz1PYnNlcnZhYmxlO2V4dGVuZD1mdW5jdGlvbigpe3ZhciBuYW1lLHNvdXJjZSxzb3VyY2VzLHRhcmdldCxfaSxfbGVuO3RhcmdldD1hcmd1bWVudHNbMF0sc291cmNlcz0yPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMSk6W107Zm9yKF9pPTAsX2xlbj1zb3VyY2VzLmxlbmd0aDtfaTxfbGVuO19pKyspe3NvdXJjZT1zb3VyY2VzW19pXTtmb3IobmFtZSBpbiBzb3VyY2Upe3RhcmdldFtuYW1lXT1zb3VyY2VbbmFtZV19fXJldHVybiB0YXJnZXR9O2dsb2JhbC5PQlNFUlZBQkxFX1JPT1RfSEFDSz1bXTthdXRvRGVwcz1mdW5jdGlvbigpe3JldHVybiBsYXN0KGdsb2JhbC5PQlNFUlZBQkxFX1JPT1RfSEFDSyl9O21hZ2ljRGVwZW5kZW5jeT1mdW5jdGlvbihzZWxmKXt2YXIgb2JzZXJ2ZXJTdGFjaztpZihvYnNlcnZlclN0YWNrPWF1dG9EZXBzKCkpe3JldHVybiBvYnNlcnZlclN0YWNrLnB1c2goc2VsZil9fTt3aXRoQmFzZT1mdW5jdGlvbihzZWxmLHVwZGF0ZSxmbil7dmFyIGRlcHMsdmFsdWUsX3JlZjtnbG9iYWwuT0JTRVJWQUJMRV9ST09UX0hBQ0sucHVzaChkZXBzPVtdKTt0cnl7dmFsdWU9Zm4oKTtpZigoX3JlZj1zZWxmLl9kZXBzKSE9bnVsbCl7X3JlZi5mb3JFYWNoKGZ1bmN0aW9uKG9ic2VydmFibGUpe3JldHVybiBvYnNlcnZhYmxlLnN0b3BPYnNlcnZpbmcodXBkYXRlKX0pfXNlbGYuX2RlcHM9ZGVwcztkZXBzLmZvckVhY2goZnVuY3Rpb24ob2JzZXJ2YWJsZSl7cmV0dXJuIG9ic2VydmFibGUub2JzZXJ2ZSh1cGRhdGUpfSl9ZmluYWxseXtnbG9iYWwuT0JTRVJWQUJMRV9ST09UX0hBQ0sucG9wKCl9cmV0dXJuIHZhbHVlfTtjb21wdXRlRGVwZW5kZW5jaWVzPWZ1bmN0aW9uKHNlbGYsZm4sdXBkYXRlLGNvbnRleHQpe3JldHVybiB3aXRoQmFzZShzZWxmLHVwZGF0ZSxmdW5jdGlvbigpe3JldHVybiBmbi5jYWxsKGNvbnRleHQpfSl9O3JlbW92ZT1mdW5jdGlvbihhcnJheSx2YWx1ZSl7dmFyIGluZGV4O2luZGV4PWFycmF5LmluZGV4T2YodmFsdWUpO2lmKGluZGV4Pj0wKXtyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LDEpWzBdfX07Y29weT1mdW5jdGlvbihhcnJheSl7cmV0dXJuIGFycmF5LmNvbmNhdChbXSl9O2dldD1mdW5jdGlvbihhcmcpe2lmKHR5cGVvZiBhcmc9PT1cImZ1bmN0aW9uXCIpe3JldHVybiBhcmcoKX1lbHNle3JldHVybiBhcmd9fTtzcGxhdD1mdW5jdGlvbihpdGVtKXt2YXIgcmVzdWx0LHJlc3VsdHM7cmVzdWx0cz1bXTtpZih0eXBlb2YgaXRlbS5mb3JFYWNoPT09XCJmdW5jdGlvblwiKXtpdGVtLmZvckVhY2goZnVuY3Rpb24oaSl7cmV0dXJuIHJlc3VsdHMucHVzaChpKX0pfWVsc2V7cmVzdWx0PWdldChpdGVtKTtpZihyZXN1bHQhPW51bGwpe3Jlc3VsdHMucHVzaChyZXN1bHQpfX1yZXR1cm4gcmVzdWx0c307bGFzdD1mdW5jdGlvbihhcnJheSl7cmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aC0xXX07ZmxhdHRlbj1mdW5jdGlvbihhcnJheSl7cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihhLGIpe3JldHVybiBhLmNvbmNhdChiKX0sW10pfX0uY2FsbCh0aGlzKTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
