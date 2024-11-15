import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: { token: string }) => {
        const token = response.token;  // Aquí accedes al token de la respuesta
        localStorage.setItem('token', token);  // Guardas el token en localStorage
        this.router.navigate(['/home']);  // Rediriges a la página de inicio
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';  // Mensaje en caso de error
      },
      complete: () => {
      }
    });
  }
}
