import { Injectable } from '@nestjs/common';
import { Client } from 'socket.io';
import { BehaviorSubject, Observable } from 'rxjs';
import { GamePlayer } from '../../data/game-player.entity';

enum MatchState {
  JOINING,
  QUEUED,
  PAIRING,
  STARTING
}
export class QueuedGamePlayer {
  gamePlayer: GamePlayer
  state: MatchState
  gameId?: string

  constructor(gamePlayer: GamePlayer, state: MatchState = MatchState.JOINING) {
    this.gamePlayer = gamePlayer;
    this.state = state;
  }

  updateState(state: MatchState, gameId?: string): QueuedGamePlayer {
    this.state = state
    if (gameId) { this.gameId = gameId }
    return this
  }
}

@Injectable()
export class MatchMakerService {


  private waitingQueue: Array<BehaviorSubject<QueuedGamePlayer>> = []

  queuePlayer(gamePlayer: GamePlayer): Observable<QueuedGamePlayer> {

    const newQueuedPlayer = new BehaviorSubject(new QueuedGamePlayer(gamePlayer))
    this.waitingQueue.push(newQueuedPlayer)
    newQueuedPlayer.next(newQueuedPlayer.value.updateState(MatchState.QUEUED))
    this.handleNewQueuePlayer() // side effect

    return newQueuedPlayer

  }

  private async handleNewQueuePlayer() {
    if (this.waitingQueue.length >= 2) {
      const player1 = this.waitingQueue.pop()!
      const player2 = this.waitingQueue.pop()!

      player1.next(player1.value.updateState(MatchState.PAIRING))
      player2.next(player1.value.updateState(MatchState.PAIRING))

      // make DB call to create a GAME object between these ^ two ppl
      const newGameId = '76cc2663-5351-4caf-9a21-b0145e666f20'

      player1.next(player1.value.updateState(MatchState.STARTING, newGameId))
      player2.next(player1.value.updateState(MatchState.STARTING, newGameId))

      //TODO: if shit goes wrong we "can" queue this person back


    }

  }


}
