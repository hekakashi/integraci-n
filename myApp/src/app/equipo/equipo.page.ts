import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge
  ]
})
export class EquipoPage implements OnInit {

  busqueda: string = '';
  carritoCantidad: number = 0;

  productos = [
    {
      marca: 'TEL',
      nombre: 'Tornillo T2 Aguja 6X1 N 900 Es',
      precioOriginal: 12210,
      descuento: 10,
      precioDescuento: 10989,
      imagen: 'assets/img/equipo.png'
    },
    {
      marca: 'TEL',
      nombre: 'Tornillo T1 Mecha 8X9/16 Z 100 Bl',
      precioOriginal: 5940,
      descuento: 10,
      precioDescuento: 5346,
      imagen: 'assets/img/equipo.png'
    },
    {
      marca: 'Melisam',
      nombre: 'Matafuego Polvo Abc Melisam 5 Kg',
      precioOriginal: 123390,
      descuento: 20,
      precioDescuento: 98712,
      imagen: 'assets/img/equipo.png'
    },
    {
      marca: 'TEL',
      nombre: 'Tarugo + Tornillo Caja Plástica 100',
      precioOriginal: 9820,
      descuento: 10,
      precioDescuento: 8838,
      imagen: 'assets/img/equipo.png'
    },
    {
      marca: 'TEL',
      nombre: 'Tarugo + Tornillo Caja Plástica 100',
      precioOriginal: 9820,
      descuento: 10,
      precioDescuento: 8838,
      imagen: 'assets/img/equipo.png'
    },
    {
      marca: 'Melisam',
      nombre: 'Matafuego Polvo Abc Melisam 5 Kg',
      precioOriginal: 123390,
      descuento: 20,
      precioDescuento: 98712,
      imagen: 'assets/img/equipo.png'
    }
  ];

  constructor() {}

  ngOnInit() {}

  productosFiltrados() {
    const texto = this.busqueda.toLowerCase();
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto) ||
      producto.marca.toLowerCase().includes(texto)
    );
  }

  agregarAlCarrito(producto: any) {
    this.carritoCantidad++;
    console.log(`Producto agregado: ${producto.nombre}`);
  }
}
