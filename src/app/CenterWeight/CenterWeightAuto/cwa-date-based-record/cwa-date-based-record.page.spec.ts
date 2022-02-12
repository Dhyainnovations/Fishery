import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CWADateBasedRecordPage } from './cwa-date-based-record.page';

describe('CWADateBasedRecordPage', () => {
  let component: CWADateBasedRecordPage;
  let fixture: ComponentFixture<CWADateBasedRecordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CWADateBasedRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CWADateBasedRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
