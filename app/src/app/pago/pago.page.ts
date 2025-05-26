import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Product, ProductService } from 'src/app/services/product.service';

interface ProductConCantidad extends Product {
  cantidad: number;
}

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  carrito: ProductConCantidad[] = [];
  metodoPago = 'tarjeta';
  totalCompra = 0;
  
  // Nuevas variables para usuario y descuento
  usuarioNombre: string | null = null;
  descuentoAplicado: boolean = false;
  totalConDescuento: number = 0;

  constructor(private apiService: ProductService) {}

  ngOnInit() {
    // Intentamos obtener el nombre del usuario del localStorage (ajusta según cómo guardes la info)
    this.usuarioNombre = localStorage.getItem('usuarioNombre');

    const stored = localStorage.getItem('carrito');
    if (stored) {
      try {
        this.carrito = JSON.parse(stored) as ProductConCantidad[];
      } catch {
        this.carrito = [];
      }
    }

    // Aplicar descuento si hay usuario logueado
    this.descuentoAplicado = !!this.usuarioNombre;
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.totalCompra = this.carrito.reduce((total, p) => {
      const precio = Number(p.price);
      const cantidad = p.cantidad ?? 1;
      return total + (isNaN(precio) ? 0 : precio * cantidad);
    }, 0);

    if (this.descuentoAplicado) {
      this.totalConDescuento = this.totalCompra * 0.9; // 10% de descuento
    } else {
      this.totalConDescuento = this.totalCompra;
    }
  }

  vaciarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
    this.actualizarTotal();
  }

  realizarPago() {
    if (this.totalCompra === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const montoPagar = this.descuentoAplicado ? this.totalConDescuento : this.totalCompra;

    if (this.metodoPago === 'tarjeta') {
      this.apiService.iniciarTransbank(montoPagar).subscribe({
        next: (data) => {
          if (data && data.url) {
            window.location.href = data.url;
          } else {
            window.open('http://localhost:5000/crear_transaccion', '_blank');
          }
        },
        error: (err) => {
          console.error('Error en el pago con Transbank', err);
          alert('Ocurrió un error en el pago con tarjeta.');
        }
      });
    } else {
      alert('Realice la transferencia con los datos proporcionados.');
    }
  }
}
