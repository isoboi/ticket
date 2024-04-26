import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key)
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
