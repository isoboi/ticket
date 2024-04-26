import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class BaseCrudService<T> {
  protected path!: string
  protected readonly http: HttpClient = inject(HttpClient)

  add(data: Partial<T>) {
    return this.http.post<T>(this.path, data)
  }

  delete(id: number) {
    return this.http.delete(`${this.path}/${id}`)
  }

  edit(data: Partial<T>, id: number) {
    return this.http.put<T>(`${this.path}/${id}`, data)
  }

  get(id: number) {
    return this.http.get<T>(`${this.path}/${id}`)
  }

  getAll(params: any) {
    return this.http.get<T[]>(this.path, {params})
  }
}
