import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appColorBadgeArea]'
})
export class ColorBadgeAreaDirective {

  @Input() estado;

  constructor(private el: ElementRef) {
    this.cambiarColor();
  }

  cambiarColor() {

    setTimeout(()=> {


      switch(this.estado)
      {
        case 'comida':
        this.el.nativeElement.className = "badge badge-default";
        break;
        case 'postre':
            this.el.nativeElement.className  = "badge badge-secondary";
        break;
        case 'cerveza':
            this.el.nativeElement.className  = "badge badge-success";
        break;
        case 'barra':
            this.el.nativeElement.className  = "badge badge-info";
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
