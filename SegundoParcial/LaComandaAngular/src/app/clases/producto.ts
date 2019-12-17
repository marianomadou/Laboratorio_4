export class Producto 

{

    /*public id: string;
    public nombre: string;
    public precio: number;
    public descripcion: string
    public stock: number;
    public url: string;
    public estado;

    constructor() {}*/

    uid:string;
    nombre: string;
    descripcion: string;
    tiempo: number;
    precio: number;
    tipo: string;
    stock: number;
    url: string;
    foto1: string;
    foto2: string;
    foto3: string;
    estado: string; 
    /*
     estado corresponde para poder diferenciar si esta realizado o no cuando forma parte de un pedido.
        {'pendiente','preparacion','terminado'}
     */

    constructor(
        id?:string, nombre?: string, 
        descripcion?: string,  tiempo?: number, 
        precio?: number, tipo?: string, estado?: string, stock?:number, url?:string) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.precio = precio;
        this.tipo = tipo;
        this.stock = stock;
        this.url = url;

        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
    
    }

    setFoto1(){
        this.foto1 = 'productos/'+this.nombre.toString()+'/foto1.jpg'
    }

    setFoto2(){
        this.foto2 = 'productos/'+this.nombre.toString()+'/foto2.jpg'
    }

    setFoto3(){
        this.foto3 = 'productos/'+this.nombre.toString()+'/foto3.jpg'
    }

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
    }

}
