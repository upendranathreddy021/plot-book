import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPlotComponent } from './book-plot.component';

describe('BookPlotComponent', () => {
  let component: BookPlotComponent;
  let fixture: ComponentFixture<BookPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
