import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPageComponent } from './wallet.component';

describe('WalletShowPageComponent', () => {
  let component: WalletShowPageComponent;
  let fixture: ComponentFixture<WalletShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletShowPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
