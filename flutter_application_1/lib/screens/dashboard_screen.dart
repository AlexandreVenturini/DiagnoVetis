import 'package:flutter/material.dart';
import '../models/animal.dart';
import '../widgets/animal_form.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final List<Animal> _animals = [];

  void _showAddAnimalForm(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: SingleChildScrollView(
            child: AnimalForm(
              onAnimalAdded: (Animal animal) {
                setState(() {
                  _animals.add(animal);
                });
              },
            ),
          ),
        );
      },
    );
  }

  void _showEditAnimalForm(BuildContext context, Animal animal, int index) {
    showDialog(
      context: context,
      builder: (ctx) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: SingleChildScrollView(
            child: AnimalForm(
              animal: animal,
              onAnimalAdded: (Animal updatedAnimal) {
                setState(() {
                  _animals[index] = updatedAnimal;
                });
              },
            ),
          ),
        );
      },
    );
  }

  void _deleteAnimal(int index) {
    final animal = _animals[index];
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Excluir Paciente'),
        content: Text('Tem certeza que deseja excluir "${animal.name}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _animals.removeAt(index);
              });
              Navigator.of(ctx).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Paciente "${animal.name}" excluído com sucesso!'),
                  backgroundColor: Colors.red,
                ),
              );
            },
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Excluir'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard DiagnoVetis'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.of(context).pushReplacementNamed('/');
            },
          ),
        ],
      ),
      body: _animals.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.pets, size: 80, color: Colors.grey),
                  SizedBox(height: 16),
                  Text(
                    'Nenhum paciente cadastrado.',
                    style: TextStyle(fontSize: 18, color: Colors.grey),
                  ),
                  Text(
                    'Comece cadastrando um novo animal.',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _animals.length,
              itemBuilder: (ctx, index) {
                final animal = _animals[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Theme.of(context).primaryColor,
                      child: Icon(
                        animal.species == Species.dog
                            ? Icons.pets
                            : Icons.sentiment_satisfied_alt,
                        color: Colors.white,
                      ),
                    ),
                    title: Text(
                      animal.name,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text(
                      '${animal.breed} • ${animal.sex == Sex.male ? 'Macho' : 'Fêmea'}',
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          animal.species == Species.dog ? 'Cão' : 'Gato',
                          style: TextStyle(
                            color: Theme.of(context).primaryColor,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.edit, color: Colors.blue),
                          onPressed: () => _showEditAnimalForm(context, animal, index),
                          tooltip: 'Editar',
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () => _deleteAnimal(index),
                          tooltip: 'Excluir',
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddAnimalForm(context),
        icon: const Icon(Icons.add_circle),
        label: const Text('Novo Animal'),
      ),
    );
  }
}
