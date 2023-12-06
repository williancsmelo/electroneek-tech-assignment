import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { ConsoleLogsComponent } from './components/console-logs/console-logs.component'

import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LeftPanelComponent } from './components/left-panel/left-panel.component'
import { RightPanelComponent } from './components/right-panel/right-panel.component'
import { CanvasComponent } from './components/canvas/canvas.component'
import { MatButtonModule } from '@angular/material/button'
import { APIInterceptor } from './services/http-interceptor'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { provideAnimations } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsoleLogsComponent,
    LeftPanelComponent,
    RightPanelComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    ScrollingModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
