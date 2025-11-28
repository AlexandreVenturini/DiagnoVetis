enum Sex { male, female }

enum Species { dog, cat, other }

class Animal {
  final String id;
  final String name;
  final Species species;
  final String breed;
  final Sex sex;
  final DateTime dateOfBirth;
  final String ownerId;

  Animal({
    required this.id,
    required this.name,
    required this.species,
    required this.breed,
    required this.sex,
    required this.dateOfBirth,
    required this.ownerId,
  });
}
