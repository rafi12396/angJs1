import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  globalId:any;
  navgtr:any;
  userID:any;
  per=new Hero();

  constructor() { }

  ngOnInit() {
  }

  onSign() {

    this.navgtr=window.navigator;
    let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

    let publicKey = {
      challenge: challenge,
  
      allowCredentials: [
          { type: "public-key", id: this.globalId }
      ]
  }
  
  this.navgtr.credentials.get({ 'publicKey': publicKey })
    .then((getAssertionResponse) => {
        alert('SUCCESSFULLY GOT AN ASSERTION! Open your browser console!')
        console.log('SUCCESSFULLY GOT AN ASSERTION!', getAssertionResponse)
    })
    .catch((error) => {
        alert('Open your browser console!')
        console.log('FAIL', error)
    })

  }


  onReg() {
    this.navgtr=window.navigator;

let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

this.userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
let id = Uint8Array.from(challenge)
console.log(id)
this.globalId=id;

let publicKey = {
    'challenge': challenge,

    'rp': {
        'name': 'Random Inc.'
    },

    'user': {
        'id': id,
        'name': 'abc@xyz.com',
        'displayName': 'abc xyz'
    },

    'pubKeyCredParams': [
        { 'type': 'public-key', 'alg': -7  },
        { 'type': 'public-key', 'alg': -257 }
    ]
}

this.navgtr.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo)
    })
    .catch((error) => {
        console.log('FAIL', error)
    })

  }

}
