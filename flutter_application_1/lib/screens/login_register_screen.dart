import 'package:flutter/material.dart';
import '../widgets/login_form.dart';
import '../widgets/registrar_form.dart';

enum AuthMode { login, register }

class LoginRegisterScreen extends StatefulWidget {
  const LoginRegisterScreen({super.key});

  @override
  State<LoginRegisterScreen> createState() => _LoginRegisterScreenState();
}

class _LoginRegisterScreenState extends State<LoginRegisterScreen> {
  AuthMode _mode = AuthMode.login;

  void _switchMode(AuthMode newMode) {
    setState(() {
      _mode = newMode;
      debugPrint(
        'Modo alterado para: ${_mode == AuthMode.login ? 'Login' : 'Registro'}',
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final isLogin = _mode == AuthMode.login;
    final theme = Theme.of(context);

    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(32.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              maxWidth: 400,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Text(
                  'DiagnoVetis',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 48,
                    fontWeight: FontWeight.w900,
                    color: theme.primaryColor,
                    letterSpacing: -1.5,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Seu assistente de diagnóstico veterinário',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                ),
                const SizedBox(height: 48),
                Container(
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  padding: const EdgeInsets.all(4.0),
                  child: Row(
                    children: [
                      _buildModeButton(
                        context,
                        'Entrar',
                        AuthMode.login,
                        isLogin,
                      ),
                      _buildModeButton(
                        context,
                        'Cadastrar',
                        AuthMode.register,
                        !isLogin,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: AnimatedSwitcher(
                      duration: const Duration(milliseconds: 300),
                      child: isLogin
                          ? const LoginForm(key: ValueKey('login'))
                          : const RegistrationForm(key: ValueKey('register')),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildModeButton(
    BuildContext context,
    String title,
    AuthMode mode,
    bool isSelected,
  ) {
    final theme = Theme.of(context);
    return Expanded(
      child: InkWell(
        onTap: () => _switchMode(mode),
        customBorder: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          alignment: Alignment.center,
          padding: const EdgeInsets.symmetric(vertical: 12.0),
          decoration: BoxDecoration(
            color: isSelected ? theme.primaryColor : Colors.transparent,
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.white : Colors.grey[700],
            ),
          ),
        ),
      ),
    );
  }
}
