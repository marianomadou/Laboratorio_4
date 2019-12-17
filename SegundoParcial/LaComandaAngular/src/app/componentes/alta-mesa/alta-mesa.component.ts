import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Mesa } from 'src/app/clases/mesa';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.component.html',
  styleUrls: ['./alta-mesa.component.scss']
})
export class AltaMesaComponent {
  title = 'Angular Form Validation Tutorial';
   angForm: FormGroup;
   form: FormGroup;
   mesaActual;

   selectedFiles;
   fileName;
   opcionElegida: number;
   public url: string;
   foto;
   
   
  validation_messages = {
    'numero': [
      { type: 'required', message: 'Debe ingresar un nombre de Producto' },

    ],
    'cantidadComensales': [
      { type: 'required', message: 'Debe ingresar una Descripcion' },

    ]
  };


   constructor(  
    private formBuilder: FormBuilder,
     private servicioGeneral: MiservicioPrincipalService) 
     {

    this.angForm= this.formBuilder.group({
      numero: new FormControl('', Validators.compose([
         Validators.required,
 
       ])),
       cantidadComensales: new FormControl('', Validators.compose([
         Validators.required,
 
       ]))
     });
 
 
     this.mesaActual = new Mesa();
     }
  

  ngOnInit() {
    console.log("entro a alta mesa");    
  }


  onSubmitProducto() {
    this.mesaActual.numero=this.angForm.get('numero').value;
    this.mesaActual.cantidadComensales=this.angForm.get('cantidadComensales').value;
    /* this.mesaActual.tipoMesa=this.angForm.get('tipoMesa').value;
    this.mesaActual.codigoQr=this.angForm.get('codigoQr').value; */
    this.mesaActual.estado= "disponible";
    this.mesaActual.url="./assets/mesaA5.JPG";
    this.subirFoto();
  }



  cancelar() {
    this.opcionElegida = 0;
    this.selectedFiles = false;

  }

  private subirFoto() {
        console.info(this.selectedFiles)
        this.servicioGeneral.mesas().enviarMesa( this.mesaActual);    
  }

}


  

