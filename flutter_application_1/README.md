# DiagnoVetis

Sistema de diagnóstico veterinário com interface para cadastro e gestão de pacientes animais.

## 📋 Características

- ✅ Tela de Login e Registro para veterinários
- ✅ Dashboard com listagem de pacientes
- ✅ Formulário de cadastro de animais
- ✅ Validação de formulários
- ✅ Navegação entre telas
- ✅ Autenticação simulada (mock)
- ✅ Design responsivo e Material Design 3
- 🔜 Diagnóstico com IA
- 🔜 Histórico de consultas

## 🚀 Como Executar

### Pré-requisitos

- Flutter SDK (>=3.0.0)
- Android Studio ou VS Code com extensões Flutter
- Emulador Android/iOS ou dispositivo físico

### Passos para Instalação

1. **Clone ou extraia o projeto**
\`\`\`bash
cd diagnovetis
\`\`\`

2. **Instale as dependências**
\`\`\`bash
flutter pub get
\`\`\`

3. **Execute a aplicação**
\`\`\`bash
flutter run
\`\`\`

## 📱 Estrutura do Projeto

\`\`\`
lib/
├── main.dart                          # Ponto de entrada da aplicação
├── constants/
│   ├── app_theme.dart                 # Tema e estilos globais
│   └── route_names.dart               # Constantes de rotas
├── models/
│   └── animal.dart                    # Modelo de dados Animal
├── services/
│   └── auth_service.dart              # Serviço de autenticação mock
├── screens/
│   ├── login_register_screen.dart     # Tela de login/registro
│   └── dashboard_screen.dart          # Tela principal (dashboard)
└── widgets/
    ├── login_form.dart                # Formulário de login
    ├── registrar_form.dart            # Formulário de registro
    └── animal_form.dart               # Formulário de cadastro de animais
\`\`\`

## 🔐 Credenciais de Teste

Para testar a aplicação, use qualquer e-mail válido e senha com pelo menos 6 caracteres:

**Login:**
- Email: `veterinario@teste.com`
- Senha: `123456`

**Registro:**
- Preencha todos os campos do formulário
- CRMV: qualquer número com 4+ dígitos
- Senha: mínimo 6 caracteres

## 🛠️ Tecnologias Utilizadas

- **Flutter 3.x** - Framework de desenvolvimento
- **Material Design 3** - Design system
- **Dart** - Linguagem de programação

## 📝 Funcionalidades

### Autenticação
- Login com validação de e-mail e senha
- Registro de novos veterinários com CRMV
- Logout com redirecionamento

### Gestão de Pacientes
- Cadastro de animais (nome, espécie, raça, sexo, data de nascimento)
- Validação completa de formulários
- Interface intuitiva com modal bottom sheet

## 🔮 Próximos Passos

- [ ] Integração com backend real
- [ ] Listagem de pacientes no dashboard
- [ ] Edição e exclusão de pacientes
- [ ] Sistema de diagnóstico com IA
- [ ] Histórico médico dos animais
- [ ] Persistência local de dados

## 📄 Licença

Este projeto é um protótipo educacional.

---

Desenvolvido para DiagnoVetis - Sistema de Diagnóstico Veterinário
