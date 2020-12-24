# CodeBlitz

## Development Guidelines 

### Monorepo Practices

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
    - qSet: [ q1, q2, q3]
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