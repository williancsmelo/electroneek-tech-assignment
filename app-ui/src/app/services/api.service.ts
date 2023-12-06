import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { of, Subject } from 'rxjs'
import * as uuid from 'uuid'
import { ApiRequestDetails } from '@shared/interfaces/ApiRequestDetails'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly log = new Subject<string>()
  private createLog(message: string) {
    const prefix = new Date().toTimeString().split(' ').shift()
    this.log.next(`(${prefix}) ${message}`)
  }
  private apiRequest(requestId: string) {
    return this.http
      .get<ApiRequestDetails>(`/request-details/${requestId}`)
      .pipe(
        map(response => {
          const serverTime = new Date(response.time)
            .toTimeString()
            .split(' ')
            .shift()
          return `${response.requestId} | Server Time: ${serverTime}`
        }),
        catchError(error => {
          return of(`[Error] ${requestId}: ${error.message}`)
        })
      )
  }
  get log$() {
    return this.log.asObservable()
  }

  syncApiRequest() {
    const prefix = 'Sync API Request:'
    const requestId = uuid.v4()
    this.createLog(`${prefix} [Start] ${requestId}`)
    this.apiRequest(requestId).subscribe(message => {
      this.createLog(`${prefix} [End] ${message}`)
    })
  }

  async asyncApiRequest() {
    const prefix = 'Async API Request:'
    const requestId = uuid.v4()
    this.createLog(`${prefix} [Start] ${requestId}`)
    const message = await this.apiRequest(requestId).toPromise()
    this.createLog(`${prefix} [End] ${message}`)
  }
}
