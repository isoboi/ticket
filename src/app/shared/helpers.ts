import { FormArray } from '@angular/forms'

export function handleParams(filters: any, pageIndex: number, pageSize: number = 10) {
  const params: any = {
    page: pageIndex + 1,
    pageSize,
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null) {
      params[key] = value
    }
  })

  return params
}

export function roundNumber(num: number, dec: number = 6) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export function clearFormArray(formArray: FormArray) {
  while (formArray.length !== 0) {
    formArray.removeAt(0)
  }
}
