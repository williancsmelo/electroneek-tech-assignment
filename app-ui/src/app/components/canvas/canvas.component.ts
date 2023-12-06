import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { WebSocketService } from 'src/app/services/web-socket.service'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  constructor(
    readonly apiService: ApiService,
    readonly webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {}

  syncApiRequest() {
    this.apiService.syncApiRequest()
  }

  loading = false
  async asyncApiRequest() {
    this.loading = true
    await this.apiService.asyncApiRequest()
    this.loading = false
  }

  addEventForm = new FormBuilder().group({
    eventName: ''
  })
  addListener() {
    const { eventName } = this.addEventForm.value
    if (!eventName) return
    this.webSocketService.listen(eventName)
    this.addEventForm.reset()
  }

  sendMessageForm = new FormBuilder().group({
    eventName: '',
    message: ''
  })
  sendMessage() {
    const { eventName, message } = this.sendMessageForm.value
    if (!eventName || !message) return
    this.webSocketService.emit(eventName, message)
    this.sendMessageForm.controls.message.reset()
  }
}
