import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    RouterModule  // Agregado aquí
  ]
})
export class MaterialesPage implements OnInit {
  busqueda: string = '';
  carritoCantidad: number = 0;

  productos = [
    {
      nombre: 'Cemento Portland',
      categoria: 'Construcción',
      imagen: 'assets/img/materiales.png',
      descuento: 10,
      precioOriginal: 5000,
      precioDescuento: 4500
    },
    {
      nombre: 'Arena fina',
      categoria: 'Construcción',
      imagen: 'assets/img/materiales.png',
      descuento: 5,
      precioOriginal: 3000,
      precioDescuento: 2850
    },
  ];

  constructor() { }

  ngOnInit() { }

  productosFiltrados() {
    if (!this.busqueda) return this.productos;
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  agregarAlCarrito(producto: any) {
    this.carritoCantidad++;
    console.log('Agregado al carrito:', producto.nombre);
  }
}
