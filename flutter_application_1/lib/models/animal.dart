enum Species {
  dog,
  cat,
}

enum Sex {
  male,
  female,
}

class Animal {
  // Dados básicos do paciente
  final String name;
  final Species species;
  final Sex sex;
  final String breed;
  final int? ageYears;
  final double? weightKg;

  // Dados do tutor
  final String tutorName;
  final String? tutorContact;

  // Anamnese
  final String mainComplaint;      // Queixa principal
  final String history;            // Histórico da doença atual
  final String clinicalSigns;      // Sinais clínicos observados
  final String environment;        // Ambiente (interno, externo, quintal, etc.)
  final String feeding;            // Alimentação
  final String vaccines;           // Situação vacinal
  final String deworming;          // Situação vermifugação
  final String previousDiseases;   // Doenças anteriores
  final String currentMedications; // Medicamentos em uso

  const Animal({
    required this.name,
    required this.species,
    required this.sex,
    required this.breed,
    this.ageYears,
    this.weightKg,
    required this.tutorName,
    this.tutorContact,
    required this.mainComplaint,
    required this.history,
    required this.clinicalSigns,
    required this.environment,
    required this.feeding,
    required this.vaccines,
    required this.deworming,
    required this.previousDiseases,
    required this.currentMedications,
  });

  Animal copyWith({
    String? name,
    Species? species,
    Sex? sex,
    String? breed,
    int? ageYears,
    double? weightKg,
    String? tutorName,
    String? tutorContact,
    String? mainComplaint,
    String? history,
    String? clinicalSigns,
    String? environment,
    String? feeding,
    String? vaccines,
    String? deworming,
    String? previousDiseases,
    String? currentMedications,
  }) {
    return Animal(
      name: name ?? this.name,
      species: species ?? this.species,
      sex: sex ?? this.sex,
      breed: breed ?? this.breed,
      ageYears: ageYears ?? this.ageYears,
      weightKg: weightKg ?? this.weightKg,
      tutorName: tutorName ?? this.tutorName,
      tutorContact: tutorContact ?? this.tutorContact,
      mainComplaint: mainComplaint ?? this.mainComplaint,
      history: history ?? this.history,
      clinicalSigns: clinicalSigns ?? this.clinicalSigns,
      environment: environment ?? this.environment,
      feeding: feeding ?? this.feeding,
      vaccines: vaccines ?? this.vaccines,
      deworming: deworming ?? this.deworming,
      previousDiseases: previousDiseases ?? this.previousDiseases,
      currentMedications: currentMedications ?? this.currentMedications,
    );
  }
}
