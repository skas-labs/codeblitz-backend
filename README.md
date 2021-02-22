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

#### Events

##### Match
**events** (client -> server)
- `match/request`


**updates** (server -> client)
- `match/status`
  - payload: status = queued, other player joining, initialising game

##### Game
**events** (client -> server)
- `game/join`

- `game/select_answer`
  - ques id, answer, time delta

- `game/abandon`

**updates** (server -> client)
- `game/init`
  - timings
  - player details (you, opponent)

- `game/round_ready`
  - round id (0 to 10)
  - score

- `game/round_start`
  - round id (0 to 10)
  - question object (without answer)
  - timer
  - score

- `game/round_result`
  - round id (0 to 10)
  - question object (without answer)
  - timer
  - player <-> ans map
  - correct ans
  - score

- `game/end`
  - score

- `game/error`
  - generic server side errors

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

- [ ] Abandoning Flow

- [ ] Sample HTML app

- [ ] Socket auth onConnect

- [ ] Eager load questions in game engine

- [ ] Serve questions from game-engine

- [ ] Updating Stats in GameObject


 ## API

- [x] `POST /otp`

- [x] `POST /otp/verify`

- [ ] `POST /players` ⚠️

      REQ
      ```
      { Header(access_token), username, name, email?, phno? }
      ```

- [ ] `GET /players/me`  ⚠️

        RES
      ```
      username
      name
      score
      stats
      level
      ```  

- [x] `GET /players/?sort=trending` {trending|top|new|online}

    - [ ] `GET /players/?username=xxxx`

    - [ ] `GET /players/?name=xxxx`

- [x] `GET /players/:id`

- [x] `GET /players/:id/followers` ⚠️

    - [ ] `GET /players/:id/followers/?username=xxxx` ⚠️

    - [ ] `GET /players/:id/followers/?name=xxxx` ⚠️

- [ ] `PUT /players/:id/follow` ⚠️

- [ ] `DELETE /players/:id/follow` ⚠️

- [ ] `GET /players/:id/following` ⚠️

    - [ ] `GET /players/:id/following/?username=xxxx` ⚠️

    - [ ] `GET /players/:id/following/?name=xxxx` ⚠️


- [ ] `GET /leaderboard`

- [ ] `GET /leaderboard?college=XXX`

- [ ] `GET /leaderboard?country=XXX`

- [ ] `GET /leaderboard?city=XXX`

- [x] `POST /match` (create match request)

- [ ] `GET /match/:id` (status of request, maybe not needed) 🛑

- [ ] `GET /games/:id`  (stats of that match) 🛑

- [ ] `GET /games` (only games played by current user) 🛑

- [ ] `GET /questions?tag=javascript&difficulty=hard` ❓

- [ ] `GET /questions/:id` ❓

- [ ] `GET /questions?id=11&id=23&id=56` ❓

- [ ] `POST /questions` ❓

- [ ] `DELETE /questions` ❓


