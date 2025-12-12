import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:cayapa/services/energy_service.dart';

// Mock de http.Client usando mocktail
class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('EnergyService', () {
    late EnergyService energyService;
    late MockHttpClient mockHttpClient;

    setUp(() {
      mockHttpClient = MockHttpClient();
      energyService = EnergyService(
        apiUrl: 'http://test.com/api/read',
        client: mockHttpClient,
      );
    });

    test('fetchEnergyData retorna datos cuando la respuesta es exitosa', () async {
      // Arrange
      final mockData = [
        {'energy': 10.5, 'timestamp': 1234567890},
        {'energy': 15.2, 'timestamp': 1234567891},
        {'energy': 8.3, 'timestamp': 1234567892},
      ];

      when(() => mockHttpClient.get(
            any(),
            headers: any(named: 'headers'),
          )).thenAnswer((_) async => http.Response(
            json.encode(mockData),
            200,
          ));

      // Act
      final result = await energyService.fetchEnergyData();

      // Assert
      expect(result, isA<List<Map<String, dynamic>>>());
      expect(result.length, equals(3));
      expect(result[0]['energy'], equals(10.5));
      expect(result[1]['energy'], equals(15.2));
      expect(result[2]['energy'], equals(8.3));

      verify(() => mockHttpClient.get(
            Uri.parse('http://test.com/api/read'),
            headers: {'accept': 'application/json'},
          )).called(1);
    });

    test('fetchEnergyData lanza excepción cuando el status code no es 200', () async {
      // Arrange
      when(() => mockHttpClient.get(
            any(),
            headers: any(named: 'headers'),
          )).thenAnswer((_) async => http.Response('Error', 404));

      // Act & Assert
      expect(
        () => energyService.fetchEnergyData(),
        throwsA(isA<Exception>()),
      );

      verify(() => mockHttpClient.get(
            Uri.parse('http://test.com/api/read'),
            headers: {'accept': 'application/json'},
          )).called(1);
    });

    test('fetchEnergyData maneja datos vacíos correctamente', () async {
      // Arrange
      when(() => mockHttpClient.get(
            any(),
            headers: any(named: 'headers'),
          )).thenAnswer((_) async => http.Response(
            json.encode([]),
            200,
          ));

      // Act
      final result = await energyService.fetchEnergyData();

      // Assert
      expect(result, isA<List<Map<String, dynamic>>>());
      expect(result.length, equals(0));
    });

    test('fetchEnergyData maneja valores nulos en energy', () async {
      // Arrange
      final mockData = [
        {'energy': null, 'timestamp': 1234567890},
        {'energy': 15.2, 'timestamp': 1234567891},
      ];

      when(() => mockHttpClient.get(
            any(),
            headers: any(named: 'headers'),
          )).thenAnswer((_) async => http.Response(
            json.encode(mockData),
            200,
          ));

      // Act
      final result = await energyService.fetchEnergyData();

      // Assert
      expect(result.length, equals(2));
      expect(result[0]['energy'], isNull);
      expect(result[1]['energy'], equals(15.2));
    });
  });
}

