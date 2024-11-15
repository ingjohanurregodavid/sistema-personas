import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenuComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sistema-personas';

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Nos suscribimos para actualizar el estado de autenticación al cambiar
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }
  
}
