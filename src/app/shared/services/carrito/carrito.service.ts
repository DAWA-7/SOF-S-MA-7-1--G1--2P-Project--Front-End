import { Injectable, Input } from '@angular/core';
import { Carrito } from '../../interfaces/carrito';
import { mockDataLibros } from 'src/assets/ts/MOCK_DATA_Libros';
import { Book } from '../../interfaces/book';
import { find } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ICarrito, PostCarrito } from '../../interfaces/ICarrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  listLibros: Book[] = [];
  unidad: Carrito[] = [];
  existe = false;
  constructor(private http: HttpClient) {}
  urlCarrito = 'http://localhost:8080/api/FACTURA_DETALLE/';
  listPrecio = [0];
  @Input() inputItem: any;

  cartData: Carrito[] = [];
  //cantidad

  //metodos nuevos para carrito ↓
  devVal() {
    return this.inputItem;
  }

  sumaNoTotal() {
    var sumaNoT = 0;
    for (var i = 0; i < this.inputItem.length; i++) {
      sumaNoT += this.inputItem[i].cantidad * this.inputItem[i].precio;
    }

    return sumaNoT;
  }

  iva() {
    var iva = this.sumaNoTotal() * 0.12;
    return iva.toFixed(2);
  }

  sumaTotal() {
    var sumaTotal = Number(this.sumaNoTotal()) + Number(this.iva());
    return sumaTotal;
  }

  //Nuevo ↑

  //NEFIPART↓----------------------------------------------------------------------------------------------------------------------------------------------------

  Iunidad: ICarrito[] = [];

  private addCarrito: string = 'http://localhost:8080/api/carrito/add';
  private baseCarrito: string = 'http://localhost:8080/api/carrito/';

  addNewElementCarrito(carrito: PostCarrito) {
    return this.http.post<ICarrito>(this.addCarrito, carrito);
  }

  getCarrito1(libro: any) {
    var username = localStorage.getItem('userName');
    return this.http.get<ICarrito>(
      this.baseCarrito + 'getLibroPerUser/' + username + '/' + libro.id
    );
  }

  deleteCarrito(id: number) {
    return this.http.delete(this.baseCarrito + 'deleteCarrito/' + id);
  }

  getToken() {
    let auth_token = localStorage.getItem('token_value');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${auth_token}`,
    });
  }

  // listPrecio = [0]

  //cantidad

  getCantidad() {
    return this.unidad;
  }

  //↑

  cargarInfoApi() {
    return this.http.get(this.urlCarrito);
  }

  pushprecio(precio: any) {
    this.listPrecio.push(precio);
  }

  addToCart(libros: Book) {
    this.listLibros.push(libros);
  }

  sumaPrecios() {
    const sumAll = this.listPrecio.reduce((acc, item) => {
      return (acc = acc + item);
    });
    return Number(sumAll.toFixed(2));
  }

  sumTotal() {
    const iva = 0.12 * this.sumaPrecios();
    const precioTotal = this.sumaPrecios() + iva;
    return Number(precioTotal.toFixed(2));
  }

  // deleteCard(libros: Book){
  //   this.listLibros.splice(libros)
  // }

  itemCount() {
    return this.cartData.length;
  }

  getItems() {
    return this.listLibros;
  }

  exist(libros: any) {
    var bookfind = this.listLibros.find((libro) => libro.autor == libros.autor);

    if (bookfind) {
      this.existe = true;
    } else {
      this.existe = false;
    }
    return this.existe;
  }

  returnPrice() {}
}
