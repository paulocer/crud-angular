const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8085/',
    secure: false,
    logLevel: 'debug'
  },
  {
    context: ["*"],
    target: "http://viacep.com.br/ws/",
    secure: false,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
