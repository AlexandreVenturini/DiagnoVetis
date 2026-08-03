import type { Dog, DogFormData } from './dogTypes'

export const INITIAL_DOGS: Dog[] = [
  { id: 1, name: 'Bob', breed: 'Labrador', age: '3', weight: '28', sex: 'Macho', tutor: 'João Silva', contact: '(27) 99999-0001', history: 'Vacinação em dia' },
  { id: 2, name: 'Rex', breed: 'Pastor Alemão', age: '5', weight: '35', sex: 'Macho', tutor: 'Maria Santos', contact: '(27) 98888-0002', history: 'Acompanhamento anual em dia' },
]

export const EMPTY_DOG: DogFormData = {
  name: '',
  breed: '',
  age: '',
  weight: '',
  sex: '',
  tutor: '',
  contact: '',
  history: '',
}
