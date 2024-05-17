import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { TemplatePortal } from '@angular/cdk/portal';
import { EditModelComponent } from '../edit-model/edit-model.component';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// import { MatDialog } from '@angular/material/dialog/dialog';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: any;
  regis:any;
  term: string = '';
  showForm: boolean = false;
  selectedData:any;
  registrationForm!: FormGroup;
  states: string[] = [];
  cities: string[] = [];
  registrationd:any[]=[];
  firstName:any;
  inputdata:any;
  name="Uttpreksha";
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender','pno','email','desig','dob','age','photo','country','city','state','pincode'];

  dataSource!: MatTableDataSource<any>;
  uploadedImage:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private fb: FormBuilder,private api:ApiService,private router:Router, private dialog: MatDialog
  )
   {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender: ['',Validators.required],
      pno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [ '',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      desig: ['',Validators.required],
      dob: ['',Validators.required],
      age:['',Validators.required],
      photo: ['',Validators.required],
      country: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{8}')]]    })
    this.getAllData();
    
   
  }

  getAllData(){
    
    this.api.getRegistrationDetails().subscribe
    ({
      next:(res:any)=>{

      this.registrationd=res;
      
        console.log(res)
    },
  error:(err)=>{
    alert("Error")
  }
   })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  toggleFormVisibility(event: Event) {
    event.preventDefault(); // Prevent default behavior of anchor tag
    this.showForm = !this.showForm;
  }
  onSubmit() {
    if(this.registrationForm.valid)
      {

      
    this.api.postRegistrationDetails(this.registrationForm.value).subscribe((res:any)=>{
      console.log(res)
      // this.closepopup()
      const newRecord = { ...res, photoUrl: res.photo };
      this.registrationd.push(newRecord);

    })
  
    this.getAllData(); 
    this.router.navigate(['/dashboard']);
  }
  else {
    alert('Please fill all the mandatory fields');
    for (const i in this.registrationForm.controls) {
      this.registrationForm.controls[i].markAsDirty();
      this.registrationForm.controls[i].markAllAsTouched();
    }
  }
 
}
 updatePhoneNumber() {
    const phoneNumberControl = this.registrationForm.get('pno');
    if (phoneNumberControl?.value?.startsWith('+91')) {
        return;
    }
    phoneNumberControl?.setValue('+91' + phoneNumberControl?.value);
}

handleFileInput(event: any) {
  const file: File = event.target.files[0];
  if (file) {
   
    const imageUrl = URL.createObjectURL(file);
    
    this.registrationForm.patchValue({ photo: imageUrl });
  }
}

  onCountryChange() {
    const country = this.registrationForm.get('country')?.value;

    if (country === 'india') {
      this.states = ['Maharashtra', 'Telangana'];
      this.cities = ['Mumbai', 'Hyderabad']; 
    } else if (country === 'usa') {
      this.states = ['California', 'New York']; 
      this.cities = ['Los Angeles', 'New York City'];
    } else {
      this.states = [];
      this.cities = [];
    }
  }
  calculateAge() {
    const dobControl = this.registrationForm.get('dob');
    const ageControl = this.registrationForm.get('age');

    if (dobControl?.value) {
      const dob = new Date(dobControl.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      ageControl?.setValue(age);
    }
  }



editDetails(row: any) {
  console.log("Opening dialog with row data:", row);
  this.dialog.open(EditModelComponent, {
    width: '60%',
    data: row
  });
}

  
  deleteData(regis:any)
  {
    this.api.deleteRegistrationDetails(regis.id).subscribe((resp)=>{
      console.log(resp)
    })
    this.getAllData()

  }
  get totalPages(): number {
    return Math.ceil(this.registrationd.length / 5);
  }

  getDisplayedRecords(): string {
    const startIndex = (this.currentPage - 1) * 5 + 1;
    const endIndex = Math.min(this.currentPage * 5, this.registrationd.length);
    return `Showing ${startIndex} to ${endIndex} of ${this.registrationd.length}`;
  }

  previousPage() {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }


}


