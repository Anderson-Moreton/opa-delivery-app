import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message = signal('');
  type = signal<'success' | 'error' | 'info'>('info');
  visible = signal(false);

  private timeout: any;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {

    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.visible.set(false);
    }, 2000);
  }
}