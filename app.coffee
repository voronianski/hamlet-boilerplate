env = process.env.NODE_ENV or 'development'

express = require 'express'
http = require 'http'
path = require 'path'
swig = require 'swig'
address = require 'network-address'

app = express()

app.set 'port', process.env.PORT or 9090
app.engine 'html', swig.renderFile
app.set 'view engine', 'html'
app.set 'views', __dirname + '/src/views'
app.set 'view cache', env is 'production'
swig.setDefaults(
	cache: if env is 'production' then 'memory' else false,
	locals: env: env
)
app.use express.static path.join(__dirname, 'client/public')

app.get '*', (req, res) ->
	res.render 'master'

http.createServer(app).listen app.get('port'), ->
	console.log 'app is listening on ' + address() + ':' + app.get 'port'
