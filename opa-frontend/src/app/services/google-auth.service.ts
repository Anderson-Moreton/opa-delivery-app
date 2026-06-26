import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  initialize(clientId: string, callback: (credential: string) => void): void {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => {
        callback(response.credential);
      },
    });
  }

  prompt(): void {
    google.accounts.id.prompt();
  }

  renderButton(element: HTMLElement): void {
    google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      width: 280,
    });
  }
}
