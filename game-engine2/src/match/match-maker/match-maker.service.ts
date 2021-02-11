import { Injectable } from '@nestjs/common';
import { Client } from 'socket.io';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '@codeblitz/data/dist/entities/player.entity';

enum MatchState {
  JOINING,
  QUEUED,
  PAIRING,
  STARTING
}
export class QueuedGamePlayer {
  player: Player
  state: MatchState
  gameId?: string

  constructor(player: Player, state: MatchState = MatchState.JOINING) {
    this.player = player;
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

  queuePlayer(player: Player): Observable<QueuedGamePlayer> {

    const newQueuedPlayer = new BehaviorSubject(new QueuedGamePlayer(player))
    this.waitingQueue.push(newQueuedPlayer)
    newQueuedPlayer.next(newQueuedPlayer.value.updateState(MatchState.QUEUED))
    // noinspection JSIgnoredPromiseFromCall
    this.handleNewQueuePlayer()

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
