import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AuthState } from '../store/reducers/auth.reducer';
import { logout } from '../store/actions/auth.actions';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<{ auth: AuthState }>;
  let authState: AuthState = {
    loading: false,
    authError: null,
    userId: null,
    token: null
  };
  let initialState = {
    auth: authState
  };

  beforeEach(async () => {  
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should dispatch an logout action when onLogout() is called', () => {
    const expected = logout();
    component.onLogout(); // This will trigger change
    fixture.detectChanges();
    store.scannedActions$.subscribe(a => {
      expect(a.type).toEqual(expected.type);
    })
  });

  it('should set isAuth false when onLogout() called', () => {
    component.onLogout(); // This will trigger change
    fixture.detectChanges();
    expect(component.isAuth).toBe(false);
  });
});