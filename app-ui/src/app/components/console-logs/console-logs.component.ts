import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleLogsComponent implements OnInit {
  @Input() messages: string[] = []

  constructor(
    private readonly apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.apiService.logs$.subscribe(message => {
      this.messages = [...this.messages, message]
      this.cdr.detectChanges()
    })
  }

  ngOnInit() {}
}
