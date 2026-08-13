import { ValidacaoError } from "./ValidacaoError";

// ── Campos obrigatórios ───────────────────────────────────────────────────────

export function validarObrigatorio(valor: string, campo: string): void {
    if (!valor || valor.trim().length === 0) {
        throw new ValidacaoError(campo, `O campo "${campo}" é obrigatório.`);
    }
}

export function validarIdObrigatorio(valor: number, campo: string): void {
    if (!valor || valor <= 0) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ser um número positivo.`);
    }
}

// ── Texto com tamanho mínimo ──────────────────────────────────────────────────

export function validarTamanhoMinimo(valor: string, campo: string, minimo: number): void {
    if (valor.trim().length < minimo) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ter no mínimo ${minimo} caracteres.`);
    }
}

// ── Email ─────────────────────────────────────────────────────────────────────

export function validarEmail(email: string, campo = "email"): void {
    validarObrigatorio(email, campo);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.trim())) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve conter um e-mail válido.`);
    }
}

export function validarEmailIfes(email: string, campo = "email"): void {
    validarEmail(email, campo);
    if (!email.trim().toLowerCase().endsWith("@ifes.edu.br")) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ser um e-mail institucional (@ifes.edu.br).`);
    }
}

// ── Telefone ──────────────────────────────────────────────────────────────────

export function validarTelefone(telefone: string, campo = "telefone"): void {
    validarObrigatorio(telefone, campo);
    const apenasDigitos = telefone.replace(/\D/g, "");
    if (apenasDigitos.length < 10 || apenasDigitos.length > 11) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve conter um telefone válido (10 ou 11 dígitos).`);
    }
}

// ── CEP ───────────────────────────────────────────────────────────────────────

export function validarCep(cep: string, campo = "cep"): void {
    validarObrigatorio(cep, campo);
    const apenasDigitos = cep.replace(/\D/g, "");
    if (apenasDigitos.length !== 8) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve conter 8 dígitos.`);
    }
}

// ── CRMV ──────────────────────────────────────────────────────────────────────

export function validarCrmv(crmv: string, campo = "crmv"): void {
    validarObrigatorio(crmv, campo);
    // Aceita formatos: "12345-SP" ou "SP-12345"
    const regex = /^(\d{4,6}-[A-Z]{2}|[A-Z]{2}-\d{4,6})$/;
    if (!regex.test(crmv.trim().toUpperCase())) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve estar no formato "12345-SP" ou "SP-12345".`);
    }
}

// ── Período letivo (Aluno) ────────────────────────────────────────────────────

export function validarPeriodo(periodo: number, campo = "periodo"): void {
    if (!Number.isInteger(periodo) || periodo < 1 || periodo > 10) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ser um número inteiro entre 1 e 10.`);
    }
}

// ── Data ─────────────────────────────────────────────────────────────────────

export function validarData(data: Date, campo = "data"): void {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve conter uma data válida.`);
    }
}

export function validarDataFutura(data: Date, campo = "data"): void {
    validarData(data, campo);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data < hoje) {
        throw new ValidacaoError(campo, `O campo "${campo}" não pode ser uma data no passado.`);
    }
}

// ── Número positivo ───────────────────────────────────────────────────────────

export function validarPositivo(valor: number, campo: string): void {
    if (valor <= 0) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ser maior que zero.`);
    }
}

// ── Grau de risco (Zoonose) ───────────────────────────────────────────────────

const GRAUS_RISCO_VALIDOS = ["baixo", "medio", "alto"] as const;
type GrauRisco = typeof GRAUS_RISCO_VALIDOS[number];

export function validarGrauRisco(grau: string, campo = "grauRisco"): void {
    validarObrigatorio(grau, campo);
    if (!GRAUS_RISCO_VALIDOS.includes(grau.toLowerCase() as GrauRisco)) {
        throw new ValidacaoError(campo, `O campo "${campo}" deve ser "baixo", "medio" ou "alto".`);
    }
}

// ── Unicidade de ID ───────────────────────────────────────────────────────────

export function validarIdUnico<T extends { id: number }>(
    id: number,
    existentes: T[],
    entidade: string
): void {
    if (existentes.some(item => item.id === id)) {
        throw new ValidacaoError("id", `Já existe um(a) ${entidade} com o ID ${id}.`);
    }
}
