import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {
  rowData:any=[];
  states: string[] = [];
  cities: string[] = [];
  uploadedImage:any;
    registrationForm! :FormGroup
  constructor(private fb:FormBuilder,private api:ApiService,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {

    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      pno: [''],
      email: ['', Validators.required],
      desig: [''],
      dob: [''],
      age: [''],
      photo: [''],
      country: [''],
      city: [null],
      state: [null],
      pincode: [''],
    })
    this.rowData = this.data;
    console.log("Received row data:", this.rowData);
    this.edit(this.rowData);
  

   var a=JSON.stringify(this.rowData)
console.log(a)
   

}
    
  abc:any
 edit(rowData:any){
  console.log("Data entered")
  this.registrationForm = this.fb.group({
    firstName: [this.rowData.firstName, Validators.required],
    lastName: [this.rowData.lastName],
    gender: [this.rowData.gender],
    pno: [this.rowData.pno],
    email: [this.rowData.email, Validators.required],
    desig: [this.rowData.desig],
    dob: [this.rowData.dob],
    age: [this.rowData.age],
    photo: [this.rowData.photo],
    country: [this.rowData.country],
    city: [this.rowData.city],
    state: [this.rowData.state],
    pincode: [this.rowData.pincode],
    id: [this.rowData.id]
  });
  localStorage.setItem('editedData', JSON.stringify(this.rowData));
  console.log("Data entered",rowData)
  console.log("edit",rowData.city)
  if (rowData.photo) {
    const fileName = rowData.photo.split('\\').pop(); // Extract only the file name
    this.registrationForm.patchValue({
      photo: fileName // Only set the file name
    });
  }
  this.abc=rowData;
  console.log(rowData,"checking country,city,state")
}

update(){
  let obj={
    firstName:this.registrationForm.value.firstName,
    lastName: this.registrationForm.value.lastName,
    gender: this.registrationForm.value.gender,
    pno: this.registrationForm.value.pno,
    email: this.registrationForm.value.email,
    desig:this.registrationForm.value.desig,
    dob: this.registrationForm.value.dob,
    age: this.registrationForm.value.age,
    photo: this.registrationForm.value.photo,
    country: this.registrationForm.value.country,
    city: this.registrationForm.value.city,
    state: this.registrationForm.value.state,
    pincode: this.registrationForm.value.pincode,
    id: this.abc
  }

  this.api.updateRegistrationDetails(this.abc.id,obj).subscribe((resp)=>{
console.log(resp)
alert("Data updated successfully")
  })
  this.rowData
}
handleFileInput(event: any) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedImage = e.target.result;
      console.log(e.target.result)
    };

    reader.readAsDataURL(file);
  }
}
onCountryChange() {
  const country = this.registrationForm.get('country')?.value;

  if (country === 'india') {
    this.states = ['Maharashtra', 'Telangana']; // Populate states for India
    this.cities = ['Mumbai', 'Hyderabad']; // Populate cities for India
  } else if (country === 'usa') {
    this.states = ['California', 'New York']; // Populate states for USA
    this.cities = ['Los Angeles', 'New York City']; // Populate cities for USA
  } else {
    this.states = [];
    this.cities = [];
  }
}

  }

