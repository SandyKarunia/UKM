import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ButtonLoginComponent } from './button-login.component';

describe('LoginComponent', () => {
  let component: ButtonLoginComponent;
  let fixture: ComponentFixture<ButtonLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonLoginComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await expect(component)
      .toBeTruthy();
  });
});
