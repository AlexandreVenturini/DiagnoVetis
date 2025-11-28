import 'dart:async';

class AuthUser {
  final String id;
  final String email;

  AuthUser({required this.id, required this.email});
}

class AuthService {
  static const String _mockUserId = 'veterinario-abc-123';

  Future<void> _simulateNetworkDelay() {
    return Future.delayed(const Duration(seconds: 2));
  }

  Future<AuthUser> signIn({
    required String email,
    required String password,
  }) async {
    await _simulateNetworkDelay();

    if (email.contains('@') && password.length >= 6) {
      return AuthUser(id: _mockUserId, email: email);
    } else {
      throw Exception('Credenciais de Login inválidas.');
    }
  }

  Future<AuthUser> register({
    required String fullName,
    required String email,
    required String crmv,
    required String password,
  }) async {
    await _simulateNetworkDelay();

    if (email.contains('@') && password.length >= 6 && crmv.isNotEmpty) {
      return AuthUser(id: _mockUserId, email: email);
    } else {
      throw Exception('Falha ao registrar. Verifique os dados fornecidos.');
    }
  }

  Future<void> signOut() async {
    await _simulateNetworkDelay();
  }
}
