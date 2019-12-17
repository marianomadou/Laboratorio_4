import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() editarB: EventEmitter<any> = new EventEmitter<any>();
  mostrarTest;
  @ViewChild('recaptcha', { static: false }) recaptchaElement: ElementRef;

  email: string = "";
  pass: string = "";
  pass2: string;
  ver: boolean;
  nombre: string;
  file;

  crearNuevo: boolean;
  cabsha;
  capt;
  imagenes: Array<any>;
  random1;
  random2;
  googleCp;

  //////////////
  public imagesUrl;


  constructor(
    public servicio: MiservicioPrincipalService, private router: Router) {
    this.cabsha = false;
    this.mostrarTest = true;
    this.imagenes = new Array();
    this.imagenes.push(['../../../assets/copaVinoCaptcha.jpg', 'copa']);
    this.imagenes.push(['../../../assets/tenedorCaptcha.JPG', 'tenedor']);
    this.imagenes.push(['../../../assets/cuchilloCaptcha.JPG', 'cuchillo']);

    let imagenElegida = this.imagenes[Math.floor(Math.random()*this.imagenes.length)]; 
    
    this.random1 = imagenElegida[0];
    this.random2 = imagenElegida[1];
    this.googleCp='true';

  }

  botonesTest(algo) {
    if (!this.mostrarTest) {
      this.mostrarTest = true;
    }
    else {
      this.mostrarTest = false;
    }
  }

  ngOnInit() {
    localStorage.setItem("email", "nn");
    localStorage.setItem("perfil", "nn");
    this.ver = true;
    this.crearNuevo = false;
    this.servicio.spinnerOn();
    setTimeout(() => this.servicio.spinnerOff(), 1500);
    this.imagesUrl = [
      "../assets/mesa4.jpg",
      "../assets/mesa5.jpg",
      "../assets/mesa6.jpg",
      "../assets/mesa7.jpg",
      "../assets/mesa1.jpg",
      "../assets/mesa2.jpg",
      "../assets/mesa3.jpg",]

  }

  elegirCaptcha(opcion)
  {
    this.googleCp= opcion;
  }


  detectFiles(event) {
    this.file = event.target.files[0];
    console.info(this.file);
    console.info(event.target.files[0]);
    console.info(event.target);
  }



  crearValidar() {
    if (this.cabsha) {
      if (this.pass == this.pass2 && this.pass != "") {

        this.servicio.autenticar().altaUsuario(this.email, this.pass, this.file)
          .then(() => {
            this.servicio.toasterVerde("usuario creado con exito", "Exito!", 2500);
            localStorage.setItem("email", this.email);
            this.crearNuevo = false;
          }).catch(e => {
            console.info(e);
            this.servicio.toasterError("Error de la base de datos al autenticar " + e, "ERROR", 3000);
          });
      }
      else {
        this.servicio.toasterAzul("Las claves en los campos del pass no son iguales.", "error", 3000);
        this.pass = "123456";
        this.pass2 = "123456";

        //toaster que no son claves iguales
      }

    } else {
      this.servicio.toasterError("Error en capcha", "error", 2000);

    }
  }


  volver() {
    this.ver = true;
    this.crearNuevo = false;
    this.googleCp= 'true';
    this.cabsha = false;
  }


  crear() {
    this.crearNuevo = true;
  }



  async entrar() {

    this.servicio.spinnerOn();
    await this.servicio.autenticar().logInNoGooogle(this.email, this.pass)
      .catch(e => {
        console.info(e);
        this.servicio.toasterWarning("Error de la base de datos al autenticar", e, 2000);

      });;
  }

  ingresar() {
    this.servicio.autenticar().usuarioAnonimo(this.email).then(() => this.router.navigateByUrl("/perfil"));
  }


  entrarConGooGle() {
    this.servicio.autenticar().googleSignin()
      .then(() => this.router.navigateByUrl("/perfil"));;

  }
  entrarConGithub() {
    this.servicio.autenticar().githubSignin()
      .then(() => this.router.navigateByUrl("/perfil"));;

  }




  ayuda() {
    this.email = "momo@momo.com";
    this.pass = "123456";
  }


  usuario(opcion) {

    switch (opcion) {
      case 1:
        this.email = "administrador@comanda.com";
        this.pass = "123456";
        break;
      case 2:
        this.email = "cliente@gmail.com";
        this.pass = "123456";
        break;
      case 3:
        this.email = "candybar@comanda.com";
        this.pass = "123456";
        break;
      case 4:
        this.email = "barman2@comanda.com";
        this.pass = "123456";
        break;
      case 5:
        this.email = "mozo@comanda.com";
        this.pass = "123456";
        break;
      case 6:
        this.email = "cocinero@comanda.com";
        this.pass = "123456";
        break;
      case 7:
        this.email = "barman@comanda.com";
        this.pass = "123456";
        break;
      case 8:
        this.email = "marianomadou@gmail.com";
        this.pass = "123456";
        break;
    }

    setTimeout(() => this.entrar(), 500);


  }

  resolved(captchaResponse: string) {
    if (captchaResponse != null && captchaResponse != undefined) {
      this.cabsha = true;
      this.googleCp=false;
    }
  }

  cabshaFunctio() {
    if (this.capt == this.random2) {
      this.cabsha = true;
      this.googleCp=false;

    }

  }

  refresh() {
    let imagenElegida = this.imagenes[Math.floor(Math.random()*this.imagenes.length)];     
    this.random1 = imagenElegida[0];
    this.random2 = imagenElegida[1];
  }



}
