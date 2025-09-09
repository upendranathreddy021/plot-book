import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  addPaymentForm!: FormGroup;
  addPaymentModal: any;
  totalPrice = 2500000;
  searchMode: 'customer' | 'plot' = 'customer'; // Default to customer search

  paymentRecords = [
    {
      sNo: 1,
      date: '15 Jan 2024',
      amount: 500000,
      bank: 'Chase Bank',
      from: 'John Smith',
      transactionId: 'TXN001234567',
      discountDate: '15 Jan 2024',
      discountAmount: 25000
    },
    {
      sNo: 2,
      date: '20 Jan 2024',
      amount: 750000,
      bank: 'Bank of America',
      from: 'Sarah Johnson',
      transactionId: 'TXN001234568',
      discountDate: '20 Jan 2024',
      discountAmount: 15000
    },
    {
      sNo: 3,
      date: '25 Jan 2024',
      amount: 600000,
      bank: 'Wells Fargo',
      from: 'Michael Davis',
      transactionId: 'TXN001234569',
      discountDate: '',
      discountAmount: 0
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize modal
    this.addPaymentModal = new window.bootstrap.Modal(
      document.getElementById('addPaymentModal')
    );

    // Initialize form
    this.addPaymentForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      from: [''],
      transactionId: [''],
      bankName: [''],
      paymentMode: [''],
      discountDate: [''],
      discountAmount: ['']
    });
  }

  onSavePayment() {
    if (this.addPaymentForm.valid) {
      const formValue = this.addPaymentForm.value;
      const newRecord = {
        sNo: this.paymentRecords.length + 1,
        date: formValue.date,
        amount: +formValue.amount,
        bank: formValue.bankName || '-',
        from: formValue.from || '-',
        transactionId: formValue.transactionId || '-',
        discountDate: formValue.discountDate || '',
        discountAmount: +formValue.discountAmount || 0
      };

      this.paymentRecords.push(newRecord);
      console.log('Payment saved:', newRecord);
      
      // Hide modal and reset form
      this.addPaymentModal.hide();
      this.addPaymentForm.reset();
    }
  }

  getTotalAmount(): number {
    return this.paymentRecords.reduce((total, record) => {
      return total + record.amount - record.discountAmount;
    }, 0);
  }
}
