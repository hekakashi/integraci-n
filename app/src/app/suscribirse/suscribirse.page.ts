import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suscribirse',
  standalone: true,              // Componente standalone
  imports: [IonicModule, CommonModule, FormsModule],  // Importa módulos necesarios
  templateUrl: './suscribirse.page.html',
  styleUrls: ['./suscribirse.page.scss'],
})
export class SuscribirsePage {
  email: string = '';
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private http: HttpClient) {}

  enviarCorreo() {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.email || !this.email.includes('@')) {
      this.mensajeError = 'Por favor ingresa un correo válido.';
      return;
    }

    this.http.post('http://localhost:5000/suscribirse', { email: this.email })
      .subscribe({
        next: (res: any) => {
          this.mensajeExito = res.message || 'Correo guardado con éxito.';
          this.email = ''; // limpiar input
        },
        error: (err) => {
          this.mensajeError = err.error?.error || 'Error al guardar el correo.';
        }
      });
  }
}
