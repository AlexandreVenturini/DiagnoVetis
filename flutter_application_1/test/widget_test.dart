import 'package:flutter_test/flutter_test.dart';

import 'package:diagnovetis/main.dart';

void main() {
  testWidgets('DiagnoVetis app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const DiagnoVetisApp());

    // Verify that the login screen is displayed
    expect(find.text('DiagnoVetis'), findsOneWidget);
  });
}
