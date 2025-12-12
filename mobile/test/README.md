# Pruebas Unitarias - Cayapa Solar Mobile

Este directorio contiene las pruebas unitarias del proyecto Flutter usando `mocktail` para crear mocks.

## Estructura de Pruebas

```
test/
├── services/
│   └── energy_service_test.dart    # Pruebas del servicio de energía
├── utils/
│   └── token_data_processor_test.dart  # Pruebas del procesador de datos
└── widget_test.dart                 # Pruebas de widgets básicas
```

## Ejecutar las Pruebas

### Ejecutar todas las pruebas
```bash
flutter test
```

### Ejecutar una prueba específica
```bash
flutter test test/services/energy_service_test.dart
flutter test test/utils/token_data_processor_test.dart
```

### Ejecutar con cobertura
```bash
flutter test --coverage
```

## Pruebas Implementadas

### EnergyService Tests
- ✅ Retorna datos cuando la respuesta es exitosa
- ✅ Lanza excepción cuando el status code no es 200
- ✅ Maneja datos vacíos correctamente
- ✅ Maneja valores nulos en energy

### TokenDataProcessor Tests
- ✅ Procesa correctamente 12 valores
- ✅ Toma solo los últimos 12 valores cuando hay más
- ✅ Rellena con ceros cuando hay menos de 12 valores
- ✅ Maneja valores negativos correctamente
- ✅ Maneja valores nulos como cero
- ✅ Maneja lista vacía
- ✅ Valida datos de energía correctamente

## Dependencias de Testing

- `flutter_test`: Framework de testing de Flutter (incluido en el SDK)
- `mocktail`: Biblioteca para crear mocks sin necesidad de código generado

## Notas

- Los mocks se crean usando `mocktail` que no requiere código generado
- El servicio `EnergyService` acepta un `http.Client` opcional para facilitar el testing
- Las funciones de procesamiento están separadas en `TokenDataProcessor` para facilitar las pruebas unitarias

