import 'package:flutter/material.dart';
import '../models/animal.dart';

class AnimalFormScreen extends StatefulWidget {
  final Animal? animal;
  final void Function(Animal) onSaved;

  const AnimalFormScreen({
    super.key,
    this.animal,
    required this.onSaved,
  });

  @override
  State<AnimalFormScreen> createState() => _AnimalFormScreenState();
}

class _AnimalFormScreenState extends State<AnimalFormScreen> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _nameController;
  late TextEditingController _breedController;
  late TextEditingController _ageYearsController;
  late TextEditingController _weightKgController;
  late TextEditingController _tutorNameController;
  late TextEditingController _tutorContactController;

  late TextEditingController _mainComplaintController;
  late TextEditingController _historyController;
  late TextEditingController _clinicalSignsController;
  late TextEditingController _environmentController;
  late TextEditingController _feedingController;
  late TextEditingController _vaccinesController;
  late TextEditingController _dewormingController;
  late TextEditingController _previousDiseasesController;
  late TextEditingController _currentMedicationsController;

  Species _species = Species.dog;
  Sex _sex = Sex.male;

  @override
  void initState() {
    super.initState();

    final animal = widget.animal;

    _species = animal?.species ?? Species.dog;
    _sex = animal?.sex ?? Sex.male;

    _nameController = TextEditingController(text: animal?.name ?? '');
    _breedController = TextEditingController(text: animal?.breed ?? '');
    _ageYearsController = TextEditingController(
      text: animal?.ageYears?.toString() ?? '',
    );
    _weightKgController = TextEditingController(
      text: animal?.weightKg?.toString() ?? '',
    );
    _tutorNameController =
        TextEditingController(text: animal?.tutorName ?? '');
    _tutorContactController =
        TextEditingController(text: animal?.tutorContact ?? '');

    _mainComplaintController =
        TextEditingController(text: animal?.mainComplaint ?? '');
    _historyController =
        TextEditingController(text: animal?.history ?? '');
    _clinicalSignsController =
        TextEditingController(text: animal?.clinicalSigns ?? '');
    _environmentController =
        TextEditingController(text: animal?.environment ?? '');
    _feedingController =
        TextEditingController(text: animal?.feeding ?? '');
    _vaccinesController =
        TextEditingController(text: animal?.vaccines ?? '');
    _dewormingController =
        TextEditingController(text: animal?.deworming ?? '');
    _previousDiseasesController =
        TextEditingController(text: animal?.previousDiseases ?? '');
    _currentMedicationsController =
        TextEditingController(text: animal?.currentMedications ?? '');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _breedController.dispose();
    _ageYearsController.dispose();
    _weightKgController.dispose();
    _tutorNameController.dispose();
    _tutorContactController.dispose();
    _mainComplaintController.dispose();
    _historyController.dispose();
    _clinicalSignsController.dispose();
    _environmentController.dispose();
    _feedingController.dispose();
    _vaccinesController.dispose();
    _dewormingController.dispose();
    _previousDiseasesController.dispose();
    _currentMedicationsController.dispose();
    super.dispose();
  }

  void _saveForm() {
    if (!_formKey.currentState!.validate()) return;

    final ageText = _ageYearsController.text.trim();
    final weightText = _weightKgController.text.trim();

    final int? ageYears =
        ageText.isEmpty ? null : int.tryParse(ageText);
    final double? weightKg =
        weightText.isEmpty ? null : double.tryParse(weightText);

    final animal = Animal(
      name: _nameController.text.trim(),
      species: _species,
      sex: _sex,
      breed: _breedController.text.trim(),
      ageYears: ageYears,
      weightKg: weightKg,
      tutorName: _tutorNameController.text.trim(),
      tutorContact: _tutorContactController.text.trim().isEmpty
          ? null
          : _tutorContactController.text.trim(),
      mainComplaint: _mainComplaintController.text.trim(),
      history: _historyController.text.trim(),
      clinicalSigns: _clinicalSignsController.text.trim(),
      environment: _environmentController.text.trim(),
      feeding: _feedingController.text.trim(),
      vaccines: _vaccinesController.text.trim(),
      deworming: _dewormingController.text.trim(),
      previousDiseases: _previousDiseasesController.text.trim(),
      currentMedications: _currentMedicationsController.text.trim(),
    );

    widget.onSaved(animal);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.animal != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          isEditing
              ? 'Editar ficha de anamnese'
              : 'Nova ficha de anamnese',
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              // DADOS DO PACIENTE
              const Text(
                'Dados do paciente',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _nameController,
                decoration:
                    const InputDecoration(labelText: 'Nome do animal'),
                validator: (value) =>
                    (value == null || value.isEmpty)
                        ? 'Informe o nome do animal'
                        : null,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _breedController,
                decoration: const InputDecoration(labelText: 'Raça'),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _ageYearsController,
                decoration: const InputDecoration(
                    labelText: 'Idade (anos, opcional)'),
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _weightKgController,
                decoration: const InputDecoration(
                    labelText: 'Peso (kg, opcional)'),
                keyboardType:
                    const TextInputType.numberWithOptions(decimal: true),
              ),
              const SizedBox(height: 12),

              const Text('Espécie'),
              Row(
                children: [
                  Expanded(
                    child: RadioListTile<Species>(
                      title: const Text('Cão'),
                      value: Species.dog,
                      groupValue: _species,
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _species = value);
                        }
                      },
                    ),
                  ),
                  Expanded(
                    child: RadioListTile<Species>(
                      title: const Text('Gato'),
                      value: Species.cat,
                      groupValue: _species,
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _species = value);
                        }
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              const Text('Sexo'),
              Row(
                children: [
                  Expanded(
                    child: RadioListTile<Sex>(
                      title: const Text('Macho'),
                      value: Sex.male,
                      groupValue: _sex,
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _sex = value);
                        }
                      },
                    ),
                  ),
                  Expanded(
                    child: RadioListTile<Sex>(
                      title: const Text('Fêmea'),
                      value: Sex.female,
                      groupValue: _sex,
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _sex = value);
                        }
                      },
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // DADOS DO TUTOR
              const Text(
                'Dados do tutor',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _tutorNameController,
                decoration:
                    const InputDecoration(labelText: 'Nome do tutor'),
                validator: (value) =>
                    (value == null || value.isEmpty)
                        ? 'Informe o nome do tutor'
                        : null,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _tutorContactController,
                decoration: const InputDecoration(
                    labelText: 'Contato do tutor (telefone, opcional)'),
              ),

              const SizedBox(height: 16),

              // ANAMNESE
              const Text(
                'Anamnese',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _mainComplaintController,
                decoration: const InputDecoration(
                    labelText: 'Queixa principal'),
                maxLines: 2,
                validator: (value) =>
                    (value == null || value.isEmpty)
                        ? 'Informe a queixa principal'
                        : null,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _historyController,
                decoration: const InputDecoration(
                    labelText: 'Histórico da doença atual'),
                maxLines: 3,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _clinicalSignsController,
                decoration: const InputDecoration(
                    labelText: 'Sinais clínicos observados'),
                maxLines: 3,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _environmentController,
                decoration: const InputDecoration(
                    labelText: 'Ambiente (interno, externo, quintal, etc.)'),
                maxLines: 2,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _feedingController,
                decoration: const InputDecoration(
                    labelText: 'Alimentação'),
                maxLines: 2,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _vaccinesController,
                decoration: const InputDecoration(
                    labelText: 'Vacinas'),
                maxLines: 2,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _dewormingController,
                decoration: const InputDecoration(
                    labelText: 'Vermifugação'),
                maxLines: 2,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _previousDiseasesController,
                decoration: const InputDecoration(
                    labelText: 'Doenças anteriores'),
                maxLines: 2,
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _currentMedicationsController,
                decoration: const InputDecoration(
                    labelText: 'Medicamentos em uso'),
                maxLines: 2,
              ),

              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _saveForm,
                child: Text(
                  isEditing ? 'Salvar alterações' : 'Salvar ficha',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
