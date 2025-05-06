import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Ya incluye todos los componentes Ionic

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule], // Esto es suficiente
})
export class HomePage {
  constructor() {}
}
