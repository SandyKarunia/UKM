import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardComponent } from './base-card.component';

describe('BaseCardComponent', (): void => {
  let component: BaseCardComponent;
  let fixture: ComponentFixture<BaseCardComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [BaseCardComponent]
    })
      .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(BaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async (): Promise<void> => {
    await expect(component)
      .toBeTruthy();
  });
});
