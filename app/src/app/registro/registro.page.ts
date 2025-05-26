import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      repetir: ['', Validators.required],
      telefono: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(9)]]
    });
  }

  registrar() {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.registroForm.invalid) {
      this.mensajeError = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const pass = this.registroForm.get('contrasena')?.value;
    const repetir = this.registroForm.get('repetir')?.value;

    if (pass !== repetir) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    const datos = {
      nombre: this.registroForm.get('nombre')?.value,
      usuario: this.registroForm.get('usuario')?.value,
      correo: this.registroForm.get('correo')?.value,
      contrasena: pass,
      telefono: this.registroForm.get('telefono')?.value
    };

    this.http.post('http://localhost:5000/registrar_usuario', datos).subscribe({
      next: (res: any) => {
        // Redirige al home con mensaje por queryParams
        this.router.navigate(['/home'], { queryParams: { mensaje: res.message || 'Usuario creado con éxito.' } });
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al crear usuario.';
      }
    });
  }
}
