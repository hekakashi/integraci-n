import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categoria: string = '';
  searchTerm: string = '';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        this.categoria = categoria;
        this.cargarCategoria(categoria);
      }
    });
  }

  cargarCategoria(categoria: string) {
    // Aquí puedes usar un servicio o lógica para cargar los productos de la categoría
    // Simulamos datos por ahora:
    this.productos = [
      { nombre: `Producto 1 de ${categoria}` },
      { nombre: `Producto 2 de ${categoria}` },
    ];
    this.productosFiltrados = [...this.productos];
  }

  cambiarCategoria(nuevaCategoria: string) {
    this.router.navigate(['/categorias', nuevaCategoria]);
  }

  buscar() {
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  openCart() {
    this.router.navigate(['/carrito']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
