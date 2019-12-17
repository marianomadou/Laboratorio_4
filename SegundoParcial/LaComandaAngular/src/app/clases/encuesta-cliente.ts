export class EncuestaCliente
{
    uid ;
    cliente;
    pedido;
    valorMozo;
    valorCocinero;
    valorBartender;
    valorMesa;
    valorResturant;
    sugerencia;
    mesa;
    fecha;

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
      }
}