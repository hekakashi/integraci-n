import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class EquipoPage implements OnInit {
  productos: Product[] = [];
  carrito: (Product & { cantidad: number })[] = [];
  carritoCantidad = 0;
  tipoFiltro = 'equipos de seguridad';
  dolarValue: number = 0;

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
  // Obtiene el carrito guardado en localStorage
  const stored = localStorage.getItem('carrito');

  if (stored) {
    try {
      // Intenta parsear el JSON del carrito
      const parsed = JSON.parse(stored) as (Product & { cantidad?: number })[];

      // Filtra productos válidos y asegura que cada uno tenga cantidad mínima de 1
      this.carrito = parsed
        .filter(p => p.price && p.price > 0 && p.id != null)
        .map(p => ({
          ...p,
          cantidad: Number.isInteger(p.cantidad) && p.cantidad! > 0 ? p.cantidad! : 1
        }));
    } catch {
      // Si falla el parseo, limpia el carrito
      this.carrito = [];
    }
  } else {
    // Si no hay carrito en storage, inicializa vacío
    this.carrito = [];
  }

  // Actualiza la cantidad total de ítems en el carrito
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

    const index = this.carrito.findIndex(p => p.id === producto.id);  // Busca si ya existe en el carrito
    if (index > -1) {
      this.carrito[index].cantidad += 1;
    } else {
      this.carrito.push({ ...producto, price: precioNum, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.actualizarCantidadCarrito();
  }
}
