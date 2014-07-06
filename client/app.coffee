mainTemplate = require './templates/hello'
binding = require './coffee/binding'

data =
	title: 'Buenos Dias, Hamlet!'

document.body.appendChild mainTemplate(data)

binding.init()
