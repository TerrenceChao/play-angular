import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesssagesChannelComponent } from './messsages-channel.component';

describe('MesssagesChannelComponent', () => {
  let component: MesssagesChannelComponent;
  let fixture: ComponentFixture<MesssagesChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesssagesChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesssagesChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
