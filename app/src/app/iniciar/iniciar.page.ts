import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IonContent,
    IonItem,     
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class IniciarPage implements OnInit {
  usuario: string = '';
  clave: string = '';
  error: string = '';
  mensajeExito: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  iniciarSesion() {
    this.error = '';
    this.mensajeExito = '';

    if (!this.usuario || !this.clave) {
      this.error = 'Debes completar ambos campos.';
      return;
    }

    const datos = {
      usuario: this.usuario,
      clave: this.clave,
    };

    this.http.post<any>('http://localhost:5000/login', datos).subscribe({
      next: (res) => {
        this.mensajeExito = res.message || 'Login exitoso';
        // Guardar el nombre de usuario en localStorage para uso en otras páginas
        localStorage.setItem('usuarioNombre', res.nombre);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'Usuario o contraseña incorrectos.';
        } else if (err.status === 400) {
          this.error = err.error?.error || 'Datos incompletos.';
        } else {
          this.error = 'Error en el servidor, intenta más tarde.';
        }
      }
    });
  }
}
