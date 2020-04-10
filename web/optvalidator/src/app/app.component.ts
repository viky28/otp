import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// const localurl = 'http://localhost:3000/';
export class AppComponent {
  constructor(private http: HttpClient) {}
  otpflag = false;
  data: any;
  message: string;
  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
    this.data = { mobileNumber: f.value };
    this.getOtp(this.data).subscribe(res => {
      console.log('res', res['otp']);
      localStorage.setItem('otp', res['otp']);
      this.otpflag = true;
    });
  }
  getOtp(data) {
    console.log('data', data);
    return this.http.post('http://localhost:3000/getOtp', data);
  }
  validateOTP(f: NgForm) {
    console.log(f.value, localStorage.getItem('otp'));
    if (localStorage.getItem('otp') === f.value.otpNum) {
      console.log('otp validated true');
      this.message = 'OTP validated success! Move to next operation';
    } else {
      console.log('otp entered is not matched!');
    }
  }
}
