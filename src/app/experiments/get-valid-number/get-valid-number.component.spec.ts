import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetValidNumberComponent } from './get-valid-number.component';

describe('GetValidNumberComponent', () => {
  let component: GetValidNumberComponent;
  let fixture: ComponentFixture<GetValidNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetValidNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetValidNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
