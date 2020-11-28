import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInfluencerComponent } from './select-influencer.component';

describe('SelectInfluencerComponent', () => {
  let component: SelectInfluencerComponent;
  let fixture: ComponentFixture<SelectInfluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInfluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
