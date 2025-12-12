import 'package:http/http.dart' as http;
import 'dart:convert';

class EnergyService {
  final String apiUrl;
  final http.Client client;

  EnergyService({
    required this.apiUrl,
    http.Client? client,
  }) : client = client ?? http.Client();

  Future<List<Map<String, dynamic>>> fetchEnergyData() async {
    final response = await client
        .get(
          Uri.parse(apiUrl),
          headers: {'accept': 'application/json'},
        )
        .timeout(const Duration(seconds: 5));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((item) => item as Map<String, dynamic>).toList();
    } else {
      throw Exception('Error al cargar datos: ${response.statusCode}');
    }
  }
}

