import 'package:flutter/material.dart';
import '../models/animal.dart';

class AnimalForm extends StatefulWidget {
  final Animal? animal;
  final void Function(Animal animal) onAnimalAdded;

  const AnimalForm({
    super.key,
    this.animal,
    required this.onAnimalAdded,
  });

  @override
  State<AnimalForm> createState() => _AnimalFormState();
}

class _AnimalFormState extends State<AnimalForm> {
  final _formKey = GlobalKey<FormState>();

  // Dados do tutor
  final _tutorNameController = TextEditingController();
  final _tutorContactController = TextEditingController();

  // Dados do paciente
  final _nameController = TextEditingController();
  final _breedController = TextEditingController();
  final _ageController = TextEditingController(); // anos
  final _weightController = TextEditingController(); // kg
  Species? _selectedSpecies;
  Sex? _selectedSex;

  // Anamnese
  final _mainComplaintController = TextEditingController();      // Queixa
  final _historyController = TextEditingController();            // Histórico
  final _clinicalSignsController = TextEditingController();      // Sinais clínicos
  final _environmentController = TextEditingController();        // Ambiente
  final _feedingController = TextEditingController();            // Alimentação
  final _vaccinesController = TextEditingController();           // Vacinas
  final _dewormingController = TextEditingController();          // Vermifugação
  final _previousDiseasesController = TextEditingController();   // Doenças anteriores
  final _currentMedicationsController = TextEditingController(); // Medicamentos em uso

  @override
  void initState() {
    super.initState();

    final animal = widget.animal;
    if (animal != null) {
      _tutorNameController.text = animal.tutorName;
      _tutorContactController.text = animal.tutorContact ?? '';

      _nameController.text = animal.name;
      _breedController.text = animal.breed;
      _ageController.text = animal.ageYears?.toString() ?? '';
      _weightController.text =
          animal.weightKg != null ? animal.weightKg!.toStringAsFixed(1) : '';
      _selectedSpecies = animal.species;
      _selectedSex = animal.sex;

      _mainComplaintController.text = animal.mainComplaint;
      _historyController.text = animal.history;
      _clinicalSignsController.text = animal.clinicalSigns;
      _environmentController.text = animal.environment;
      _feedingController.text = animal.feeding;
      _vaccinesController.text = animal.vaccines;
      _dewormingController.text = animal.deworming;
      _previousDiseasesController.text = animal.previousDiseases;
      _currentMedicationsController.text = animal.currentMedications;
    } else {
      _selectedSpecies = Species.dog;
      _selectedSex = Sex.male;
    }
  }

  @override
  void dispose() {
    _tutorNameController.dispose();
    _tutorContactController.dispose();
    _nameController.dispose();
    _breedController.dispose();
    _ageController.dispose();
    _weightController.dispose();
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

  void _submit() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final int? age =
        _ageController.text.trim().isEmpty ? null : int.tryParse(_ageController.text.trim());
    final double? weight = _weightController.text.trim().isEmpty
        ? null
        : double.tryParse(_weightController.text.trim());

    final animal = Animal(
      name: _nameController.text.trim(),
      species: _selectedSpecies ?? Species.dog,
      sex: _selectedSex ?? Sex.male,
      breed: _breedController.text.trim(),
      ageYears: age,
      weightKg: weight,
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

    widget.onAnimalAdded(animal);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.animal != null;
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              isEditing ? 'Editar ficha de anamnese' : 'Nova ficha de anamnese',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            // ================= DADOS DO TUTOR =================
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Dados do tutor',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _tutorNameController,
              decoration: const InputDecoration(
                labelText: 'Nome do tutor *',
                prefixIcon: Icon(Icons.person),
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Informe o nome do tutor';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),
            TextFormField(
              controller: _tutorContactController,
              decoration: const InputDecoration(
                labelText: 'Contato (telefone, e-mail, etc.)',
                prefixIcon: Icon(Icons.phone),
              ),
            ),

            const SizedBox(height: 16),

            // ================= DADOS DO PACIENTE =================
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Dados do paciente',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Nome do animal *',
                prefixIcon: Icon(Icons.pets),
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Informe o nome do animal';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<Species>(
                    value: _selectedSpecies,
                    decoration: const InputDecoration(
                      labelText: 'Espécie *',
                    ),
                    items: const [
                      DropdownMenuItem(
                        value: Species.dog,
                        child: Text('Cão'),
                      ),
                      DropdownMenuItem(
                        value: Species.cat,
                        child: Text('Gato'),
                      ),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _selectedSpecies = value;
                      });
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<Sex>(
                    value: _selectedSex,
                    decoration: const InputDecoration(
                      labelText: 'Sexo *',
                    ),
                    items: const [
                      DropdownMenuItem(
                        value: Sex.male,
                        child: Text('Macho'),
                      ),
                      DropdownMenuItem(
                        value: Sex.female,
                        child: Text('Fêmea'),
                      ),
                    ],
                    onChanged: (value) {
                      setState(() {
                        _selectedSex = value;
                      });
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _breedController,
              decoration: const InputDecoration(
                labelText: 'Raça *',
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Informe a raça do animal';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _ageController,
                    decoration: const InputDecoration(
                      labelText: 'Idade (anos)',
                    ),
                    keyboardType: TextInputType.number,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: TextFormField(
                    controller: _weightController,
                    decoration: const InputDecoration(
                      labelText: 'Peso (kg)',
                    ),
                    keyboardType:
                        const TextInputType.numberWithOptions(decimal: true),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // ================= ANAMNESE =================
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Anamnese',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _mainComplaintController,
              decoration: const InputDecoration(
                labelText: 'Queixa principal *',
              ),
              maxLines: 2,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Descreva a queixa principal';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _historyController,
              decoration: const InputDecoration(
                labelText: 'Histórico da doença atual *',
              ),
              maxLines: 3,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Descreva o histórico da doença';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _clinicalSignsController,
              decoration: const InputDecoration(
                labelText: 'Sinais clínicos observados *',
              ),
              maxLines: 3,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Liste os principais sinais clínicos';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _environmentController,
              decoration: const InputDecoration(
                labelText: 'Ambiente (interno, externo, quintal, outros) *',
              ),
              maxLines: 2,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Descreva o ambiente em que o animal vive';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _feedingController,
              decoration: const InputDecoration(
                labelText: 'Alimentação (ração, comida caseira, mista, etc.) *',
              ),
              maxLines: 2,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Descreva a alimentação do animal';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _vaccinesController,
              decoration: const InputDecoration(
                labelText: 'Vacinação (em dia? quais vacinas?) *',
              ),
              maxLines: 2,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Informe a situação vacinal';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _dewormingController,
              decoration: const InputDecoration(
                labelText: 'Vermifugação (frequência, último uso) *',
              ),
              maxLines: 2,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Informe a situação de vermifugação';
                }
                return null;
              },
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _previousDiseasesController,
              decoration: const InputDecoration(
                labelText: 'Doenças anteriores / cirurgias',
              ),
              maxLines: 2,
            ),
            const SizedBox(height: 8),

            TextFormField(
              controller: _currentMedicationsController,
              decoration: const InputDecoration(
                labelText: 'Medicamentos em uso',
              ),
              maxLines: 2,
            ),

            const SizedBox(height: 20),

            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('Cancelar'),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _submit,
                  child: Text(isEditing ? 'Salvar alterações' : 'Salvar ficha'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
