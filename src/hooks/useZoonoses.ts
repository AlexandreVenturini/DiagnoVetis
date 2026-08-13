import { useState, useCallback } from 'react'
import { Zoonose } from '../models/Zoonose'
import { ZoonoseService } from '../services/ZoonoseService'
import type { Zoonosis, ZoonosisFormData } from '../features/zoonoses/zoonosisTypes'

const zoonoseService = new ZoonoseService()

const GRAU_MAP: Record<string, Zoonosis['risk']> = {
    alto: 'Alto',
    medio: 'Médio',
    baixo: 'Baixo',
}

const GRAU_MAP_REVERSE: Record<Zoonosis['risk'], string> = {
    Alto: 'alto',
    Médio: 'medio',
    Baixo: 'baixo',
}

function zoonoseToZoonosis(z: Zoonose): Zoonosis {
    return {
        id: z.id,
        name: z.nome,
        agent: z.agenteEtiologico,
        risk: GRAU_MAP[z.grauRisco.toLowerCase()] ?? 'Baixo',
        prevalence: 'Média',
        hosts: [],
        transmission: '',
        symptoms: z.sintomas.split(',').map(s => s.trim()).filter(Boolean),
        diagnostics: [],
        prevention: z.medidasPreventivas.split(',').map(s => s.trim()).filter(Boolean),
    }
}

function zoonosisToZoonose(id: number, data: ZoonosisFormData): Zoonose {
    return new Zoonose(
        id,
        data.name,
        data.agent,
        data.symptoms.join(', '),
        data.prevention.join(', '),
        GRAU_MAP_REVERSE[data.risk] ?? 'baixo'
    )
}

export function useZoonoses() {
    const [zoonoses, setZoonoses] = useState<Zoonosis[]>(() =>
        zoonoseService.listarZoonoses().map(zoonoseToZoonosis)
    )

    const refresh = useCallback(() => {
        setZoonoses(zoonoseService.listarZoonoses().map(zoonoseToZoonosis))
    }, [])

    const createZoonosis = useCallback((data: ZoonosisFormData) => {
        const zoonose = zoonosisToZoonose(Date.now(), data)
        zoonoseService.adicionarZoonose(zoonose)
        refresh()
    }, [refresh])

    const removeZoonosis = useCallback((id: number) => {
        zoonoseService.removerZoonose(id)
        refresh()
    }, [refresh])

    return { zoonoses, createZoonosis, removeZoonosis }
}
