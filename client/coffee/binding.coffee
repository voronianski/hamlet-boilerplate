# simple 2-way data binding example

bindingTemplate = require '../templates/binding'
Observable = require 'o_0'

model =
	name: ->
		@first() + ' ' + @last()
	first: Observable 'Prince'
	last: Observable 'Hamlet'

exports.init = () ->
	view = document.getElementById 'binding'
	view.appendChild bindingTemplate(model)
