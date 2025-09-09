import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-global-dashboard',
  templateUrl: './global-dashboard.component.html',
  styleUrls: ['./global-dashboard.component.css']
})
export class GlobalDashboardComponent implements OnInit {

  url:any
  cacheBuster = new Date().getTime();
  constructor(
    private sanitizer: DomSanitizer
  ) { }

 
  loginsessionDetails: any;
 

  ngOnInit(): void {
    this.loginsessionDetails = JSON.parse(sessionStorage.getItem('user') || '{}');  
    console.log(this.loginsessionDetails);
    //console.log('https://lookerstudio.google.com/embed/reporting/fcab1a0e-f906-4487-85fa-8097553cbc4b/page/p_iqwy179urd')
    // this.url = this.sanitizer
    // .bypassSecurityTrustResourceUrl('https://lookerstudio.google.com/embed/reporting/fcab1a0e-f906-4487-85fa-8097553cbc4b/page/p_iqwy179urd?cache=' + this.cacheBuster);
    this.setDashboardUrl();
  }


  setDashboardUrl(): void {
    switch (this.loginsessionDetails.userId) {      
      case 'b3ca0091-d2e6-4716-9c72-f4f3889d36ca':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://lookerstudio.google.com/reporting/c3cfbbe8-992b-43a0-9e29-6a0e34c81dd2'
        );
        break;
      case 'e3d08054-e5cb-4231-9eb0-432ac2c569a8':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://lookerstudio.google.com/reporting/480e6275-7aac-4c37-856f-a6f5fcde3f21'
        );
        break;
         case '1145be0e-fbbb-47d2-b67d-030c95d1f369':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://lookerstudio.google.com/reporting/8f3200a9-5c2f-425f-b89e-71a880d1550a'
        );
        break;
         case '21d35a88-bb51-4ed0-be36-2fa7b3a500d5':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/be915832-9da4-422d-8ea1-3a64b5dca0e1'
        );
        break;
         case '5bea8a43-db75-4292-8f51-1e85ba44111a':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/f877f566-5fd6-4c9b-9f09-299ae94fa768'
        );
        break;
         case '756edb90-97ac-4b30-9ba6-74509788cda6':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/74368c36-2e1c-4ddd-8691-e6b57c4fa200'
        );
        break;
         case 'bc1ac718-4d6e-4a86-9ec0-a9b1748f2a49':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/643d2038-ec80-40f8-afee-704cd8e3a1e1'
        );
        break;
                 case 'c7c4df33-38c4-43a0-86a3-b12baf093640':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/b966437e-860b-4080-8a8d-c213cf9329ee'
        );
        break;
                 case 'cc071924-5d3a-4cd3-9287-37da92485855':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/7b94d358-96f5-499d-8187-8291038cc449'
        );
        break;
        case '9c99aff3-f2e5-4785-8b74-81836f774a9e':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/7b94d358-96f5-499d-8187-8291038cc449'
        );
        break;
      default:
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
           'https://lookerstudio.google.com/reporting/c3cfbbe8-992b-43a0-9e29-6a0e34c81dd2'
        );
    }
  }

}
