import 'package:flutter/material.dart';
import '../models/animal.dart';

class AnimalForm extends StatefulWidget {
  final Function(Animal) onAnimalAdded;
  final Animal? animal;

  const AnimalForm({
    super.key,
    required this.onAnimalAdded,
    this.animal,
  });

  @override
  State<AnimalForm> createState() => _AnimalFormState();
}

class _AnimalFormState extends State<AnimalForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _breedController = TextEditingController();

  String _name = '';
  Species? _species = Species.dog;
  String _breed = '';
  Sex? _sex = Sex.male;
  DateTime _dateOfBirth = DateTime.now();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    if (widget.animal != null) {
      _nameController.text = widget.animal!.name;
      _breedController.text = widget.animal!.breed;
      _name = widget.animal!.name;
      _species = widget.animal!.species;
      _breed = widget.animal!.breed;
      _sex = widget.animal!.sex;
      _dateOfBirth = widget.animal!.dateOfBirth;
    }
  }

  void _presentDatePicker() async {
    final pickedDate = await showDatePicker(
      context: context,
      initialDate: _dateOfBirth,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );

    if (!mounted) return;

    if (pickedDate != null) {
      setState(() {
        _dateOfBirth = pickedDate;
      });
    }
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    _formKey.currentState!.save();

    setState(() {
      _isLoading = true;
    });

    final newAnimal = Animal(
      id: widget.animal?.id ?? DateTime.now().toString(),
      name: _name,
      species: _species!,
      breed: _breed,
      sex: _sex!,
      dateOfBirth: _dateOfBirth,
      ownerId: widget.animal?.ownerId ?? 'mock-owner-id',
    );

    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted) return;

      widget.onAnimalAdded(newAnimal);

      Navigator.of(context).pop();

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            widget.animal != null
                ? 'Paciente "${newAnimal.name}" atualizado com sucesso!'
                : 'Paciente "${newAnimal.name}" cadastrado com sucesso!',
          ),
          backgroundColor: Colors.green,
        ),
      );
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _breedController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Text(
              widget.animal != null
                  ? 'Editar Paciente'
                  : 'Cadastrar Novo Paciente',
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Nome do Animal',
                prefixIcon: Icon(Icons.pets_rounded),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'O nome é obrigatório.';
                }
                return null;
              },
              onSaved: (value) {
                _name = value!;
              },
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<Species>(
              decoration: const InputDecoration(
                labelText: 'Espécie',
                prefixIcon: Icon(Icons.category),
              ),
              value: _species,
              items: Species.values.map((Species species) {
                return DropdownMenuItem<Species>(
                  value: species,
                  child: Text(
                    species.name[0].toUpperCase() + species.name.substring(1),
                  ),
                );
              }).toList(),
              onChanged: (Species? newValue) {
                setState(() {
                  _species = newValue;
                });
              },
              validator: (value) =>
                  value == null ? 'Selecione a espécie.' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _breedController,
              decoration: const InputDecoration(
                labelText: 'Raça',
                prefixIcon: Icon(Icons.track_changes),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'A raça é obrigatória.';
                }
                return null;
              },
              onSaved: (value) {
                _breed = value!;
              },
            ),
            const SizedBox(height: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Padding(
                  padding: EdgeInsets.only(left: 8.0),
                  child: Text(
                    'Sexo:',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      child: ListTile(
                        dense: true,
                        title: const Text('Macho'),
                        leading: Radio<Sex>(
                          value: Sex.male,
                          groupValue: _sex,
                          onChanged: (Sex? value) {
                            if (value != null) {
                              setState(() {
                                _sex = value;
                              });
                            }
                          },
                        ),
                      ),
                    ),
                    Expanded(
                      child: ListTile(
                        dense: true,
                        title: const Text('Fêmea'),
                        leading: Radio<Sex>(
                          value: Sex.female,
                          groupValue: _sex,
                          onChanged: (Sex? value) {
                            if (value != null) {
                              setState(() {
                                _sex = value;
                              });
                            }
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: <Widget>[
                Expanded(
                  child: Text(
                    'Data de Nascimento: ${MaterialLocalizations.of(context).formatShortDate(_dateOfBirth)}',
                    style: const TextStyle(fontSize: 16),
                  ),
                ),
                TextButton.icon(
                  icon: const Icon(Icons.calendar_today),
                  label: const Text('Selecionar Data'),
                  onPressed: _presentDatePicker,
                ),
              ],
            ),
            const SizedBox(height: 30),
            _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(
                    onPressed: _submit,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).primaryColor,
                      foregroundColor: Colors.white,
                    ),
                    child: Text(widget.animal != null
                        ? 'Atualizar Paciente'
                        : 'Cadastrar Paciente'),
                  ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
