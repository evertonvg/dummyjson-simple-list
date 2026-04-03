import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Configura o worker do MSW
export const worker = setupWorker(...handlers)