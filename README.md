# CodeBlitz

## Development Guidelines 

### Monorepo Practices

#### Workflow

##### Install
Running `npm install` on the root will recursively install all dependencies
for the inner projects too

##### Build
Run `npm run build` on the root to recursively build all projects internally

#### Dependencies
1. Common dependencies (used by more than one module) should go to the root `package.json`


### Data
#### Entities

1. User
2. Player
3. MatchRequest
4. GameSession
    - player1: {} (FK)
    - player2: {} (FK)
    - qSet: \[ q1, q2, q3 \]
    - score: { p1: 3, p2: 7}
    - results: { q1: { p1: true, p2: false}, q2: {}  }
5. Question
    - id
    - title
    - description
    - image
    - options { a: { title, image }, b: { ... }  }
    - answers { a: true, b: false, c: true, d: false }



### Game Engine

1. MatchMaker

2. Game
    - player1: {id, socket, status}
    - player2: {id, socket, status}
    - qSet: {  }

https://excalidraw.com/#room=69695adf82651d920011,wCa1-1Pk4u5TAVAEvHAAsA

    class Game {
        constructor(gameSession, socket1, socket2) {

        }
        onEnded() {
            update leaderboard
        }
    }


 ## API


- [ ] `GET /players/me`

- [x] `GET /players/?username=xxxx`

- [x] `GET /players/?name=xxxx`

- [x] `GET /players/:id`

- [ ] `GET /players/:id/followers`

- [ ] `PUT /players/:id/follow`

- [ ] `DELETE /players/:id/follow`

- [ ] `GET /players/:id/following`

- [ ] `GET /leaderboard`

- [ ] `GET /leaderboard?college=XXX`

- [ ] `POST /match`

- [ ] `GET /match/:id` (status of request, maybe not needed)

- [ ] `GET /games/:id`  (stats of that match)

- [ ] `GET /games` (only games played by current user)

- [ ] `GET /questions?tag=javascript&difficulty=hard`

- [ ] `GET /questions/:id`

- [ ] `GET /questions?id=11&id=23&id=56`

- [ ] `POST /questions`

- [ ] `DELETE /questions`


