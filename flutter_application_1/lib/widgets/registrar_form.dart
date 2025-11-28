import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/auth_service.dart';

class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  State<RegistrationForm> createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final _formKey = GlobalKey<FormState>();
  final _authService = AuthService();
  String _fullName = '';
  String _email = '';
  String _crmv = '';
  String _password = '';
  bool _isLoading = false;

  void _submit() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    _formKey.currentState!.save();

    setState(() {
      _isLoading = true;
    });

    try {
      await _authService.register(
        fullName: _fullName,
        email: _email,
        crmv: _crmv,
        password: _password,
      );

      if (!mounted) return;

      Navigator.of(context).pushReplacementNamed('/dashboard');

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Bem-vindo, ${_fullName.split(' ').first}!',
          ),
        ),
      );
    } catch (error) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Falha no Registro: ${error.toString().split(':').last}',
          ),
        ),
      );
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Text(
            'Novo Cadastro',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Nome Completo',
              prefixIcon: Icon(Icons.badge),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'O nome completo é obrigatório.';
              }
              return null;
            },
            onSaved: (value) {
              _fullName = value!;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: 'E-mail Profissional',
              prefixIcon: Icon(Icons.email),
            ),
            validator: (value) {
              if (value == null ||
                  !value.contains('@') ||
                  !value.contains('.')) {
                return 'Por favor, insira um e-mail válido.';
              }
              return null;
            },
            onSaved: (value) {
              _email = value!;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            keyboardType: TextInputType.number,
            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
            ],
            decoration: const InputDecoration(
              labelText: 'Número do CRMV',
              prefixIcon: Icon(Icons.medical_services),
            ),
            validator: (value) {
              if (value == null || value.isEmpty || value.length < 4) {
                return 'O CRMV deve ter pelo menos 4 dígitos.';
              }
              return null;
            },
            onSaved: (value) {
              _crmv = value!;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Criar Senha',
              prefixIcon: Icon(Icons.lock),
            ),
            validator: (value) {
              if (value == null || value.length < 6) {
                return 'A senha deve ter pelo menos 6 caracteres.';
              }
              return null;
            },
            onSaved: (value) {
              _password = value!;
            },
          ),
          const SizedBox(height: 32),
          _isLoading
              ? const Center(child: CircularProgressIndicator())
              : ElevatedButton(
                  onPressed: _submit,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).hintColor,
                    foregroundColor: Colors.white,
                  ),
                  child: const Text('Registrar'),
                ),
        ],
      ),
    );
  }
}
