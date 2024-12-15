import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000';
  private categories: string[] = ['gloves', 'shorts'];
  private brands: string[] = ['fairtex', 'leone', 'yokkao'];
  errorMessagge: string = '';

  constructor(private http: HttpClient) { }

   getFilteredProducts(category: string, brand: string): Observable<Product[]> {

    if (category && brand) {
      return this.filterProductsByCategoryAndBrand(category, brand);
    } else if (category) {
      return this.filterProductsByCategory(category);
    } else if (brand) {
      return this.filterProductsByBrand(brand);
    } else {
      return this.getAllProducts(); // Carica tutti i prodotti se nessun filtro è presente
    }
  }


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/api/products');
  }

    getBestSellers(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl + '/api/best-seller-products');
    }


    filterProductsByCategory(category: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/products/category${category}`);
    }

    filterProductsByBrand(brand: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/products/brand/${brand}`);
    }

    filterProductsByCategoryAndBrand(category: string, brand: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/api/products?category=${category}&brand=${brand}`);
    }
    
    
  isValidCategory(category: string): boolean {
    return this.categories.includes(category);
  }

 
  isValidBrand(brand: string): boolean {
    return this.brands.includes(brand);
  }

}
