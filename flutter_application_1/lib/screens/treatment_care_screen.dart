import 'package:flutter/material.dart';

class TreatmentCareScreen extends StatelessWidget {
  final String? diagnosisName;
  final String? animalName;

  const TreatmentCareScreen({
    super.key,
    this.diagnosisName,
    this.animalName,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    final diagnosisText = diagnosisName ?? 'Diagnóstico não informado';
    final animalText = animalName != null ? 'Paciente: $animalName' : null;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cuidados e Tratamento'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Cabeçalho com diagnóstico
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      diagnosisText,
                      style: theme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (animalText != null) ...[
                      const SizedBox(height: 4),
                      Text(
                        animalText,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: Colors.grey[700],
                        ),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Text(
                      'Recomendações gerais de manejo e cuidados para este caso.',
                      style: theme.textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Seção: Cuidados Gerais
            _SectionTitle(title: 'Cuidados gerais'),
            Card(
              elevation: 1,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: const [
                    _BulletItem(
                      text:
                          'Mantenha o animal em ambiente limpo, seco e confortável.',
                    ),
                    _BulletItem(
                      text:
                          'Ofereça água fresca à vontade e monitore a ingestão hídrica.',
                    ),
                    _BulletItem(
                      text:
                          'Observe o apetite diariamente e registre alterações importantes.',
                    ),
                    _BulletItem(
                      text:
                          'Evite esforço físico intenso até liberação do médico-veterinário.',
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Seção: Recomendações específicas
            _SectionTitle(title: 'Recomendações específicas'),
            Card(
              elevation: 1,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: const [
                    _BulletItem(
                      text:
                          'Siga rigorosamente os horários e duração do tratamento indicado pelo médico-veterinário.',
                    ),
                    _BulletItem(
                      text:
                          'Não interrompa o tratamento por conta própria, mesmo com melhora dos sinais clínicos.',
                    ),
                    _BulletItem(
                      text:
                          'Não administre medicamentos humanos sem orientação profissional.',
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Seção: Sinais de alerta
            _SectionTitle(title: 'Sinais de alerta'),
            Card(
              elevation: 1,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: const [
                    _BulletItem(
                      text:
                          'Febre persistente, apatia intensa ou prostração.',
                    ),
                    _BulletItem(
                      text:
                          'Vômitos ou diarreia intensos e contínuos.',
                    ),
                    _BulletItem(
                      text:
                          'Dificuldade respiratória, cianose ou tosse intensa.',
                    ),
                    _BulletItem(
                      text:
                          'Convulsões, sangramentos ou qualquer mudança brusca de comportamento.',
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Aviso legal
            Text(
              'Importante: as orientações apresentadas têm caráter geral e NÃO substituem a consulta com médico-veterinário. Sempre siga as recomendações do profissional responsável pelo caso.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.justify,
            ),

            const SizedBox(height: 16),

            // Botão de ação (ex: futuro PDF ou salvar)
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  // TODO: implementar geração de relatório ou salvar no prontuário
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Funcionalidade em desenvolvimento.'),
                    ),
                  );
                },
                icon: const Icon(Icons.picture_as_pdf),
                label: const Text('Gerar relatório de cuidados'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;

  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(
        title,
        style: theme.textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _BulletItem extends StatelessWidget {
  final String text;

  const _BulletItem({required this.text});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            Icons.circle,
            size: 8,
            color: theme.primaryColor,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: theme.textTheme.bodyMedium,
            ),
          ),
        ],
      ),
    );
  }
}
