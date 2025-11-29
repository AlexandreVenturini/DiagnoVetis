import 'package:flutter/material.dart';
import 'screens/login_register_screen.dart';
import 'screens/dashboard_screen.dart';
import 'constants/app_theme.dart';
import 'screens/treatment_care_screen.dart';
import 'screens/pharmacy_screen.dart';


void main() {
  runApp(const DiagnoVetisApp());
}

class DiagnoVetisApp extends StatelessWidget {
  const DiagnoVetisApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DiagnoVetis',
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginRegisterScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/farmacia': (context) => const PharmacyScreen(),
  '/cuidados-tratamento': (context) => const TreatmentCareScreen(),
      },
    );
  }
}
