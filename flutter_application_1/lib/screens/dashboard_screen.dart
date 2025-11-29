import 'package:flutter/material.dart';
import '../models/animal.dart';
import '../widgets/animal_form.dart';
import 'animal_details_screen.dart';
import 'animal_form_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final List<Animal> _animals = [];

  // ---------- NOVA FICHA (AGORA EM TELA CHEIA) ----------
  void _showAddAnimalForm(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => AnimalFormScreen(
          onSaved: (animal) {
            setState(() {
              _animals.add(animal);
            });
          },
        ),
      ),
    );
  }

  // ---------- EDITAR FICHA ----------
  void _showEditAnimalForm(BuildContext context, Animal animal, int index) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => AnimalFormScreen(
          animal: animal,
          onSaved: (updatedAnimal) {
            setState(() {
              _animals[index] = updatedAnimal;
            });
          },
        ),
      ),
    );
  }

  // ---------- EXCLUIR PACIENTE ----------
  void _deleteAnimal(int index) {
    final animal = _animals[index];
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("Excluir Paciente"),
        content: Text('Tem certeza que deseja excluir "${animal.name}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text("Cancelar"),
          ),
          TextButton(
            onPressed: () {
              setState(() => _animals.removeAt(index));
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Paciente "${animal.name}" excluído!'),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: const Text(
              "Excluir",
              style: TextStyle(color: Colors.red),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Dashboard DiagnoVetis"),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: "Sair",
            onPressed: () {
              Navigator.of(context).pushReplacementNamed('/');
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // ========= SEÇÃO ACESSO RÁPIDO =========
          Text(
            "Acesso rápido",
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),

          _DashboardQuickActionCard(
            icon: Icons.health_and_safety,
            title: "Cuidados e Tratamento",
            subtitle: "Sugestões e orientações clínicas",
            color: theme.primaryColor,
            onTap: () => Navigator.pushNamed(context, '/cuidados-tratamento'),
          ),
          const SizedBox(height: 12),

          _DashboardQuickActionCard(
            icon: Icons.local_pharmacy,
            title: "Farmácia Veterinária",
            subtitle: "Medicamentos e indicações gerais",
            color: theme.colorScheme.secondary,
            onTap: () => Navigator.pushNamed(context, '/farmacia'),
          ),

          const SizedBox(height: 24),
          const Divider(),
          const SizedBox(height: 16),

          // ========= SEÇÃO PACIENTES =========
          Text(
            "Pacientes cadastrados",
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),

          if (_animals.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 40),
              child: Column(
                children: [
                  Icon(Icons.pets, size: 80, color: Colors.grey),
                  SizedBox(height: 16),
                  Text(
                    "Nenhum paciente cadastrado.",
                    style: TextStyle(color: Colors.grey),
                  ),
                  Text("Cadastre um novo animal para começar."),
                ],
              ),
            )
          else
            ..._animals.asMap().entries.map((entry) {
              final index = entry.key;
              final animal = entry.value;

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: ListTile(
                  // Ao tocar: abre ficha completa
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => AnimalDetailsScreen(animal: animal),
                      ),
                    );
                  },
                  leading: CircleAvatar(
                    backgroundColor: theme.primaryColor,
                    child: Icon(
                      animal.species == Species.dog ? Icons.pets : Icons.pets,
                      color: Colors.white,
                    ),
                  ),
                  title: Text(
                    animal.name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    '${animal.breed} • ${animal.sex == Sex.male ? "Macho" : "Fêmea"}',
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        animal.species == Species.dog ? "Cão" : "Gato",
                        style: TextStyle(
                          color: theme.primaryColor,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showEditAnimalForm(
                          context,
                          animal,
                          index,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteAnimal(index),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddAnimalForm(context),
        icon: const Icon(Icons.add_circle),
        label: const Text("Novo Animal"),
      ),
    );
  }
}

// ========= CARD DE ACESSO RÁPIDO =========
class _DashboardQuickActionCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  const _DashboardQuickActionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Material(
      elevation: 2,
      color: theme.cardColor,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(icon, color: color, size: 28),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: Colors.grey[700],
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}
