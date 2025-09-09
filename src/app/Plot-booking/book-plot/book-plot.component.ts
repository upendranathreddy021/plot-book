import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-book-plot',
  templateUrl: './book-plot.component.html',
  styleUrls: ['./book-plot.component.css']
})
export class BookPlotComponent implements OnInit {
  addCustomerForm!: FormGroup;
  formModal: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('addCustomerModal')
    );

    this.addCustomerForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailAddress: ['', Validators.email],
      city: [''],
      state: [''],
      zipCode: [''],
      address: ['']
    });
  }

  onSaveCustomer() {
    if (this.addCustomerForm.valid) {
      console.log(this.addCustomerForm.value);
      // Here you can add the logic to save the customer data
      this.formModal.hide();
      this.addCustomerForm.reset();
    }
  }
}
