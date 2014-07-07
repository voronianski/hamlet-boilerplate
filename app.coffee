express = require 'express'
http = require 'http'
path = require 'path'
address = require 'network-address'

app = express()

app.set 'port', process.env.PORT or 9090
app.set 'views', __dirname + '/src/views'
app.set 'view engine', 'ejs'
app.use express.static path.join(__dirname, 'client/public')

app.get '*', (req, res) ->
	res.render 'master'

http.createServer(app).listen app.get('port'), () ->
	console.log 'app is listening on ' + address() + ':' + app.get 'port'
