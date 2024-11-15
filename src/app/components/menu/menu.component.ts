import { Component,OnInit,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  isAuthenticated: boolean=false;

  constructor(private authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   // Inicializa el valor de autenticación al cargar el componente
   this.isAuthenticated = this.authService.isAuthenticated();
   // Nos suscribimos para actualizar el estado de autenticación al cambiar
   this.authService.authStatus$.subscribe((status) => {
     this.isAuthenticated = status;
     this.cdr.detectChanges();  // Forzar la actualización de la vista
   });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToPersonas(): void {
    this.router.navigate(['/personas']);
  }
}