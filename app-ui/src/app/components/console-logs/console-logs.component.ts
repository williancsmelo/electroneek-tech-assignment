import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { WebSocketService } from 'src/app/services/web-socket.service'

@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleLogsComponent implements OnInit {
  messages: string[] = []

  constructor(
    private readonly apiService: ApiService,
    private readonly webSocketService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.apiService.log$.subscribe(message => {
      this.messages = [...this.messages, message]
      this.cdr.detectChanges()
    })

    this.webSocketService.messages$.subscribe(message => {
      this.messages = [...this.messages, message]
      this.cdr.detectChanges()
    })
  }
}
