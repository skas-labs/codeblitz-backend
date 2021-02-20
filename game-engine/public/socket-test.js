/* eslint-disable */


var connection;

function connect() {
  if (connection && connection.connected) return
  connection = io('/', {
    transport: 'websocket',
    query: {
      'match_id': 'db264843-a8cd-4b04-ae4a-3e8754c3272e',
      'auth_token': '105c840c-f4c8-4c6b-a8f8-f326d4012d63'
    }
  })
}

function matchrequest() {
  connect()
  connection.on('match/status', console.log)
  connection.emit('match/request')
}