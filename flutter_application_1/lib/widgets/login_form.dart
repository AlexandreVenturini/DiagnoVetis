import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _authService = AuthService();
  String _email = '';
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
      final user = await _authService.signIn(
        email: _email,
        password: _password,
      );

      if (!mounted) return;

      Navigator.of(context).pushReplacementNamed('/dashboard');

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Bem-vindo, ${user.email}!')),
      );
    } catch (error) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Falha no Login: ${error.toString().split(':').last}'),
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
            'Acesso de Veterinários',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: 'E-mail',
              prefixIcon: Icon(Icons.person),
            ),
            validator: (value) {
              if (value == null ||
                  value.isEmpty ||
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
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Senha',
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
              : ElevatedButton(onPressed: _submit, child: const Text('Entrar')),
          const SizedBox(height: 16),
          TextButton(
            onPressed: () {},
            child: Text(
              'Esqueceu sua senha?',
              style: TextStyle(color: Theme.of(context).hintColor),
            ),
          ),
        ],
      ),
    );
  }
}
