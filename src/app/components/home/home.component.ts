import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from "../menu/menu.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Método para manejar la salida de la sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout en AuthService
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
 
}
