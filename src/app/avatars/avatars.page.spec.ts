import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarsPage } from './avatars.page';

describe('AvatarsPage', () => {
  let component: AvatarsPage;
  let fixture: ComponentFixture<AvatarsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
