# simple to-do app example

todoTemplate = require '../templates/todos'
Observable = require 'o_0'

collection = Observable []

model =
	value: Observable ''
	todos: collection
	add: (e) ->
		return unless e.keyCode is 13
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
