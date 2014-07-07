mainTemplate = require './templates/hello'
binding = require './coffee/binding'
todos = require './coffee/todos'

data =
	title: 'Buenos Dias, Hamlet!'

document.body.appendChild mainTemplate(data)

binding.init()
todos.init()
