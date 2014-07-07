# hello world example

helloTemplate = require '../templates/hello'

data =
	title: 'Buenos Dias, Hamlet!'

exports.init = ->
	view = document.getElementById 'hello'
	view.appendChild helloTemplate(data)
