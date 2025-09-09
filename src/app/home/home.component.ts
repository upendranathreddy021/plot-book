import { Component, ElementRef, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
declare var bootstrap: any;
import { ToastrService } from "ngx-toastr";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi?: User;
    formGroup!: FormGroup;
    @ViewChild('exampleModal') exampleModal!: ElementRef;
    @ViewChild('ModalPerson') ModalPerson!: ElementRef;
    programType!:any;
    modalForm!: FormGroup; // Form for the modal
    sourcePersons: any;
    modalFormStype!: FormGroup; // Form for the modal
    sourceTypes: any;
    displayedColumns: string[] = ['serialNo', 'programType', 'sourceType', 'person','additionalDetails'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource!:any;
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder, private http: HttpClient,
        private toastrService: ToastrService
    ) {
        this.user = <User>this.authenticationService.userValue;
        this.formGroup = this.fb.group({
            rows: this.fb.array([]),
        });

        this.modalForm = this.fb.group({
            sourcePerson: ['', Validators.required],
        });

        this.modalFormStype = this.fb.group({
            sourceType: ['', Validators.required],
        });

        // Add the initial row
        this.addRow();
    }

    ngOnInit() {
        
        this.loading = true;
        this.userService.getById(this.user.userId).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
        //this.getCurriculmData()
        //this.getSourceType()
        //this.getSourcePerson()
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getSourceType() {
        this.sourceTypes = []
        let url = environment.apiUrl+'/v1/dropdown/sourceType';
        this.http.get(url).subscribe(
            {
                next:(res:any) => {
                    this.sourceTypes = res.data
                },error:(error) => {
                    this.sourceTypes = []                    
                }
            }
        );
    }

    getSourcePerson(){
        this.sourcePersons = []
        let url = environment.apiUrl+'/v1/dropdown/person';
        this.http.get(url).subscribe(
            {
                next:(res:any) => {
                    this.sourcePersons = res.data
                },error:(error) => {
                    this.sourcePersons = []                    
                }
            }
        );
    }

    // Get rows as a FormArray
    get rows() {
        return this.formGroup.get('rows') as FormArray;
    }

    // Add a new row
    addRow(): void {
        const rowGroup = this.fb.group({
            serviceType: ['', Validators.required],
            person: ['', Validators.required],
            additionalDetails: ['', Validators.required],
        });
        this.rows.push(rowGroup);
    }

    // Remove a specific row
    removeRow(index: number): void {
        this.rows.removeAt(index);
    }

    // Submit API
    submitData(): void {
        let url = environment.apiUrl+'/v1/curriculum';
        const payload = this.formGroup.value.rows;
        payload.forEach((element: any) => {
            element['programType'] = this.programType;
        })
        this.http.post(url, payload).subscribe(
            (response) => {  
                this.programType = '';   
                (this.formGroup.get("rows") as FormArray).clear();          
                this.formGroup.reset({                    
                    rows: [this.addRow()] // Reset rows to one empty row
                });
                this.getCurriculmData()
                this.closeModal();
                //this.toastrService.success('Data Saved Successfully', '');
            },
            (error) => {       
                this.programType = '';            
                (this.formGroup.get("rows") as FormArray).clear();    
                this.addRow();
                this.closeModal();
                //this.toastrService.error('Unable To Save', 'Error!');
            }
        );
    }

    curriculumData:any;
    errorMessage!:string
    pageSize: number = 25
    pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100];
    pageEvent!: PageEvent;
    getCurriculmData() {
        this.curriculumData = ''
        this.errorMessage = ''
        let url = environment.apiUrl+'/v1/curriculum?page='+this.currentIndex+'&size='+this.pageSize;
        this.http.get(url).subscribe(
            {
                next:(res:any) => {
                    this.curriculumData = res.data
                    this.dataSource = new MatTableDataSource(res?.data);
                    this.dataSource.paginator = res?.data?.count;
                    this.dataSource.sort = this.sort;
                },
                error:(error) => {
                    this.curriculumData = ''
                    this.errorMessage = 'No Data Found'
                }
            }
        );
    }

    currentIndex!: number;
    pagesNumber!: number;
    onPaginationChange($event: PageEvent) {
        console.log($event);
        let page = $event.pageIndex;
        let size = $event.pageSize;
        this.currentIndex = $event.pageIndex;
        this.pagesNumber = $event.pageSize;
        this.pageSize = $event.pageSize;
        console.log(this.currentIndex, this.pagesNumber);
        this.getCurriculmData();
      }

    openModal(): void {
        const modal = new bootstrap.Modal(this.exampleModal.nativeElement);
        modal.show();
    }

    closeModal(): void {
        const modal = bootstrap.Modal.getInstance(this.exampleModal.nativeElement);
        modal.hide();
    }

    onConfirm(): void {
        console.log('Form Data:', this.formGroup.value);
        this.closeModal();
    }

    openModalPerson(): void {
        const modal = new bootstrap.Modal(this.ModalPerson.nativeElement);
        modal.show();
    }
    
    onModalSubmit(){
        if (this.modalForm.valid) {
            // Add source type to the array
            const newSourcePerson = this.modalForm.value.sourcePerson;
            this.sourcePersons.push({
                type: "person",
                values: newSourcePerson
            });
            let url = environment.apiUrl+'/v1/dropdown';
            this.http.post(url, {type: "person", values: newSourcePerson}).subscribe(
                {
                    next:(res:any) => {                        
                        this.getSourcePerson()
                        this.modalForm.reset();
                        //this.toastrService.success('Data Saved Successfully', '');
                        //this.closeModalPerson()
                    },
                    error:(error) => {                        
                        this.modalForm.reset();
                        //this.toastrService.error('Unable To Save', 'Error!');
                        //this.closeModalPerson()
                    }
                }
            );
            //this.modalForm.reset();
            //this.closeModalPerson()
        }
    }

    closeModalPerson(): void {
        const modal = bootstrap.Modal.getInstance(this.ModalPerson.nativeElement);
        modal.hide();
    }

    
    onModalSubmitType(){
        if (this.modalFormStype.valid) {
            // Add source type to the array
            const newSourceType = this.modalFormStype.value.sourceType;
            this.sourceTypes.push({
                type: "sourceType",
                values: newSourceType
            });
            let url = environment.apiUrl+'/v1/dropdown';
            this.http.post(url, {type: "sourceType", values: newSourceType}).subscribe(
                {
                    next:(res:any) => {                        
                        this.getSourceType()
                        this.modalFormStype.reset();
                        //this.toastrService.success('Data Saved Successfully', '');
                        //this.closeModalType()
                    },
                    error:(error) => {                        
                        this.modalFormStype.reset();
                        //this.toastrService.error('Unable To Save', 'Error!');
                        //this.closeModalType()
                    }
                }
            );
            //this.modalFormStype.reset();
            //this.closeModalType()
        }
    }

    closeModalType(): void {
        const modal = bootstrap.Modal.getInstance(
            document.getElementById('modal')
          );
        modal.hide();
    }
}