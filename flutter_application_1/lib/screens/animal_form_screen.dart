import 'package:flutter/material.dart';
import '../models/animal.dart';
import '../widgets/animal_form.dart';

class AnimalFormScreen extends StatelessWidget {
  final Animal? animal;
  final void Function(Animal) onSaved;

  const AnimalFormScreen({
    super.key,
    this.animal,
    required this.onSaved,
  });

  @override
  Widget build(BuildContext context) {
    final isEditing = animal != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          isEditing ? 'Editar ficha de anamnese' : 'Nova ficha de anamnese',
        ),
      ),
      body: SingleChildScrollView(
        child: AnimalForm(
          animal: animal,
          onAnimalAdded: (savedAnimal) {
            onSaved(savedAnimal);
            // O próprio formulário já dá o pop, mas garantimos:
            // Navigator.of(context).pop();
          },
        ),
      ),
    );
  }
}
