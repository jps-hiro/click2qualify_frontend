import { Component, OnInit } from '@angular/core';
import industriesList from '../../../resources/industries.js'
import jobTitlesList from '../../../resources/jobTitles.js'
import { allCountries } from 'country-telephone-data'
@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  industries: any[] = industriesList
  jobTitles: any[] = jobTitlesList
  countryCodes: any[] = allCountries
  showCountryCodeDropdown: boolean = false
  selectedCountry: string = '44'
  signupModel: any = new Object();
  isProfileFormSubmitted = false;
  isIndustyFormSubmitted = false;
  isSMSVerified = false;
  isSMSSent = false;
  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.showCountryCodeDropdown = !this.showCountryCodeDropdown
  }

  selectCountryCode(code) {
    this.selectedCountry = code
    this.showCountryCodeDropdown = false
  }

  onPersonalFormSubmit(form){
    if (!form.valid) {
      this.isProfileFormSubmitted = true;
      return;
    }
  }

  onIndustryFormSubmit(form)
  {
    if (!form.valid) {
      this.isIndustyFormSubmitted = true;
      return;
    }
  }

  testTelNumber () {
    var myTelNo = this.signupModel.Mobile;
    // If invalid number, report back error
    if (!this.checkUKTelephone (myTelNo)) {
      return true;
    }
    // Otherwise redisplay telephone number on form in corrected format
    else {
      return false;
    }
  }

  checkUKTelephone (telephoneNumber) {
    var telNumberErrorNo = 0;
    // Convert into a string and check that we were provided with something
    var telnum = telephoneNumber + " ";
    if (telnum.length == 1)  {
       telNumberErrorNo = 1;
       return false
    }
    
    var exp = /^(\+)[\s]*(.*)$/;
    if (exp.test(telnum) == true) {
       telNumberErrorNo = 2;
       return false;
    }
    
    // Remove spaces from the telephone number to help validation
    while (telnum.indexOf(" ")!= -1)  {
      telnum = telnum.slice (0,telnum.indexOf(" ")) + telnum.slice (telnum.indexOf(" ")+1)
    }
    
    // Remove hyphens from the telephone number to help validation
    while (telnum.indexOf("-")!= -1)  {
      telnum = telnum.slice (0,telnum.indexOf("-")) + telnum.slice (telnum.indexOf("-")+1)
    }  
    // Now check that all the characters are digits
    exp = /^[0-9]{10,11}$/;
    if (exp.test(telnum) != true) {
       telNumberErrorNo = 3;
       return false;
    }
    // Now check that the first digit is 0
    exp = /^0[0-9]{9,10}$/;
    if (exp.test(telnum) != true) {
       telNumberErrorNo = 4;
       return false;
    }
    
    // Disallow numbers allocated for dramas.
     
    // Array holds the regular expressions for the drama telephone numbers
    var tnexp = new Array ();
    tnexp.push (/^(0113|0114|0115|0116|0117|0118|0121|0131|0141|0151|0161)(4960)[0-9]{3}$/);
    tnexp.push (/^02079460[0-9]{3}$/);
    tnexp.push (/^01914980[0-9]{3}$/);
    tnexp.push (/^02890180[0-9]{3}$/);
    tnexp.push (/^02920180[0-9]{3}$/);
    tnexp.push (/^01632960[0-9]{3}$/);
    tnexp.push (/^07700900[0-9]{3}$/);
    tnexp.push (/^08081570[0-9]{3}$/);
    tnexp.push (/^09098790[0-9]{3}$/);
    tnexp.push (/^03069990[0-9]{3}$/);
    for (var i=0; i<tnexp.length; i++) {
      if ( tnexp[i].test(telnum) ) {
        telNumberErrorNo = 5;
        return false;
      }
    }
    // Finally check that the telephone number is appropriate.
    exp = (/^(01|02|03|05|070|071|072|073|074|075|07624|077|078|079)[0-9]+$/);
    if (exp.test(telnum) != true) {
       telNumberErrorNo = 5;
       return false;
    }
    
    // Telephone number seems to be valid - return the stripped telehone number  
    return telnum;
  }
}


