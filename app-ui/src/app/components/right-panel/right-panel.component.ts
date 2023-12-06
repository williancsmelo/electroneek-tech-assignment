import { Component, OnInit } from '@angular/core'
import { WebSocketService } from 'src/app/services/web-socket.service'

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  constructor(readonly webSocketService: WebSocketService) {}

  ngOnInit(): void {}
}
