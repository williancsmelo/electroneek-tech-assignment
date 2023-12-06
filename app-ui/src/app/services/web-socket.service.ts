import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly namespace = 'app-ui'
  private readonly socket = io(`${environment.wsBaseUrl}/${this.namespace}`)
  private readonly messagesSubject = new Subject<string>()
  private readonly eventsSubject = new BehaviorSubject<string[]>([])

  get isConnected() {
    return this.socket.connected
  }

  get messages$() {
    return this.messagesSubject.asObservable()
  }

  get events$() {
    return this.eventsSubject.asObservable()
  }

  listen(eventName: string) {
    if (this.eventsSubject.value.includes(eventName) || !this.isConnected)
      return
    this.eventsSubject.next([...this.eventsSubject.value, eventName])
    this.socket.on(eventName, (data: string) => {
      const time = new Date().toTimeString().split(' ').shift()
      this.messagesSubject.next(
        `Event (${eventName}) | Received Time (${time}) | Message: ${data}`
      )
    })
  }

  removeListener(eventName: string) {
    this.socket.off(eventName)
    this.eventsSubject.next(
      this.eventsSubject.value.filter(event => event !== eventName)
    )
  }

  emit(eventName: string, message: string) {
    const time = new Date().toTimeString().split(' ').shift()
    this.socket.emit(eventName, `Emit Time (${time}) | ${message}`)
  }

  toggleConnection() {
    if (this.isConnected) this.socket.disconnect()
    else this.socket.connect()
  }
}
