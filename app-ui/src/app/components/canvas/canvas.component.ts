import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

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
}
