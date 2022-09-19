import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "./services/interceptors/auth-interceptor.service";
import { BaseUrlInterceptor } from "./services/interceptors/base-url-interceptor.service";

@NgModule({
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true,
    }
  ]
})
export class CoreModule {}