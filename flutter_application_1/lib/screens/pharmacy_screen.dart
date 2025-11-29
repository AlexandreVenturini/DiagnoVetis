import 'package:flutter/material.dart';

class PharmacyScreen extends StatefulWidget {
  const PharmacyScreen({super.key});

  @override
  State<PharmacyScreen> createState() => _PharmacyScreenState();
}

class _PharmacyScreenState extends State<PharmacyScreen> {
  final TextEditingController _searchController = TextEditingController();

  final List<_Medicine> _allMedicines = const [
    _Medicine(
      name: 'Meloxicam',
      category: 'Anti-inflamatório',
      description:
          'Utilizado em processos inflamatórios e dolorosos em cães e gatos, sempre sob prescrição.',
      warning:
          'Pode causar efeitos adversos gastrointestinais. Não usar sem orientação veterinária.',
    ),
    _Medicine(
      name: 'Carprofeno',
      category: 'Anti-inflamatório',
      description:
          'Indicado para dor e inflamação musculoesquelética, principalmente em cães.',
      warning:
          'Uso controlado. Exige avaliação prévia da função renal e hepática.',
    ),
    _Medicine(
      name: 'Amoxicilina + clavulanato',
      category: 'Antibiótico',
      description:
          'Antibiótico de amplo espectro usado em diversas infecções bacterianas.',
      warning:
          'O uso inadequado pode levar à resistência bacteriana. Nunca utilizar sem orientação.',
    ),
    _Medicine(
      name: 'Doxiciclina',
      category: 'Antibiótico',
      description:
          'Frequentemente utilizada em doenças transmitidas por carrapatos e infecções respiratórias.',
      warning:
          'Deve ser administrada conforme prescrição, respeitando dose e duração.',
    ),
    _Medicine(
      name: 'Albendazol',
      category: 'Vermífugo',
      description:
          'Vermífugo utilizado no controle de parasitas gastrointestinais.',
      warning:
          'Seguir o protocolo de vermifugação estabelecido pelo médico-veterinário.',
    ),
    _Medicine(
      name: 'Praziquantel',
      category: 'Vermífugo',
      description:
          'Eficaz contra cestódeos (vermes chatos) em cães e gatos.',
      warning:
          'Pode ser associado a outros princípios ativos conforme avaliação profissional.',
    ),
    _Medicine(
      name: 'Bravecto',
      category: 'Antiparasitário externo',
      description:
          'Controle prolongado de pulgas e carrapatos em cães e gatos (apresentações específicas).',
      warning:
          'Respeitar espécie, peso e intervalo entre administrações.',
    ),
    _Medicine(
      name: 'Frontline',
      category: 'Antiparasitário externo',
      description:
          'Uso tópico para controle de pulgas, piolhos e carrapatos.',
      warning:
          'Aplicar diretamente na pele, seguindo instruções da embalagem.',
    ),
    _Medicine(
      name: 'Cerenia',
      category: 'Antiemético',
      description:
          'Utilizado para controle de vômitos em cães e gatos.',
      warning:
          'Não administrar sem avaliação da causa do vômito pelo veterinário.',
    ),
    _Medicine(
      name: 'Dipirona veterinária',
      category: 'Analgésico / Antitérmico',
      description:
          'Utilizada para dor e febre em animais, em formulações específicas.',
      warning:
          'Nunca utilizar dipirona humana sem orientação. Dose e intervalo são críticos.',
    ),
  ];

  String _searchTerm = '';

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.removeListener(_onSearchChanged);
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    setState(() {
      _searchTerm = _searchController.text.toLowerCase();
    });
  }

  List<_Medicine> get _filteredMedicines {
    if (_searchTerm.isEmpty) {
      return _allMedicines;
    }
    return _allMedicines.where((med) {
      return med.name.toLowerCase().contains(_searchTerm) ||
          med.category.toLowerCase().contains(_searchTerm);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Farmácia Veterinária'),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Campo de busca
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Buscar medicamento ou categoria...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                ),
              ),
            ),
          ),

          // Lista de medicamentos
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              itemCount: _filteredMedicines.length,
              itemBuilder: (ctx, index) {
                final med = _filteredMedicines[index];
                return Card(
                  elevation: 2,
                  margin: const EdgeInsets.only(bottom: 12.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(16),
                    onTap: () {
                      _showMedicineDetails(context, med);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            Icons.medical_services,
                            color: theme.primaryColor,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  med.name,
                                  style: theme.textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  med.category,
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: theme.hintColor,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  med.description,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: theme.textTheme.bodyMedium,
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
              },
            ),
          ),

          // Aviso legal
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'A utilização de qualquer medicamento deve ser sempre orientada por médico-veterinário. Esta lista tem caráter informativo e não configura prescrição.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.justify,
            ),
          ),
        ],
      ),
    );
  }

  void _showMedicineDetails(BuildContext context, _Medicine med) {
    final theme = Theme.of(context);

    showDialog(
      context: context,
      builder: (ctx) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  med.name,
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  med.category,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.hintColor,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  med.description,
                  style: theme.textTheme.bodyMedium,
                  textAlign: TextAlign.justify,
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Icon(
                      Icons.warning_amber_rounded,
                      color: Colors.red[700],
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        med.warning,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: Colors.red[700],
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () => Navigator.of(ctx).pop(),
                    child: const Text('Fechar'),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _Medicine {
  final String name;
  final String category;
  final String description;
  final String warning;

  const _Medicine({
    required this.name,
    required this.category,
    required this.description,
    required this.warning,
  });
}
