import { Component, OnInit } from '@angular/core'
import { WebSocketService } from 'src/app/services/web-socket.service'

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  constructor(readonly webSocketService: WebSocketService) {}

  ngOnInit(): void {}
}
