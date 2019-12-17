import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { ExcelService } from 'src/app/servicios/excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.scss']
})
export class ListadoEncuestasComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {
    chart: {
      renderTo: 'container',
      type: 'column'
    },

    title: {
      text: 'Promedio de Satisfacción'
    },
    xAxis: {
      categories: ['Restaurant', 'Cocinero', 'Mozo', 'Bebidas']
    },

    series: [{
      name: 'Valoración',
      color: 'greenyellow',
      data: [0, 0, 0, 0]
    }]

  };
  grafico: boolean = false;
  peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['Email', 'mesa', 'fecha', 'valorMozo', 'valorResturant', 'valorCocinero', 'valorBartender', 'sugerencia'];
  dataSource;
  productoElegido;

  constructor(private servicio: MiservicioPrincipalService, private excelService: ExcelService) {


  }


  ngOnInit() {
    this.servicio.encuesta().traerTodo().subscribe((actions => {
      this.peliculas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as EncuestaCliente;
        this.peliculas.push(data);
      });
      this.dataSource = new MatTableDataSource(this.peliculas);
    }));
    this.grafico=false;

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.peliculas, 'LaComanda_encuestas');
  }

  public generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options 
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('estadisticasDinner.pdf'); // Generated PDF  
    });
  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {

    this.productoElegido = nombre;
  }


  eliminarAnonimos() {
    this.peliculas.forEach((e: Usuario) => {
      if (e.perfil == "anonimo") {
        this.servicio.usuarios().borrarUno(e.uid);
      }
    });
  }



  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {

      this.servicio.productos().borrarUno(peli.id)
    } else {

    }

  }
  ocultar($event) {
    this.productoElegido = false;
  }

  ordenar() {

    let tipoOrden = (<HTMLInputElement>document.getElementById('tipoOrden')).value;
    let orden = (<HTMLInputElement>document.getElementById('orden')).value;

    this.servicio.encuesta().traerTodoOrdenados(tipoOrden, orden).subscribe((actions => {
      this.peliculas = [];
      actions.forEach(e => this.peliculas.push(e))
      this.dataSource = new MatTableDataSource(this.peliculas);
    }));

  }





  graficar() {

    if (!this.grafico) {


      this.grafico = true;
      let contador = 0;

      this.peliculas.forEach((e: EncuestaCliente) => {
        contador++;
        this.chartOptions.series[0].data[0] += parseInt(e.valorResturant),
          this.chartOptions.series[0].data[1] += parseInt(e.valorCocinero),
          this.chartOptions.series[0].data[2] += parseInt(e.valorMozo),
          this.chartOptions.series[0].data[3] += parseInt(e.valorBartender)
      })


      this.chartOptions.series[0].data[0] = this.chartOptions.series[0].data[0] / contador;
      this.chartOptions.series[0].data[1] = this.chartOptions.series[0].data[1] / contador;
      this.chartOptions.series[0].data[2] = this.chartOptions.series[0].data[2] / contador;
      this.chartOptions.series[0].data[3] = this.chartOptions.series[0].data[3] / contador;
    }
    else {
      this.grafico = false;
    }

  }



}
