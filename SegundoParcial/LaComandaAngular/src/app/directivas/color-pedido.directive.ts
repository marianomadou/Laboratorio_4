import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appColorPedido]'
})
export class ColorPedidoDirective {

  @Input() estado;

  constructor(private el: ElementRef) {
    this.cambiarColor();
  }

  cambiarColor() {

    setTimeout(()=> {
 

      switch(this.estado)
      {
        case 'pendiente':
        this.el.nativeElement.style.color = 'red';
        break;
        case 'enPreparacion':
        this.el.nativeElement.style.color = 'color:rgb(236, 205, 26)' ;
        break;
        case 'terminado':
        this.el.nativeElement.style.color = 'green';
        break;
        case 'entregado':
        this.el.nativeElement.style.color = 'black';
        break;
      }
    },300)

  }


  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('black');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    
  }

}
