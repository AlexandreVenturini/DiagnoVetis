import 'package:flutter/material.dart';
import '../models/animal.dart';

class AnimalDetailsScreen extends StatelessWidget {
  final Animal animal;

  const AnimalDetailsScreen({
    super.key,
    required this.animal,
  });

  String _speciesText(Species species) {
    switch (species) {
      case Species.dog:
        return 'Cão';
      case Species.cat:
        return 'Gato';
    }
  }

  String _sexText(Sex sex) {
    switch (sex) {
      case Sex.male:
        return 'Macho';
      case Sex.female:
        return 'Fêmea';
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Ficha de ${animal.name}'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // ================= DADOS DO TUTOR =================
            _SectionCard(
              title: 'Dados do tutor',
              children: [
                _InfoRow(label: 'Nome', value: animal.tutorName),
                if (animal.tutorContact != null &&
                    animal.tutorContact!.trim().isNotEmpty)
                  _InfoRow(label: 'Contato', value: animal.tutorContact!),
              ],
            ),

            const SizedBox(height: 16),

            // ================= DADOS DO PACIENTE =================
            _SectionCard(
              title: 'Dados do paciente',
              children: [
                _InfoRow(label: 'Nome', value: animal.name),
                _InfoRow(label: 'Espécie', value: _speciesText(animal.species)),
                _InfoRow(label: 'Sexo', value: _sexText(animal.sex)),
                _InfoRow(label: 'Raça', value: animal.breed),
                if (animal.ageYears != null)
                  _InfoRow(
                    label: 'Idade',
                    value: '${animal.ageYears} ano(s)',
                  ),
                if (animal.weightKg != null)
                  _InfoRow(
                    label: 'Peso',
                    value: '${animal.weightKg!.toStringAsFixed(1)} kg',
                  ),
              ],
            ),

            const SizedBox(height: 16),

            // ================= ANAMNESE =================
            _SectionCard(
              title: 'Anamnese',
              children: [
                _InfoBlock(
                  label: 'Queixa principal',
                  value: animal.mainComplaint,
                ),
                _InfoBlock(
                  label: 'Histórico da doença atual',
                  value: animal.history,
                ),
                _InfoBlock(
                  label: 'Sinais clínicos observados',
                  value: animal.clinicalSigns,
                ),
                _InfoBlock(
                  label: 'Ambiente',
                  value: animal.environment,
                ),
                _InfoBlock(
                  label: 'Alimentação',
                  value: animal.feeding,
                ),
                _InfoBlock(
                  label: 'Vacinação',
                  value: animal.vaccines,
                ),
                _InfoBlock(
                  label: 'Vermifugação',
                  value: animal.deworming,
                ),
                if (animal.previousDiseases.trim().isNotEmpty)
                  _InfoBlock(
                    label: 'Doenças anteriores / cirurgias',
                    value: animal.previousDiseases,
                  ),
                if (animal.currentMedications.trim().isNotEmpty)
                  _InfoBlock(
                    label: 'Medicamentos em uso',
                    value: animal.currentMedications,
                  ),
              ],
            ),

            const SizedBox(height: 16),

            // Aviso
            Text(
              'Esta ficha de anamnese é um registro inicial e deve ser complementada com exame físico, exames complementares e avaliação clínica do médico-veterinário.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.justify,
            ),
          ],
        ),
      ),
    );
  }
}

// ======= WIDGETS AUXILIARES =======

class _SectionCard extends StatelessWidget {
  final String title;
  final List<Widget> children;

  const _SectionCard({
    required this.title,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 12),
            ...children,
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;

  const _InfoRow({
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 130,
            child: Text(
              '$label:',
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: theme.textTheme.bodyMedium,
            ),
          ),
        ],
      ),
    );
  }
}

class _InfoBlock extends StatelessWidget {
  final String label;
  final String value;

  const _InfoBlock({
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$label:',
            style: theme.textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: theme.textTheme.bodyMedium,
            textAlign: TextAlign.justify,
          ),
        ],
      ),
    );
  }
}
