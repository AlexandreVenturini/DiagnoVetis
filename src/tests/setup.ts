import { beforeEach } from 'vitest'

const store: Record<string, string> = {}

const localStorageMock = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { Object.keys(store).forEach(k => delete store[k]) },
    get length() { return Object.keys(store).length },
    key: (index: number) => Object.keys(store)[index] ?? null,
}

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

beforeEach(async () => {
    localStorageMock.clear()
    const { medicoRepository } = await import('../services/MedicoService')
    const { tutorRepository } = await import('../services/TutorService')
    const { petRepository } = await import('../services/PetService')
    const { alunoRepository } = await import('../services/AlunoService')
    const { zoonoseRepository } = await import('../services/ZoonoseService')
    const { medicamentoRepository } = await import('../services/MedicamentoService')
    const { consultaRepository } = await import('../services/ConsultaService')
    const { funcionarioRepository } = await import('../services/FuncionarioService')
    medicoRepository.clear()
    tutorRepository.clear()
    petRepository.clear()
    alunoRepository.clear()
    zoonoseRepository.clear()
    medicamentoRepository.clear()
    consultaRepository.clear()
    funcionarioRepository.clear()
})
