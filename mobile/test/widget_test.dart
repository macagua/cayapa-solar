import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:cayapa/main.dart';

void main() {
  testWidgets('App muestra el dashboard de tokens', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verificar que el título del AppBar está presente
    expect(find.text('Dashboard de Tokens'), findsOneWidget);

    // Verificar que el nombre del usuario está presente
    expect(find.text('Alvaro'), findsWidgets);

    // Verificar que el email está presente
    expect(find.text('alvaro@mail.com'), findsOneWidget);
  });
}
