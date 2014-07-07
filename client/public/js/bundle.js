(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var binding, data, mainTemplate, todos;

mainTemplate = require('./templates/hello');

binding = require('./coffee/binding');

todos = require('./coffee/todos');

data = {
  title: 'Buenos Dias, Hamlet!'
};

document.body.appendChild(mainTemplate(data));

binding.init();

todos.init();


},{"./coffee/binding":2,"./coffee/todos":3,"./templates/hello":5}],2:[function(require,module,exports){
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


},{"../templates/binding":4,"o_0":9}],3:[function(require,module,exports){
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


},{"../templates/todos":6,"o_0":9}],4:[function(require,module,exports){
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

},{"hamlet-runtime":7}],5:[function(require,module,exports){
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

},{"hamlet-runtime":7}],6:[function(require,module,exports){
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
    return __runtime.pop();
  }).call(data);
};

},{"hamlet-runtime":7}],7:[function(require,module,exports){
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

},{"o_0":8}],8:[function(require,module,exports){
(function (global){
!function(){var Observable,autoDeps,computeDependencies,copy,extend,flatten,get,last,magicDependency,remove,splat,withBase,__slice=[].slice;Observable=function(value,context){var changed,fn,listeners,notify,notifyReturning,self;if(typeof(value!=null?value.observe:void 0)==="function"){return value}listeners=[];notify=function(newValue){return copy(listeners).forEach(function(listener){return listener(newValue)})};if(typeof value==="function"){fn=value;self=function(){magicDependency(self);return value};self.each=function(){var args,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);return(_ref=splat(value)).forEach.apply(_ref,args)};changed=function(){value=computeDependencies(self,fn,changed,context);return notify(value)};value=computeDependencies(self,fn,changed,context)}else{self=function(newValue){if(arguments.length>0){if(value!==newValue){value=newValue;notify(newValue)}}else{magicDependency(self)}return value}}self.each=function(){var args,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);if(value!=null){return(_ref=[value]).forEach.apply(_ref,args)}};if(Array.isArray(value)){["concat","every","filter","forEach","indexOf","join","lastIndexOf","map","reduce","reduceRight","slice","some"].forEach(function(method){return self[method]=function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];magicDependency(self);return value[method].apply(value,args)}});["pop","push","reverse","shift","splice","sort","unshift"].forEach(function(method){return self[method]=function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return notifyReturning(value[method].apply(value,args))}});notifyReturning=function(returnValue){notify(value);return returnValue};extend(self,{each:function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];self.forEach.apply(self,args);return self},remove:function(object){var index;index=value.indexOf(object);if(index>=0){return notifyReturning(value.splice(index,1)[0])}},get:function(index){return value[index]},first:function(){return value[0]},last:function(){return value[value.length-1]}})}extend(self,{listeners:listeners,observe:function(listener){return listeners.push(listener)},stopObserving:function(fn){return remove(listeners,fn)},toggle:function(){return self(!value)},increment:function(n){return self(value+n)},decrement:function(n){return self(value-n)},toString:function(){return"Observable("+value+")"}});return self};Observable.concat=function(){var args,o;args=1<=arguments.length?__slice.call(arguments,0):[];args=Observable(args);o=Observable(function(){return flatten(args.map(splat))});o.push=args.push;return o};module.exports=Observable;extend=function(){var name,source,sources,target,_i,_len;target=arguments[0],sources=2<=arguments.length?__slice.call(arguments,1):[];for(_i=0,_len=sources.length;_i<_len;_i++){source=sources[_i];for(name in source){target[name]=source[name]}}return target};global.OBSERVABLE_ROOT_HACK=[];autoDeps=function(){return last(global.OBSERVABLE_ROOT_HACK)};magicDependency=function(self){var observerStack;if(observerStack=autoDeps()){return observerStack.push(self)}};withBase=function(self,update,fn){var deps,value,_ref;global.OBSERVABLE_ROOT_HACK.push(deps=[]);try{value=fn();if((_ref=self._deps)!=null){_ref.forEach(function(observable){return observable.stopObserving(update)})}self._deps=deps;deps.forEach(function(observable){return observable.observe(update)})}finally{global.OBSERVABLE_ROOT_HACK.pop()}return value};computeDependencies=function(self,fn,update,context){return withBase(self,update,function(){return fn.call(context)})};remove=function(array,value){var index;index=array.indexOf(value);if(index>=0){return array.splice(index,1)[0]}};copy=function(array){return array.concat([])};get=function(arg){if(typeof arg==="function"){return arg()}else{return arg}};splat=function(item){var result,results;results=[];if(typeof item.forEach==="function"){item.forEach(function(i){return results.push(i)})}else{result=get(item);if(result!=null){results.push(result)}}return results};last=function(array){return array[array.length-1]};flatten=function(array){return array.reduce(function(a,b){return a.concat(b)},[])}}.call(this);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
module.exports=require(8)
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC9hcHAuY29mZmVlIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC9jb2ZmZWUvYmluZGluZy5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L2NvZmZlZS90b2Rvcy5jb2ZmZWUiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L3RlbXBsYXRlcy9iaW5kaW5nLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL2NsaWVudC90ZW1wbGF0ZXMvaGVsbG8uanMiLCIvVXNlcnMvZG1pdHJpL2dpdGh1Yi9oYW1sZXQtYm9pbGVycGxhdGUvY2xpZW50L3RlbXBsYXRlcy90b2Rvcy5qcyIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL2hhbWxldC1ib2lsZXJwbGF0ZS9ub2RlX21vZHVsZXMvaGFtbGV0LXJ1bnRpbWUvZGlzdC9ydW50aW1lLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvaGFtbGV0LWJvaWxlcnBsYXRlL25vZGVfbW9kdWxlcy9oYW1sZXQtcnVudGltZS9ub2RlX21vZHVsZXMvb18wL2Rpc3QvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsa0NBQUE7O0FBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxtQkFBUixDQUFmLENBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxrQkFBUixDQURWLENBQUE7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QUE7U0FDQSxJQUFJLENBQUMsV0FBTCxDQUFpQixZQUFBLENBQWEsS0FBYixDQUFqQixFQUZjO0FBQUEsQ0E3QmYsQ0FBQTs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hYQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1haW5UZW1wbGF0ZSA9IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlbGxvJ1xuYmluZGluZyA9IHJlcXVpcmUgJy4vY29mZmVlL2JpbmRpbmcnXG50b2RvcyA9IHJlcXVpcmUgJy4vY29mZmVlL3RvZG9zJ1xuXG5kYXRhID1cblx0dGl0bGU6ICdCdWVub3MgRGlhcywgSGFtbGV0ISdcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBtYWluVGVtcGxhdGUoZGF0YSlcblxuYmluZGluZy5pbml0KClcbnRvZG9zLmluaXQoKVxuIiwiIyBzaW1wbGUgMi13YXkgZGF0YSBiaW5kaW5nIGV4YW1wbGVcblxuYmluZGluZ1RlbXBsYXRlID0gcmVxdWlyZSAnLi4vdGVtcGxhdGVzL2JpbmRpbmcnXG5PYnNlcnZhYmxlID0gcmVxdWlyZSAnb18wJ1xuXG5tb2RlbCA9XG5cdG5hbWU6IC0+XG5cdFx0QGZpcnN0KCkgKyAnICcgKyBAbGFzdCgpXG5cdGZpcnN0OiBPYnNlcnZhYmxlICdQcmluY2UnXG5cdGxhc3Q6IE9ic2VydmFibGUgJ0hhbWxldCdcblxuZXhwb3J0cy5pbml0ID0gLT5cblx0dmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdiaW5kaW5nJ1xuXHR2aWV3LmFwcGVuZENoaWxkIGJpbmRpbmdUZW1wbGF0ZShtb2RlbClcbiIsIiMgc2ltcGxlIHRvLWRvIGFwcCBleGFtcGxlXG5cbnRvZG9UZW1wbGF0ZSA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy90b2Rvcydcbk9ic2VydmFibGUgPSByZXF1aXJlICdvXzAnXG5cbmNvbGxlY3Rpb24gPSBPYnNlcnZhYmxlIFtdXG5cbmNoZWNrQ29tcGxldGVBbGwgPSBPYnNlcnZhYmxlIGZhbHNlXG5jaGVja0NvbXBsZXRlQWxsLm9ic2VydmUgKHZhbCkgLT5cblx0Y29sbGVjdGlvbi5mb3JFYWNoIChpKSAtPlxuXHRcdGkuY2hlY2tlZCh2YWwpXG5cbm1vZGVsID1cblx0dmFsdWU6IE9ic2VydmFibGUgJydcblx0dG9kb3M6IGNvbGxlY3Rpb25cblx0Y2hlY2tDb21wbGV0ZUFsbDogY2hlY2tDb21wbGV0ZUFsbFxuXG5cdGFkZDogKGUpIC0+XG5cdFx0cmV0dXJuIHVubGVzcyBlLmtleUNvZGUgaXMgMTNcblx0XHRyZXR1cm4gdW5sZXNzIEB2YWx1ZSgpIGlzbnQgJydcblxuXHRcdHRvZG8gPVxuXHRcdFx0ZGVzY3JpcHRpb246IEB2YWx1ZSgpXG5cdFx0XHRjaGVja2VkOiBPYnNlcnZhYmxlIGZhbHNlXG5cdFx0XHRjbGFzczogLT5cblx0XHRcdFx0J2NvbXBsZXRlZCcgaWYgdG9kby5jaGVja2VkKClcblxuXHRcdEB0b2Rvcy5wdXNoIHRvZG9cblx0XHRAdmFsdWUgJydcblxuXG5leHBvcnRzLmluaXQgPSAtPlxuXHR2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3RvZG8nXG5cdHZpZXcuYXBwZW5kQ2hpbGQgdG9kb1RlbXBsYXRlKG1vZGVsKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9fcnVudGltZTtcbiAgICBfX3J1bnRpbWUgPSByZXF1aXJlKFwiaGFtbGV0LXJ1bnRpbWVcIikodGhpcyk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgIF9fcnVudGltZS50ZXh0KHRoaXMubmFtZSk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInZhbHVlXCIsIHRoaXMuZmlyc3QpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aGlzLmxhc3QpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICB9KS5jYWxsKGRhdGEpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfX3J1bnRpbWU7XG4gICAgX19ydW50aW1lID0gcmVxdWlyZShcImhhbWxldC1ydW50aW1lXCIpKHRoaXMpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpKTtcbiAgICBfX3J1bnRpbWUudGV4dCh0aGlzLnRpdGxlKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgcmV0dXJuIF9fcnVudGltZS5wb3AoKTtcbiAgfSkuY2FsbChkYXRhKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgX19ydW50aW1lO1xuICAgIF9fcnVudGltZSA9IHJlcXVpcmUoXCJoYW1sZXQtcnVudGltZVwiKSh0aGlzKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgX19ydW50aW1lLnRleHQoXCJUb2RvcyBieSBIYW1sZXRcXG5cIik7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aGlzLnZhbHVlKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJXaGF0IG5lZWRzIHRvIGJlIGRvbmU/XCIpO1xuICAgIF9fcnVudGltZS5hdHRyaWJ1dGUoXCJvbmtleWRvd25cIiwgdGhpcy5hZGQpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIikpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgX19ydW50aW1lLmF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwiY2hlY2tlZFwiLCB0aGlzLmNoZWNrQ29tcGxldGVBbGwpO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgX19ydW50aW1lLnRleHQoXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVxcblwiKTtcbiAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgX19ydW50aW1lLnBvcCgpO1xuICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgX19ydW50aW1lLmVhY2godGhpcy50b2RvcywgZnVuY3Rpb24oKSB7XG4gICAgICBfX3J1bnRpbWUucHVzaChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgX19ydW50aW1lLnB1c2goZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpKTtcbiAgICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgICBfX3J1bnRpbWUuYXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgX19ydW50aW1lLmF0dHJpYnV0ZShcImNoZWNrZWRcIiwgdGhpcy5jaGVja2VkKTtcbiAgICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICAgIF9fcnVudGltZS5wdXNoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgIF9fcnVudGltZS5jbGFzc2VzKFwiaXRlbVwiLCB0aGlzW1wiY2xhc3NcIl0pO1xuICAgICAgX19ydW50aW1lLnRleHQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgICBfX3J1bnRpbWUucG9wKCk7XG4gICAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICAgIH0pO1xuICAgIF9fcnVudGltZS5wb3AoKTtcbiAgICByZXR1cm4gX19ydW50aW1lLnBvcCgpO1xuICB9KS5jYWxsKGRhdGEpO1xufTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbihmdW5jdGlvbigpIHtcbiAgdmFyIE9ic2VydmFibGUsIFJ1bnRpbWUsIGJpbmRFdmVudCwgYmluZE9ic2VydmFibGUsIGNsZWFudXAsIGNvbnRlbnRCaW5kLCBlbXB0eSwgZXZlbnROYW1lcywgaW5pdENvbnRlbnQsIGlzRXZlbnQsIGlzRnJhZ21lbnQsIHJlbW92ZSwgc3BlY2lhbEJpbmRpbmdzLCB2YWx1ZUJpbmQsIHZhbHVlSW5kZXhPZixcbiAgICBfX3NsaWNlID0gW10uc2xpY2U7XG5cbiAgT2JzZXJ2YWJsZSA9IHJlcXVpcmUoXCJvXzBcIik7XG5cbiAgZXZlbnROYW1lcyA9IFwiYWJvcnRcXG5ibHVyXFxuY2hhbmdlXFxuY2xpY2tcXG5kYmxjbGlja1xcbmRyYWdcXG5kcmFnZW5kXFxuZHJhZ2VudGVyXFxuZHJhZ2xlYXZlXFxuZHJhZ292ZXJcXG5kcmFnc3RhcnRcXG5kcm9wXFxuZXJyb3JcXG5mb2N1c1xcbmlucHV0XFxua2V5ZG93blxcbmtleXByZXNzXFxua2V5dXBcXG5sb2FkXFxubW91c2Vkb3duXFxubW91c2Vtb3ZlXFxubW91c2VvdXRcXG5tb3VzZW92ZXJcXG5tb3VzZXVwXFxucmVzZXRcXG5yZXNpemVcXG5zY3JvbGxcXG5zZWxlY3RcXG5zdWJtaXRcXG50b3VjaGNhbmNlbFxcbnRvdWNoZW5kXFxudG91Y2hlbnRlclxcbnRvdWNobGVhdmVcXG50b3VjaG1vdmVcXG50b3VjaHN0YXJ0XFxudW5sb2FkXCIuc3BsaXQoXCJcXG5cIik7XG5cbiAgaXNFdmVudCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZXZlbnROYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfTtcblxuICBpc0ZyYWdtZW50ID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiAobm9kZSAhPSBudWxsID8gbm9kZS5ub2RlVHlwZSA6IHZvaWQgMCkgPT09IDExO1xuICB9O1xuXG4gIGluaXRDb250ZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHZhciBhbGxDb250ZW50LCB1cGRhdGU7XG4gICAgaWYgKGVsZW1lbnQuX2hhbWxldF9jb250ZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5faGFtbGV0X2NvbnRlbnQ7XG4gICAgfVxuICAgIGFsbENvbnRlbnQgPSAoZWxlbWVudC5faGFtbGV0X2NvbnRlbnQgIT0gbnVsbCA/IGVsZW1lbnQuX2hhbWxldF9jb250ZW50IDogZWxlbWVudC5faGFtbGV0X2NvbnRlbnQgPSBPYnNlcnZhYmxlLmNvbmNhdCgpKTtcbiAgICB1cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGVtcHR5KGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIGFsbENvbnRlbnQuZWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCBhbGxDb250ZW50LCBudWxsLCB1cGRhdGUpO1xuICAgIHJldHVybiBhbGxDb250ZW50O1xuICB9O1xuXG4gIGNvbnRlbnRCaW5kID0gZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUpIHtcbiAgICBpbml0Q29udGVudChlbGVtZW50KS5wdXNoKHZhbHVlKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICB2YWx1ZUJpbmQgPSBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZSwgY29udGV4dCkge1xuICAgIHZhciB1cGRhdGU7XG4gICAgdmFsdWUgPSBPYnNlcnZhYmxlKHZhbHVlLCBjb250ZXh0KTtcbiAgICBzd2l0Y2ggKGVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjpcbiAgICAgICAgZWxlbWVudC5vbmlucHV0ID0gZWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBvcHRpb25WYWx1ZSwgX3JlZiwgX3ZhbHVlO1xuICAgICAgICAgIF9yZWYgPSB0aGlzLmNoaWxkcmVuW3RoaXMuc2VsZWN0ZWRJbmRleF0sIG9wdGlvblZhbHVlID0gX3JlZi52YWx1ZSwgX3ZhbHVlID0gX3JlZi5fdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlKF92YWx1ZSB8fCBvcHRpb25WYWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgICAgZWxlbWVudC5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBpZiAoKG9wdGlvbnMgPSBlbGVtZW50Ll9vcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWUgPSAodHlwZW9mIG5ld1ZhbHVlLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBuZXdWYWx1ZS52YWx1ZSgpIDogdm9pZCAwKSB8fCBuZXdWYWx1ZS52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSB2YWx1ZUluZGV4T2Yob3B0aW9ucywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIHVwZGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWxlbWVudC5vbmlucHV0ID0gZWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZShlbGVtZW50LnZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHNwZWNpYWxCaW5kaW5ncyA9IHtcbiAgICBJTlBVVDoge1xuICAgICAgY2hlY2tlZDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUsIGNvbnRleHQpIHtcbiAgICAgICAgZWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHZhbHVlKGVsZW1lbnQuY2hlY2tlZCkgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5jaGVja2VkID0gbmV3VmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgU0VMRUNUOiB7XG4gICAgICBvcHRpb25zOiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHVwZGF0ZVZhbHVlcztcbiAgICAgICAgdmFsdWVzID0gT2JzZXJ2YWJsZSh2YWx1ZXMsIGNvbnRleHQpO1xuICAgICAgICB1cGRhdGVWYWx1ZXMgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgICBlbXB0eShlbGVtZW50KTtcbiAgICAgICAgICBlbGVtZW50Ll9vcHRpb25zID0gdmFsdWVzO1xuICAgICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbiwgb3B0aW9uTmFtZSwgb3B0aW9uVmFsdWU7XG4gICAgICAgICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgb3B0aW9uLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICBvcHRpb25WYWx1ZSA9ICh2YWx1ZSAhPSBudWxsID8gdmFsdWUudmFsdWUgOiB2b2lkIDApIHx8IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb3B0aW9uVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluZE9ic2VydmFibGUob3B0aW9uLCBvcHRpb25WYWx1ZSwgdmFsdWUsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3B0aW9uTmFtZSA9ICh2YWx1ZSAhPSBudWxsID8gdmFsdWUubmFtZSA6IHZvaWQgMCkgfHwgdmFsdWU7XG4gICAgICAgICAgICBiaW5kT2JzZXJ2YWJsZShvcHRpb24sIG9wdGlvbk5hbWUsIHZhbHVlLCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZWxlbWVudC5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWVzLCBjb250ZXh0LCB1cGRhdGVWYWx1ZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBiaW5kT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCB1cGRhdGUpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZSwgb2JzZXJ2ZSwgdW5vYnNlcnZlO1xuICAgIG9ic2VydmFibGUgPSBPYnNlcnZhYmxlKHZhbHVlLCBjb250ZXh0KTtcbiAgICBvYnNlcnZlID0gZnVuY3Rpb24oKSB7XG4gICAgICBvYnNlcnZhYmxlLm9ic2VydmUodXBkYXRlKTtcbiAgICAgIHJldHVybiB1cGRhdGUob2JzZXJ2YWJsZSgpKTtcbiAgICB9O1xuICAgIHVub2JzZXJ2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG9ic2VydmFibGUuc3RvcE9ic2VydmluZyh1cGRhdGUpO1xuICAgIH07XG4gICAgb2JzZXJ2ZSgpO1xuICAgIChlbGVtZW50Ll9oYW1sZXRfY2xlYW51cCB8fCAoZWxlbWVudC5faGFtbGV0X2NsZWFudXAgPSBbXSkpLnB1c2godW5vYnNlcnZlKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBiaW5kRXZlbnQgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lLCBmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBlbGVtZW50W25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIGNsZWFudXAgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIF9yZWY7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbGVtZW50LmNoaWxkcmVuLCBjbGVhbnVwKTtcbiAgICBpZiAoKF9yZWYgPSBlbGVtZW50Ll9oYW1sZXRfY2xlYW51cCkgIT0gbnVsbCkge1xuICAgICAgX3JlZi5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gbWV0aG9kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlIGVsZW1lbnQuX2hhbWxldF9jbGVhbnVwO1xuICB9O1xuXG4gIFJ1bnRpbWUgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIGFwcGVuZCwgYnVmZmVyLCBjbGFzc2VzLCBjb250ZXh0VG9wLCBpZCwgbGFzdFBhcmVudCwgb2JzZXJ2ZUF0dHJpYnV0ZSwgb2JzZXJ2ZVRleHQsIHBvcCwgcHVzaCwgcmVuZGVyLCBzZWxmLCBzdGFjaywgdG9wLCB3aXRoQ29udGV4dDtcbiAgICBzdGFjayA9IFtdO1xuICAgIGxhc3RQYXJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbGVtZW50LCBpO1xuICAgICAgaSA9IHN0YWNrLmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAoKGVsZW1lbnQgPSBzdGFja1tpXSkgJiYgaXNGcmFnbWVudChlbGVtZW50KSkge1xuICAgICAgICBpIC09IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnRleHRUb3AgPSB2b2lkIDA7XG4gICAgdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gfHwgY29udGV4dFRvcDtcbiAgICB9O1xuICAgIGFwcGVuZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICB2YXIgcGFyZW50LCBfcmVmO1xuICAgICAgcGFyZW50ID0gdG9wKCk7XG4gICAgICBpZiAoaXNGcmFnbWVudChjaGlsZCkgJiYgY2hpbGQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2hpbGQgPSBjaGlsZC5jaGlsZE5vZGVzWzBdO1xuICAgICAgfVxuICAgICAgaWYgKChfcmVmID0gdG9wKCkpICE9IG51bGwpIHtcbiAgICAgICAgX3JlZi5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgICBwdXNoID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHJldHVybiBzdGFjay5wdXNoKGNoaWxkKTtcbiAgICB9O1xuICAgIHBvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFwcGVuZChzdGFjay5wb3AoKSk7XG4gICAgfTtcbiAgICByZW5kZXIgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgcHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gcG9wKCk7XG4gICAgfTtcbiAgICBpZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsZW1lbnQsIHNvdXJjZXMsIHVwZGF0ZSwgdmFsdWU7XG4gICAgICBzb3VyY2VzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGVsZW1lbnQgPSB0b3AoKTtcbiAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudC5pZCA9IG5ld1ZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3NzaWJsZVZhbHVlcztcbiAgICAgICAgcG9zc2libGVWYWx1ZXMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oaWRWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiBpZFZhbHVlICE9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcG9zc2libGVWYWx1ZXNbcG9zc2libGVWYWx1ZXMubGVuZ3RoIC0gMV07XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGJpbmRPYnNlcnZhYmxlKGVsZW1lbnQsIHZhbHVlLCBjb250ZXh0LCB1cGRhdGUpO1xuICAgIH07XG4gICAgY2xhc3NlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsZW1lbnQsIHNvdXJjZXMsIHVwZGF0ZTtcbiAgICAgIHNvdXJjZXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgZWxlbWVudCA9IHRvcCgpO1xuICAgICAgdXBkYXRlID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZSA9IG5ld1ZhbHVlO1xuICAgICAgfTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBvc3NpYmxlVmFsdWVzO1xuICAgICAgICAgIHBvc3NpYmxlVmFsdWVzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3VyY2UuY2FsbChjb250ZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKHNvdXJjZVZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlVmFsdWUgIT0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcG9zc2libGVWYWx1ZXMuam9pbihcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgdXBkYXRlKTtcbiAgICAgIH0pKGNvbnRleHQpO1xuICAgIH07XG4gICAgb2JzZXJ2ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgYmluZGluZywgZWxlbWVudCwgbm9kZU5hbWUsIF9yZWY7XG4gICAgICBlbGVtZW50ID0gdG9wKCk7XG4gICAgICBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG4gICAgICBpZiAobmFtZSA9PT0gXCJ2YWx1ZVwiKSB7XG4gICAgICAgIHZhbHVlQmluZChlbGVtZW50LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGJpbmRpbmcgPSAoX3JlZiA9IHNwZWNpYWxCaW5kaW5nc1tub2RlTmFtZV0pICE9IG51bGwgPyBfcmVmW25hbWVdIDogdm9pZCAwKSB7XG4gICAgICAgIGJpbmRpbmcoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIGlmIChuYW1lLm1hdGNoKC9eb24vKSAmJiBpc0V2ZW50KG5hbWUuc3Vic3RyKDIpKSkge1xuICAgICAgICBiaW5kRXZlbnQoZWxlbWVudCwgbmFtZSwgdmFsdWUsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIGlmIChpc0V2ZW50KG5hbWUpKSB7XG4gICAgICAgIGJpbmRFdmVudChlbGVtZW50LCBcIm9uXCIgKyBuYW1lLCB2YWx1ZSwgY29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiaW5kT2JzZXJ2YWJsZShlbGVtZW50LCB2YWx1ZSwgY29udGV4dCwgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICBpZiAoKG5ld1ZhbHVlICE9IG51bGwpICYmIG5ld1ZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIG9ic2VydmVUZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBlbGVtZW50LCB1cGRhdGU7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgdXBkYXRlID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB9O1xuICAgICAgYmluZE9ic2VydmFibGUoZWxlbWVudCwgdmFsdWUsIGNvbnRleHQsIHVwZGF0ZSk7XG4gICAgICByZXR1cm4gcmVuZGVyKGVsZW1lbnQpO1xuICAgIH07XG4gICAgd2l0aENvbnRleHQgPSBmdW5jdGlvbihuZXdDb250ZXh0LCBuZXdDb250ZXh0VG9wLCBmbikge1xuICAgICAgdmFyIG9sZENvbnRleHQ7XG4gICAgICBvbGRDb250ZXh0ID0gY29udGV4dDtcbiAgICAgIGNvbnRleHQgPSBuZXdDb250ZXh0O1xuICAgICAgY29udGV4dFRvcCA9IG5ld0NvbnRleHRUb3A7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbnRleHRUb3AgPSB2b2lkIDA7XG4gICAgICAgIGNvbnRleHQgPSBvbGRDb250ZXh0O1xuICAgICAgfVxuICAgIH07XG4gICAgYnVmZmVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBfcmVmLCBfcmVmMSwgX3JlZjI7XG4gICAgICB2YWx1ZSA9IE9ic2VydmFibGUodmFsdWUsIGNvbnRleHQpO1xuICAgICAgc3dpdGNoICgoX3JlZiA9IHZhbHVlKCkpICE9IG51bGwgPyBfcmVmLm5vZGVUeXBlIDogdm9pZCAwKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIGNvbnRlbnRCaW5kKHRvcCgpLCB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlKCk7XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKChfcmVmMSA9IHZhbHVlKCkpICE9IG51bGwgPyAoX3JlZjIgPSBfcmVmMVswXSkgIT0gbnVsbCA/IF9yZWYyLm5vZGVUeXBlIDogdm9pZCAwIDogdm9pZCAwKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIHJldHVybiBjb250ZW50QmluZCh0b3AoKSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic2VydmVUZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIHNlbGYgPSB7XG4gICAgICBwdXNoOiBwdXNoLFxuICAgICAgcG9wOiBwb3AsXG4gICAgICBpZDogaWQsXG4gICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgYXR0cmlidXRlOiBvYnNlcnZlQXR0cmlidXRlLFxuICAgICAgdGV4dDogYnVmZmVyLFxuICAgICAgZmlsdGVyOiBmdW5jdGlvbihuYW1lLCBjb250ZW50KSB7fSxcbiAgICAgIGVhY2g6IGZ1bmN0aW9uKGl0ZW1zLCBmbikge1xuICAgICAgICB2YXIgZWxlbWVudHMsIHBhcmVudCwgcmVwbGFjZTtcbiAgICAgICAgaXRlbXMgPSBPYnNlcnZhYmxlKGl0ZW1zLCBjb250ZXh0KTtcbiAgICAgICAgZWxlbWVudHMgPSBudWxsO1xuICAgICAgICBwYXJlbnQgPSBsYXN0UGFyZW50KCk7XG4gICAgICAgIGl0ZW1zLm9ic2VydmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2UoZWxlbWVudHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVwbGFjZSA9IGZ1bmN0aW9uKG9sZEVsZW1lbnRzKSB7XG4gICAgICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgICBpdGVtcy5lYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnJheSkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHdpdGhDb250ZXh0KGl0ZW0sIHBhcmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID0gZm4uY2FsbChpdGVtLCBpdGVtLCBpbmRleCwgYXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXNGcmFnbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoLmFwcGx5KGVsZW1lbnRzLCBlbGVtZW50LmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBvbGRFbGVtZW50cyAhPSBudWxsID8gb2xkRWxlbWVudHMuZm9yRWFjaChyZW1vdmUpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVwbGFjZShudWxsLCBpdGVtcyk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBSdW50aW1lLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gUnVudGltZTtcblxuICBlbXB0eSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgY2hpbGQsIF9yZXN1bHRzO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgd2hpbGUgKGNoaWxkID0gbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICBfcmVzdWx0cy5wdXNoKG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG4gIHZhbHVlSW5kZXhPZiA9IGZ1bmN0aW9uKG9wdGlvbnMsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm1hcChmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbi50b1N0cmluZygpO1xuICAgICAgfSkuaW5kZXhPZih2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH07XG5cbiAgcmVtb3ZlID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHZhciBfcmVmO1xuICAgIGNsZWFudXAoZWxlbWVudCk7XG4gICAgaWYgKChfcmVmID0gZWxlbWVudC5wYXJlbnROb2RlKSAhPSBudWxsKSB7XG4gICAgICBfcmVmLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbiFmdW5jdGlvbigpe3ZhciBPYnNlcnZhYmxlLGF1dG9EZXBzLGNvbXB1dGVEZXBlbmRlbmNpZXMsY29weSxleHRlbmQsZmxhdHRlbixnZXQsbGFzdCxtYWdpY0RlcGVuZGVuY3kscmVtb3ZlLHNwbGF0LHdpdGhCYXNlLF9fc2xpY2U9W10uc2xpY2U7T2JzZXJ2YWJsZT1mdW5jdGlvbih2YWx1ZSxjb250ZXh0KXt2YXIgY2hhbmdlZCxmbixsaXN0ZW5lcnMsbm90aWZ5LG5vdGlmeVJldHVybmluZyxzZWxmO2lmKHR5cGVvZih2YWx1ZSE9bnVsbD92YWx1ZS5vYnNlcnZlOnZvaWQgMCk9PT1cImZ1bmN0aW9uXCIpe3JldHVybiB2YWx1ZX1saXN0ZW5lcnM9W107bm90aWZ5PWZ1bmN0aW9uKG5ld1ZhbHVlKXtyZXR1cm4gY29weShsaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpe3JldHVybiBsaXN0ZW5lcihuZXdWYWx1ZSl9KX07aWYodHlwZW9mIHZhbHVlPT09XCJmdW5jdGlvblwiKXtmbj12YWx1ZTtzZWxmPWZ1bmN0aW9uKCl7bWFnaWNEZXBlbmRlbmN5KHNlbGYpO3JldHVybiB2YWx1ZX07c2VsZi5lYWNoPWZ1bmN0aW9uKCl7dmFyIGFyZ3MsX3JlZjthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTttYWdpY0RlcGVuZGVuY3koc2VsZik7cmV0dXJuKF9yZWY9c3BsYXQodmFsdWUpKS5mb3JFYWNoLmFwcGx5KF9yZWYsYXJncyl9O2NoYW5nZWQ9ZnVuY3Rpb24oKXt2YWx1ZT1jb21wdXRlRGVwZW5kZW5jaWVzKHNlbGYsZm4sY2hhbmdlZCxjb250ZXh0KTtyZXR1cm4gbm90aWZ5KHZhbHVlKX07dmFsdWU9Y29tcHV0ZURlcGVuZGVuY2llcyhzZWxmLGZuLGNoYW5nZWQsY29udGV4dCl9ZWxzZXtzZWxmPWZ1bmN0aW9uKG5ld1ZhbHVlKXtpZihhcmd1bWVudHMubGVuZ3RoPjApe2lmKHZhbHVlIT09bmV3VmFsdWUpe3ZhbHVlPW5ld1ZhbHVlO25vdGlmeShuZXdWYWx1ZSl9fWVsc2V7bWFnaWNEZXBlbmRlbmN5KHNlbGYpfXJldHVybiB2YWx1ZX19c2VsZi5lYWNoPWZ1bmN0aW9uKCl7dmFyIGFyZ3MsX3JlZjthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTttYWdpY0RlcGVuZGVuY3koc2VsZik7aWYodmFsdWUhPW51bGwpe3JldHVybihfcmVmPVt2YWx1ZV0pLmZvckVhY2guYXBwbHkoX3JlZixhcmdzKX19O2lmKEFycmF5LmlzQXJyYXkodmFsdWUpKXtbXCJjb25jYXRcIixcImV2ZXJ5XCIsXCJmaWx0ZXJcIixcImZvckVhY2hcIixcImluZGV4T2ZcIixcImpvaW5cIixcImxhc3RJbmRleE9mXCIsXCJtYXBcIixcInJlZHVjZVwiLFwicmVkdWNlUmlnaHRcIixcInNsaWNlXCIsXCJzb21lXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKXtyZXR1cm4gc2VsZlttZXRob2RdPWZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP19fc2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107bWFnaWNEZXBlbmRlbmN5KHNlbGYpO3JldHVybiB2YWx1ZVttZXRob2RdLmFwcGx5KHZhbHVlLGFyZ3MpfX0pO1tcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNwbGljZVwiLFwic29ydFwiLFwidW5zaGlmdFwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCl7cmV0dXJuIHNlbGZbbWV0aG9kXT1mdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9fX3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO3JldHVybiBub3RpZnlSZXR1cm5pbmcodmFsdWVbbWV0aG9kXS5hcHBseSh2YWx1ZSxhcmdzKSl9fSk7bm90aWZ5UmV0dXJuaW5nPWZ1bmN0aW9uKHJldHVyblZhbHVlKXtub3RpZnkodmFsdWUpO3JldHVybiByZXR1cm5WYWx1ZX07ZXh0ZW5kKHNlbGYse2VhY2g6ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTtzZWxmLmZvckVhY2guYXBwbHkoc2VsZixhcmdzKTtyZXR1cm4gc2VsZn0scmVtb3ZlOmZ1bmN0aW9uKG9iamVjdCl7dmFyIGluZGV4O2luZGV4PXZhbHVlLmluZGV4T2Yob2JqZWN0KTtpZihpbmRleD49MCl7cmV0dXJuIG5vdGlmeVJldHVybmluZyh2YWx1ZS5zcGxpY2UoaW5kZXgsMSlbMF0pfX0sZ2V0OmZ1bmN0aW9uKGluZGV4KXtyZXR1cm4gdmFsdWVbaW5kZXhdfSxmaXJzdDpmdW5jdGlvbigpe3JldHVybiB2YWx1ZVswXX0sbGFzdDpmdW5jdGlvbigpe3JldHVybiB2YWx1ZVt2YWx1ZS5sZW5ndGgtMV19fSl9ZXh0ZW5kKHNlbGYse2xpc3RlbmVyczpsaXN0ZW5lcnMsb2JzZXJ2ZTpmdW5jdGlvbihsaXN0ZW5lcil7cmV0dXJuIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKX0sc3RvcE9ic2VydmluZzpmdW5jdGlvbihmbil7cmV0dXJuIHJlbW92ZShsaXN0ZW5lcnMsZm4pfSx0b2dnbGU6ZnVuY3Rpb24oKXtyZXR1cm4gc2VsZighdmFsdWUpfSxpbmNyZW1lbnQ6ZnVuY3Rpb24obil7cmV0dXJuIHNlbGYodmFsdWUrbil9LGRlY3JlbWVudDpmdW5jdGlvbihuKXtyZXR1cm4gc2VsZih2YWx1ZS1uKX0sdG9TdHJpbmc6ZnVuY3Rpb24oKXtyZXR1cm5cIk9ic2VydmFibGUoXCIrdmFsdWUrXCIpXCJ9fSk7cmV0dXJuIHNlbGZ9O09ic2VydmFibGUuY29uY2F0PWZ1bmN0aW9uKCl7dmFyIGFyZ3MsbzthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTthcmdzPU9ic2VydmFibGUoYXJncyk7bz1PYnNlcnZhYmxlKGZ1bmN0aW9uKCl7cmV0dXJuIGZsYXR0ZW4oYXJncy5tYXAoc3BsYXQpKX0pO28ucHVzaD1hcmdzLnB1c2g7cmV0dXJuIG99O21vZHVsZS5leHBvcnRzPU9ic2VydmFibGU7ZXh0ZW5kPWZ1bmN0aW9uKCl7dmFyIG5hbWUsc291cmNlLHNvdXJjZXMsdGFyZ2V0LF9pLF9sZW47dGFyZ2V0PWFyZ3VtZW50c1swXSxzb3VyY2VzPTI8PWFyZ3VtZW50cy5sZW5ndGg/X19zbGljZS5jYWxsKGFyZ3VtZW50cywxKTpbXTtmb3IoX2k9MCxfbGVuPXNvdXJjZXMubGVuZ3RoO19pPF9sZW47X2krKyl7c291cmNlPXNvdXJjZXNbX2ldO2ZvcihuYW1lIGluIHNvdXJjZSl7dGFyZ2V0W25hbWVdPXNvdXJjZVtuYW1lXX19cmV0dXJuIHRhcmdldH07Z2xvYmFsLk9CU0VSVkFCTEVfUk9PVF9IQUNLPVtdO2F1dG9EZXBzPWZ1bmN0aW9uKCl7cmV0dXJuIGxhc3QoZ2xvYmFsLk9CU0VSVkFCTEVfUk9PVF9IQUNLKX07bWFnaWNEZXBlbmRlbmN5PWZ1bmN0aW9uKHNlbGYpe3ZhciBvYnNlcnZlclN0YWNrO2lmKG9ic2VydmVyU3RhY2s9YXV0b0RlcHMoKSl7cmV0dXJuIG9ic2VydmVyU3RhY2sucHVzaChzZWxmKX19O3dpdGhCYXNlPWZ1bmN0aW9uKHNlbGYsdXBkYXRlLGZuKXt2YXIgZGVwcyx2YWx1ZSxfcmVmO2dsb2JhbC5PQlNFUlZBQkxFX1JPT1RfSEFDSy5wdXNoKGRlcHM9W10pO3RyeXt2YWx1ZT1mbigpO2lmKChfcmVmPXNlbGYuX2RlcHMpIT1udWxsKXtfcmVmLmZvckVhY2goZnVuY3Rpb24ob2JzZXJ2YWJsZSl7cmV0dXJuIG9ic2VydmFibGUuc3RvcE9ic2VydmluZyh1cGRhdGUpfSl9c2VsZi5fZGVwcz1kZXBzO2RlcHMuZm9yRWFjaChmdW5jdGlvbihvYnNlcnZhYmxlKXtyZXR1cm4gb2JzZXJ2YWJsZS5vYnNlcnZlKHVwZGF0ZSl9KX1maW5hbGx5e2dsb2JhbC5PQlNFUlZBQkxFX1JPT1RfSEFDSy5wb3AoKX1yZXR1cm4gdmFsdWV9O2NvbXB1dGVEZXBlbmRlbmNpZXM9ZnVuY3Rpb24oc2VsZixmbix1cGRhdGUsY29udGV4dCl7cmV0dXJuIHdpdGhCYXNlKHNlbGYsdXBkYXRlLGZ1bmN0aW9uKCl7cmV0dXJuIGZuLmNhbGwoY29udGV4dCl9KX07cmVtb3ZlPWZ1bmN0aW9uKGFycmF5LHZhbHVlKXt2YXIgaW5kZXg7aW5kZXg9YXJyYXkuaW5kZXhPZih2YWx1ZSk7aWYoaW5kZXg+PTApe3JldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsMSlbMF19fTtjb3B5PWZ1bmN0aW9uKGFycmF5KXtyZXR1cm4gYXJyYXkuY29uY2F0KFtdKX07Z2V0PWZ1bmN0aW9uKGFyZyl7aWYodHlwZW9mIGFyZz09PVwiZnVuY3Rpb25cIil7cmV0dXJuIGFyZygpfWVsc2V7cmV0dXJuIGFyZ319O3NwbGF0PWZ1bmN0aW9uKGl0ZW0pe3ZhciByZXN1bHQscmVzdWx0cztyZXN1bHRzPVtdO2lmKHR5cGVvZiBpdGVtLmZvckVhY2g9PT1cImZ1bmN0aW9uXCIpe2l0ZW0uZm9yRWFjaChmdW5jdGlvbihpKXtyZXR1cm4gcmVzdWx0cy5wdXNoKGkpfSl9ZWxzZXtyZXN1bHQ9Z2V0KGl0ZW0pO2lmKHJlc3VsdCE9bnVsbCl7cmVzdWx0cy5wdXNoKHJlc3VsdCl9fXJldHVybiByZXN1bHRzfTtsYXN0PWZ1bmN0aW9uKGFycmF5KXtyZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoLTFdfTtmbGF0dGVuPWZ1bmN0aW9uKGFycmF5KXtyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEuY29uY2F0KGIpfSxbXSl9fS5jYWxsKHRoaXMpO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
