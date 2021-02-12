
let g = io('/game', { transport:'websocket', query: { transport: 'websocket', 'X-Game-Id': 'db264843-a8cd-4b04-ae4a-3e8754c3272e' }})
g.on('init', console.log)
g.on('player_joined', console.log)
g.on('question_result', console.log)
g.on('round_start', console.log)
g.on('game_ended', console.log)
g.on('game_error', console.log)
g.emit('join')

const button = document.getElementById('start').addEventListener('click', () => {
  g.emit('start')
})
