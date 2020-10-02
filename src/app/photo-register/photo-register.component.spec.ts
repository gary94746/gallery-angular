import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoRegisterComponent } from './photo-register.component';

describe('PhotoRegisterComponent', () => {
  let component: PhotoRegisterComponent;
  let fixture: ComponentFixture<PhotoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
