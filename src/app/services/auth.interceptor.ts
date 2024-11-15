import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Obtén el token del servicio de autenticación

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Incluye el token en la cabecera Authorization
        }
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}