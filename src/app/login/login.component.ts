import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    showPassword = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        const { username, password } = this.loginForm.value;

        // Simulate API call
        setTimeout(() => {
            if (username === 'admin' && password === 'Admin@2025') {
                this.error="";
                this.router.navigate(['/book-plot']); // Navigate to home page on success
            } else {
                this.error = 'Invalid username or password';
            }
            this.loading = false;
        }, 500);
    }
}
