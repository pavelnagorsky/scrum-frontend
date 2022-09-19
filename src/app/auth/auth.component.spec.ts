import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let store: MockStore<{
    auth: {
      loading: boolean,
      error: string | null
    }
  }>;
  const initialState = {
    auth: {
      loading: false,
      error: null
    }
  };
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              login: true
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    store = TestBed.inject(MockStore);
 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create should set loginMode to true if there is a login param = true', () => {
    component.ngOnInit();
    expect(component.loginMode).toBe(true);
  });
});
