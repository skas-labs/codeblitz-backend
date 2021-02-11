
let g = io('/game', { transport:'websocket', query: { transport: 'websocket', 'X-Game-Id': 'db264843-a8cd-4b04-ae4a-3e8754c3272e' }})
g.on('updates', console.log)
g.emit('join')
g.emit('fuck')