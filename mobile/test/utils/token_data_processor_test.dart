import 'package:flutter_test/flutter_test.dart';
import 'package:cayapa/utils/token_data_processor.dart';

void main() {
  group('TokenDataProcessor', () {
    test('processEnergyData procesa correctamente 12 valores', () {
      // Arrange
      final data = List.generate(12, (i) => {'energy': i * 1.5});

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      expect(result[0].x, equals(0.0));
      expect(result[11].x, equals(11.0));
      // Los valores están invertidos
      expect(result[0].y, equals(16.5)); // último valor
      expect(result[11].y, equals(0.0)); // primer valor
    });

    test('processEnergyData toma solo los últimos 12 valores cuando hay más', () {
      // Arrange
      final data = List.generate(15, (i) => {'energy': i * 1.0});

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      // Debe tomar los últimos 12 (índices 3-14)
      expect(result[0].y, equals(14.0)); // último valor
      expect(result[11].y, equals(3.0)); // primer valor de los últimos 12
    });

    test('processEnergyData rellena con ceros cuando hay menos de 12 valores', () {
      // Arrange
      final data = [
        {'energy': 5.0},
        {'energy': 10.0},
        {'energy': 15.0},
      ];

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      // Los primeros valores deben ser 0.0
      expect(result[11].y, equals(0.0));
      expect(result[10].y, equals(0.0));
      expect(result[9].y, equals(0.0));
      // Los últimos valores deben ser los datos originales (invertidos)
      expect(result[0].y, equals(15.0));
      expect(result[1].y, equals(10.0));
      expect(result[2].y, equals(5.0));
    });

    test('processEnergyData maneja valores negativos correctamente', () {
      // Arrange
      final data = [
        {'energy': -5.0},
        {'energy': 0.0},
        {'energy': 5.0},
        {'energy': 10.0},
      ];

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      expect(result[0].y, equals(10.0));
      expect(result[1].y, equals(5.0));
      expect(result[2].y, equals(0.0));
      expect(result[3].y, equals(-5.0));
    });

    test('processEnergyData maneja valores nulos como cero', () {
      // Arrange
      final data = [
        {'energy': null},
        {'energy': 5.0},
        {'energy': null},
      ];

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      expect(result[0].y, equals(0.0)); // null convertido a 0.0
      expect(result[1].y, equals(5.0));
      expect(result[2].y, equals(0.0)); // null convertido a 0.0
    });

    test('processEnergyData maneja lista vacía', () {
      // Arrange
      final data = <Map<String, dynamic>>[];

      // Act
      final result = TokenDataProcessor.processEnergyData(data);

      // Assert
      expect(result.length, equals(12));
      // Todos los valores deben ser 0.0
      for (var spot in result) {
        expect(spot.y, equals(0.0));
      }
    });

    test('isValidEnergyData retorna true para datos válidos', () {
      // Arrange
      final data = [
        {'energy': 10.0},
        {'energy': 20.0},
      ];

      // Act
      final result = TokenDataProcessor.isValidEnergyData(data);

      // Assert
      expect(result, isTrue);
    });

    test('isValidEnergyData retorna false para lista vacía', () {
      // Arrange
      final data = <Map<String, dynamic>>[];

      // Act
      final result = TokenDataProcessor.isValidEnergyData(data);

      // Assert
      expect(result, isFalse);
    });

    test('isValidEnergyData retorna false cuando falta el campo energy', () {
      // Arrange
      final data = [
        {'timestamp': 1234567890},
        {'energy': 10.0},
      ];

      // Act
      final result = TokenDataProcessor.isValidEnergyData(data);

      // Assert
      expect(result, isFalse);
    });
  });
}

