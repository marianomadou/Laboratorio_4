import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerI} from '../../models/customer.interface';
import { CustomerService} from '../../services/customer.service';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { FormComponent} from '../form/form.component';

@Component({
  selector: 'ListCustomers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'order', 'actions', 'new'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private customerService: CustomerService, 
              private dialog: MatDialog) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res=>this.dataSource.data=res);//acá se escribe la tabla
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element:any){
    this.resetForm();//resetea el formulario
    this.openModal();

    if (element){
      this.customerService.selected = element;
    }
    
  }

  onCreate(customer:any){
    this.resetForm();//resetea el formulario
    this.openModal();
    this.customerService.addCustomer(customer);
  }

  onDelete(id: string){
    //console.log('delete', id);
    //llamar al service y al metodo delete
    this.customerService.deleteCustomer(id);
  }

  //importar Service
  //inyectar Service
  //utilizar service

  openModal():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      title: 'Modal'
    };
    dialogConfig.autoFocus=true;
    this.dialog.open(FormComponent, dialogConfig);
  }

  resetForm():void{
    this.customerService.selected.name='';
    this.customerService.selected.city='';
    this.customerService.selected.order='';
    this.customerService.selected.id='';
  }

}
