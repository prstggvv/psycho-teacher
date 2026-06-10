export interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  agreement: boolean;
  [key: string]: string | boolean;
}
