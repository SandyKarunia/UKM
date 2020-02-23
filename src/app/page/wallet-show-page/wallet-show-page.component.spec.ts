import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletShowPageComponent } from './wallet-show-page.component';

describe('WalletShowPageComponent', (): void => {
  let component: WalletShowPageComponent;
  let fixture: ComponentFixture<WalletShowPageComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [WalletShowPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async (): Promise<void> => {
    await expect(component)
      .toBeTruthy();
  });
});
