import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRadiationComponent } from './update-radiation.component';

describe('UpdateRadiationComponent', () => {
  let component: UpdateRadiationComponent;
  let fixture: ComponentFixture<UpdateRadiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRadiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRadiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
