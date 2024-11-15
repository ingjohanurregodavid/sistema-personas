import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss'
})
export class PersonaListComponent {
  personas: any[] = [];
  selectedPersona: any = null; // Almacena la persona seleccionada para edición
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private personaService: PersonaService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

   // Cargar la lista de personas
   loadPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data: any[]) => {
        this.personas = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las personas', error);
      }
    });
  }

  // Método para abrir el formulario de edición con los datos de la persona
  editPersona(persona: any): void {
    this.selectedPersona = { ...persona }; // Clonamos para evitar modificaciones directas
  }

  // Método para crear o editar persona
  savePersona(): void {
    if (this.selectedPersona.id) {
      // Editar persona
      this.personaService.updatePersona(this.selectedPersona).subscribe({
        next: () => {
          this.successMessage = 'Persona actualizada correctamente';
          this.loadPersonas(); // Recargar la lista de personas
          this.selectedPersona = null; // Resetear el formulario
        },
        error: (error) => {
          console.error('Error al actualizar persona', error);
          this.errorMessage = 'Ocurrió un error al actualizar la persona';
        }
      });
    } else {
      // Crear nueva persona
      this.personaService.createPersona(this.selectedPersona).subscribe({
        next: () => {
          this.successMessage = 'Nueva persona creada correctamente';
          this.loadPersonas(); // Recargar la lista de personas
          this.selectedPersona = null; // Resetear el formulario
        },
        error: (error) => {
          console.error('Error al crear persona', error);
          this.errorMessage = 'Ocurrió un error al crear la persona';
        }
      });
    }
  }

  // Método para eliminar persona
  deletePersona(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this.personaService.deletePersona(id).subscribe({
        next: () => {
          this.successMessage = 'Persona eliminada correctamente';
          this.loadPersonas(); // Recargar la lista de personas
        },
        error: (error) => {
          console.error('Error al eliminar persona', error);
          this.errorMessage = 'Ocurrió un error al eliminar la persona';
        }
      });
    }
  }

  // Método para abrir el formulario vacío (crear nueva persona)
  newPersona(): void {
    this.selectedPersona = {Id:-1, Cedula: '', Nombre: '', Apellido: '', NumeroCelular: '' };
  }
}
