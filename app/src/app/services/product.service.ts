import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz para productos con campos opcionales usados en equipo.page.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  types: string;
  description?: string;
  image?: string;
  tipo?: string;
}

// Interfaz para el valor del dólar
export interface Dollar {
  fecha: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000';//se ocupa como base

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);//espera como respuesta un arreglo de objetos tipo product
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products_by_type`, {
      params: { type }
    });
  }

  getDollarValue(): Observable<Dollar> {
    return this.http.get<Dollar>(`${this.baseUrl}/dolarvalue`);
  }

  iniciarTransbank(total: number): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.baseUrl}/crear_transaccion`, { monto: total });// se envia el monto total y responde un una url
  }
}
