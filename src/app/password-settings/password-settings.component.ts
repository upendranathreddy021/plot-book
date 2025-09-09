
import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { PasswordStrengthValidator } from "src/app/_helpers/passward-strength";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { APIS } from '@app/constants/constants';
import { CommonServiceService } from "@app/_services/common-service.service";
import { ToastrService } from "ngx-toastr";
import { merge } from "rxjs";

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css']
})
export class PasswordSettingsComponent implements OnInit {
  passwordshowOld: Boolean = false;
  passwordshowNew: Boolean = false;
  passwordshowConfirm: Boolean = false;
  oldNewError: Boolean = false;
  changePasswordForm!: FormGroup;
  agencyDetails: any
  constructor(private toastrService: ToastrService,
    private _commonService: CommonServiceService,) {
      console.log("PasswordSettingsComponent constructor called");
    this.agencyDetails = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log("PasswordSettingsComponent constructor called",this.agencyDetails);
  }

  ngOnInit(): void {

    this.initializeForm()
    merge(
      this.f["oldPassword"].valueChanges,
      this.f["newPassword"].valueChanges
    ).subscribe({
      next: (v) => {
        if (
          this.f["oldPassword"]?.value?.length ==
          this.f["newPassword"].value?.length
        ) {
          if (this.f["oldPassword"]?.value == this.f["newPassword"].value) {
            this.oldNewError = true;
          }
        } else {
          this.oldNewError = false;
        }
      },
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }
  initializeForm() {
    this.changePasswordForm = new FormGroup(
      {
        userId: new FormControl(this.agencyDetails?.userId),
        oldPassword: new FormControl("", [Validators.required]),
        newPassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,

            Validators.minLength(8), PasswordStrengthValidator,])
        ),
        conformNewPassword: new FormControl("", [Validators.required]),
      },
      { validators: passwordMatchingValidatior }
    );
  }

  changePassword() {
    console.log(this.changePasswordForm.value)
    let payload: any = {
      "userId": this.changePasswordForm.value?.userId,
      "oldPassword": this.changePasswordForm.value?.oldPassword,
      "newPassword": this.changePasswordForm.value?.newPassword
    }

    this._commonService.updatedata(APIS.tihclMasterList.changePassword, payload).subscribe({
      next: (data: any) => {
        this.toastrService.success('Change Password Updated Successfully', "Change Password Success!");
        this.changePasswordForm.reset();
      },
      error: (error: any) => {

      }
    })
  }
}
export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get("newPassword");
  const conformNewPassword = control.get("conformNewPassword");

  return newPassword?.value === conformNewPassword?.value
    ? null
    : { notMatch: true };
};
