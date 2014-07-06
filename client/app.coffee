mainTemplate = require './templates/hello'

data =
	title: 'Hello World Hamlet!'

func = (a) =>
	b = 10

	return a * b

console.log func(2)

document.body.appendChild mainTemplate(data)
