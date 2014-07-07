# simple to-do app example

todoTemplate = require '../templates/todos'
Observable = require 'o_0'

collection = Observable []

checkCompleteAll = Observable false
checkCompleteAll.observe (val) ->
	collection.forEach (i) ->
		i.checked(val)

model =
	value: Observable ''
	todos: collection
	checkCompleteAll: checkCompleteAll

	add: (e) ->
		return unless e.keyCode is 13
		return unless @value() isnt ''

		todo =
			description: @value()
			checked: Observable false
			class: ->
				'completed' if todo.checked()

		@todos.push todo
		@value ''


exports.init = ->
	view = document.getElementById 'todo'
	view.appendChild todoTemplate(model)
