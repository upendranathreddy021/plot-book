import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from '@app/constants/constants';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private currentStep = 1;
  constructor(private http: HttpClient) { }
  private formatErrors(error: HttpErrorResponse) {
    return throwError(() => error);
  }
 setCurrentStep(step: number) {
    this.currentStep = step;
  }
  getCurrentStep(): number {
    return this.currentStep;
  }
  public add(URL: any, payload: any): Observable<any> {
    return this.http.post(URL, payload).pipe(catchError(this.formatErrors));
  }
 
  public update(URL: any, payload: any, id: number | string): Observable<any> {
    return this.http.put(URL + id, payload).pipe(catchError(this.formatErrors));
  }
  public updatedata(URL: any, payload: any,): Observable<any> {
    return this.http.put(URL, payload).pipe(catchError(this.formatErrors));
  }
   public updatedataPatch(URL: any, payload: any,): Observable<any> {
    return this.http.patch(URL, payload).pipe(catchError(this.formatErrors));
  }
  public updatedataByUrl(URL: any): Observable<any> {
    return this.http.put(URL,{}).pipe(catchError(this.formatErrors));
  }
  public getById(URL: any, id: any,): Observable<any> {
    return this.http.get(URL+id).pipe(catchError(this.formatErrors));
  }
   public deleteById(URL: any, id: any,): Observable<any> {
    return this.http.delete(URL+id).pipe(catchError(this.formatErrors));
  }

  uploadImage(formData:any): Observable<any> {
    const url = APIS.programCreation.addSessions;
    return this.http.post(url, formData);
  }

  public getDataByUrl(URL: any): Observable<any> {
    return this.http.get(URL).pipe(catchError(this.formatErrors));
  }
     private extractFileNameFromPath(path: string): string {
    return path.split('/').pop() || 'download';
  }
 
  // Method to download file from S3 URL
  downloadFile(s3Url: string, fileName: string): void {
    // For direct S3 download (if bucket is public)
    this.http.get(s3Url, { responseType: 'blob' }).subscribe(blob => {
      this.saveFile(blob, fileName);
    });
    
    // Note: For private buckets, you should use a backend service to generate
    // signed URLs or proxy the download
  }

  private saveFile(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
  getDate(){
    const today = new Date();
  today.setDate(today.getDate() - 1);
  return today.toISOString().split('T')[0];
  }
  requestDataFromMultipleSources( url1:any, url2:any, fileData:any,sessionData:any): Observable<any[]> {    
    let response1 = this.http.post(url1, fileData).pipe(catchError(this.formatErrors));
    let response2=this.http.post(url2, sessionData).pipe(catchError(this.formatErrors));
    // sessionData.map((data:any)=>{ 
    //   console.log(data)
    //   let formData = new FormData();
    //   console.log(data.uploaFile,uploadFiles)
    //   // formData.set("files",data);
    //   if(uploadFiles.length==1){
    //     formData.append("files", uploadFiles);
    //   }
    //   else{
    //     uploadFiles.forEach((file:any) => {
    //       formData.append("files", file);
    //     })
    //   }
     
    //   delete data.uploaFile;
    //   formData.set("data", data);
    //   console.log(formData)
    //   response2 = this.http.post(url2,formData).pipe(catchError(this.formatErrors));
    // })
    
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2]);
  }
}
