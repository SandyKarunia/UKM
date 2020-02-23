import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { ButtonLoginComponent } from './button-login.component';

describe('ButtonLoginComponent', (): void => {
  let component: ButtonLoginComponent;
  let fixture: ComponentFixture<ButtonLoginComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ButtonLoginComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule.withRoutes(routes),
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async (): Promise<void> => {
    await expect(component)
      .toBeTruthy();
  });
});
