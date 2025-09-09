import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  let msg = '';
  if (!value) {
    return null;
  }
  if (!/^[A-Z]/.test(value)) {
    return { passwordStrengthU: `Password must start with an uppercase letter` };
  }
  if (!/(?=.*[a-z])/.test(value)) {
    return { passwordStrengthL: `Password must contain at least one lowercase letter` };
  }
  if (!/(?=.*[0-9])/.test(value)) {
    return { passwordStrength: `Password must contain at least one number` };
  }
  if (!/(?=.*[!@#$%^&*])/.test(value)) {
    return { containsSpecialChar: `Password must contain at least one special character (!@#$%^&*)` };
  }

  return null;
};
