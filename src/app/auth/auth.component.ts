import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SignupRequestData, LoginRequestData } from '../services/auth.service';
import { loginStart, signupStart } from '../store/actions/auth.actions';
import { AppState } from '../store/reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  loginMode: boolean;
  loading = false;
  error: string | null = null;
  private storeSub: Subscription;

  constructor(
    private store: AppState,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  onSwitchMode() {
    // clear form
    this.authForm.reset();
    // change auth mode
    this.loginMode = !this.loginMode;
    this.error = null;
    // remove username field in loginMode 
    if (this.loginMode) {
      this.authForm.removeControl('username');
    } else {
      this.addUsernameControl()
    };
    // add query param if go to login
    let queryParams = this.loginMode ? {
      login: true
    } : {
      login: false
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    });
  }

  onSubmit() {
    this.error = null;
    if (!this.authForm.valid) return;
    this.loading = true;
    if (this.loginMode) {
      const loginData: LoginRequestData = {
        email: this.authForm.value['email'],
        password: this.authForm.value['password']
      };
      this.store.dispatch(loginStart(loginData));
    } else {
      const signupData: SignupRequestData = {
        username: this.authForm.value['username'],
        email: this.authForm.value['email'],
        password: this.authForm.value['password']
      };
      this.store.dispatch(signupStart(signupData));
    }
  }

  ngOnInit(): void { 
    this.activatedRoute.queryParams.subscribe(params => {
      const loginParam: string | boolean | undefined = params['login'];
      if (loginParam && (loginParam === 'true' || loginParam === true )) {
        this.loginMode = true;
      } else {
        this.loginMode = false;
      }
      this.initForm();
    });

    this.storeSub = this.store.select(state => state.auth).subscribe(
      ({ loading, authError }) => {
        this.loading = loading;
        this.error = authError;
      }
    )
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }

  onCloseError() {
    this.error = null;
  }

  private initForm() {
    // создаеи форму для логина
    this.authForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z0-9_-]+$/)
      ]]
    });
    // для регистрации добавляем поле username
    if (!this.loginMode) {
      this.addUsernameControl()
    }
  };

  // для правильного отображения bootsrap классов is-valid, is-invalid
  isValid(field: string): string {
    if (this.authForm.get(field)) {
      return (
        !this.authForm.get(field)?.valid && this.authForm.get(field)?.touched) 
          ? 'is-invalid' 
          : this.authForm.get(field)?.touched 
            ? 'is-valid' 
            : '';
    } else {
      return ""
    }
  }

  showControlMessage(field: string): boolean {
    let control = this.authForm.get(field);
    if (!control) return false;
    if (control.invalid && control.touched) {
      return true
    } else {
      return false
    }
  }

  // добавить поле username в форму
  private addUsernameControl() {
    this.authForm.addControl(
      'username', new FormControl(
        '', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[а-яА-Яa-zA-Z0-9_-]+$/)
        ]
      )
    )
  }
}
