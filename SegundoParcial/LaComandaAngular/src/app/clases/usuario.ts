export class Usuario {

    email: string;
    date: string;
    pass: string;
    uid: string;

    displayName;
    photoURL;
    from;
    perfil;

    nombre: string;      
    apellido: string;
    dni: number;
    cuil: number;
    estado: string;
    codigoRegistro: number;
    registrado: boolean;
    activo:boolean;

    credencial;


     constructor()
     {
        this.activo=true;
        this.registrado=false;
        this.photoURL ="assets/images/nofoto.jpg";    

     }



}
