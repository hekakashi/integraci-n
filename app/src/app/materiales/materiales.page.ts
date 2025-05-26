import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductService, Product } from '../services/product.service';

interface ProductConCantidad extends Product {
  cantidad: number;
}

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.page.html',
  styleUrls: ['./materiales.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class MaterialesPage implements OnInit {
  productos: Product[] = [];
  carritoCantidad = 0;
  tipoFiltro = 'materiales basicos';
  dolarValue: number = 0;
  busqueda: string = '';
  carrito: ProductConCantidad[] = [];

  constructor(private productService: ProductService) {}

   ngOnInit() {
    this.loadDollarValue();
    this.loadProductsByType(this.tipoFiltro);
    this.cargarCarritoDesdeStorage();
  }

  loadProductsByType(type: string) {
    this.productService.getProductsByType(type).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos por tipo', err)
    });
  }

  loadDollarValue() {
    this.productService.getDollarValue().subscribe({
      next: (data) => this.dolarValue = data.valor ?? 0,
      error: (err) => console.error('Error al obtener valor dólar', err)
    });
  }

  precioEnDolares(precioLocal: number): string {
    if (!this.dolarValue) return '...';
    return (precioLocal / this.dolarValue).toFixed(2);
  }

  cargarCarritoDesdeStorage() {
    const stored = localStorage.getItem('carrito');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as (Product & { cantidad?: number })[];
        this.carrito = parsed
          .filter(p => p.price && p.price > 0 && p.id != null)
          .map(p => ({
            ...p,
            cantidad: Number.isInteger(p.cantidad) && p.cantidad! > 0 ? p.cantidad! : 1
          }));
      } catch {
        this.carrito = [];
      }
    } else {
      this.carrito = [];
    }
    this.actualizarCantidadCarrito();
  }

  actualizarCantidadCarrito() {
    this.carritoCantidad = this.carrito.reduce(
      (acc, p) => acc + (Number.isInteger(p.cantidad) && p.cantidad > 0 ? p.cantidad : 1),
      0
    );
  }

  agregarAlCarrito(producto: Product) {
    const precioNum = Number(producto.price);
    if (producto.id == null || !precioNum || precioNum <= 0) {
      console.warn('Producto inválido no se puede agregar:', producto);
      return;
    }

    const index = this.carrito.findIndex(p => p.id === producto.id);
    if (index > -1) {
      this.carrito[index].cantidad += 1;
    } else {
      this.carrito.push({ ...producto, price: precioNum, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.actualizarCantidadCarrito();
  }
}