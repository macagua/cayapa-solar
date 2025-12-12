import 'package:fl_chart/fl_chart.dart';

class TokenDataProcessor {
  /// Procesa los datos de energía y los convierte en puntos para la gráfica
  /// Toma los últimos 12 valores, rellena con ceros si es necesario y los invierte
  static List<FlSpot> processEnergyData(List<Map<String, dynamic>> data) {
    // Extraer los valores de energía
    List<double> energyValues = data
        .map((item) => (item['energy'] as num?)?.toDouble() ?? 0.0)
        .toList();

    // Si hay más de 12 valores, tomar solo los últimos 12
    if (energyValues.length > 12) {
      energyValues = energyValues.sublist(energyValues.length - 12);
    }

    // Si hay menos de 12 valores, rellenar con ceros al inicio
    while (energyValues.length < 12) {
      energyValues.insert(0, 0.0);
    }

    // Invertir el orden de los valores y crear los puntos de la gráfica
    final reversedValues = energyValues.reversed.toList();
    return reversedValues.asMap().entries.map((entry) {
      return FlSpot(entry.key.toDouble(), entry.value);
    }).toList();
  }

  /// Valida si los datos de energía son válidos
  static bool isValidEnergyData(List<Map<String, dynamic>> data) {
    return data.isNotEmpty && data.every((item) => item.containsKey('energy'));
  }
}

