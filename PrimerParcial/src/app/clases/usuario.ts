import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class Usuario {
    uid: string;
    email: string;
    pass: string;
    foto: string;
    perfil: TipoUsuario
}

