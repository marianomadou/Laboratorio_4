import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { CustomerI} from '../models/customer.interface';

export interface CustomerID extends CustomerI { id:string; }

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private customerCollection: AngularFirestoreCollection<CustomerI>;
  customers: Observable<CustomerID[]>;
  
  public selected = {
    id:null,
    name: '',
    city: '',
    order: ''
  };

  constructor(private readonly afs:AngularFirestore) { 
    this.customerCollection= afs.collection<CustomerI>('customers');
    this.customers=this.customerCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );//codigo de ejemplo de angular
  }

  getAllCustomers(){
    //devuelve todos los clientes
    return this.customers;
  }

  editCustomer(customer: CustomerID){
    
    return this.customerCollection.doc(customer.id).update(customer);
  }

  deleteCustomer(id: string){
    return this.customerCollection.doc(id).delete();
  }

  addCustomer(customer: CustomerI){
    return this.customerCollection.add(customer);
  }


}
