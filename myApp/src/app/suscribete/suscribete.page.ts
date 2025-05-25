import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-suscribete',
  templateUrl: './suscribete.page.html',
  styleUrls: ['./suscribete.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonInput, IonButton, IonIcon]
})
export class SuscribetePage {
  correo: string = '';

  recibirOfertas() {
    console.log('Correo suscrito:', this.correo);
  }
}
