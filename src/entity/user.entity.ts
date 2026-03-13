import * as Yup from 'yup';

export interface LoginValues {
  email: string;
  password: string;
}

export const loginInitialValues: LoginValues = {
  email: '',
  password: '',
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

export const signupInitialValues: SignupValues = {
  fullName: '',
  email: '',
  password: '',
};

export const signupValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Forgot Password
export interface ForgotPasswordValues {
  email: string;
}

export const forgotPasswordInitialValues: ForgotPasswordValues = {
  email: '',
};

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Verify Code
export interface VerifyCodeValues {
  code: string;
}

export const verifyCodeInitialValues: VerifyCodeValues = {
  code: '',
};

export const verifyCodeValidationSchema = Yup.object({
  code: Yup.string()
    .length(6, 'Code must be 6 digits')
    .required('Verification code is required'),
});

// Reset Password
export interface ResetPasswordValues {
  new_password: string;
  confirm_password: string;
}

export const resetPasswordInitialValues: ResetPasswordValues = {
  new_password: '',
  confirm_password: '',
};

export const resetPasswordValidationSchema = Yup.object({
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Confirm password is required'),
});
