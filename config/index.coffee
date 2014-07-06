util = require 'util'

env = process.env.NODE_ENV || 'development'
config = util.format '/%s.config.js', env

module.exports = require __dirname + config
