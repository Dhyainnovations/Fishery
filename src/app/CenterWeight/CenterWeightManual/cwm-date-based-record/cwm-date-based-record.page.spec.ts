import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CWMDateBasedRecordPage } from './cwm-date-based-record.page';

describe('CWMDateBasedRecordPage', () => {
  let component: CWMDateBasedRecordPage;
  let fixture: ComponentFixture<CWMDateBasedRecordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CWMDateBasedRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CWMDateBasedRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
