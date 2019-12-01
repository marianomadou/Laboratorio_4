import { TipoPelicula } from '../enums/tipo-pelicula.enum';


export class Pelicula {
    public id: string;
    public nombre: string
    public tipo: TipoPelicula;
    public fechaEstreno: number;
    public cantidadPublico: number;
    public url: string = 'src/assets/fotopordefecto.jpg';
    public actor: string;

    constructor() {
 

    }
}
