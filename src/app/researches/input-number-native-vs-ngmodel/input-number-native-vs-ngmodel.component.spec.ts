import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberNativeVsNgmodelComponent } from './input-number-native-vs-ngmodel.component';

describe('InputNumberNativeVsNgmodelComponent', () => {
  let component: InputNumberNativeVsNgmodelComponent;
  let fixture: ComponentFixture<InputNumberNativeVsNgmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberNativeVsNgmodelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNumberNativeVsNgmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
