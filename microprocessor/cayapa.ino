#include <WiFi.h>
#include <HTTPClient.h>
#include <LiquidCrystal_I2C.h>
#include <ArduinoJson.h>

// Configuración WiFi
const char* ssid = "SSID_NAME";  // Cambia por tu SSID
const char* password = "PASSWORD";  // Cambia por tu contraseña

// Configuración del servidor
// IMPORTANTE: Reemplaza "192.168.1.XXX" con la IP real de tu servidor en la red local
// Puedes encontrar la IP ejecutando: ipconfig (Windows) o ifconfig (Linux/Mac)
const char* serverURL = "http://10.191.102.142:3000/api/store-json";

// Configuración de pines
#define ADC_PIN 36  // ADC0 (GPIO0 en ESP32)
#define LED_NEGATIVO 32  // G34
#define LED_0_10 33      // G32
#define LED_10_20 26     // G33

// Configuración LCD I2C (ajusta la dirección I2C según tu módulo, comúnmente 0x27 o 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Dirección I2C, columnas, filas

// Variables
unsigned long lastRequestTime = 0;
const unsigned long requestInterval = 5000;  // 5 segundos en milisegundos

void setup() {
  // Inicializar Serial
  Serial.begin(115200);
  delay(1000);

  // Configurar pines de LEDs como salidas
  pinMode(LED_NEGATIVO, OUTPUT);
  pinMode(LED_0_10, OUTPUT);
  pinMode(LED_10_20, OUTPUT);
  
  // Apagar todos los LEDs inicialmente
  digitalWrite(LED_NEGATIVO, LOW);
  digitalWrite(LED_0_10, LOW);
  digitalWrite(LED_10_20, LOW);

  // Configurar ADC
  analogReadResolution(12);  // ESP32 tiene ADC de 12 bits (0-4095)

  // Inicializar LCD
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Inicializando...");

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Conectado! IP: ");
  Serial.println(WiFi.localIP());

  // Mostrar IP en LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("IP: ");
  lcd.print(WiFi.localIP());
  delay(2000);
  
  lcd.clear();
}

void loop() {
  // Leer valor del ADC0
  int adcValue = analogRead(ADC_PIN);
  
  // Mapear ADC0 (0-4095) a energy (-10 a 20)
  // Fórmula: energy = -10 + (adcValue / 4095.0) * 30
  float energy = -10.0 + (adcValue / 4095.0) * 30.0;
  
  // Controlar LEDs según el valor de energy
  controlarLEDs(energy);
  
  // Mostrar en LCD
  mostrarEnLCD(adcValue, energy);
  
  // Enviar datos al servidor cada 5 segundos
  unsigned long currentTime = millis();
  if (currentTime - lastRequestTime >= requestInterval) {
    enviarDatosAlServidor(energy);
    lastRequestTime = currentTime;
  }
  
  delay(100);  // Pequeño delay para estabilidad
}

void controlarLEDs(float energy) {
  // Apagar todos los LEDs primero
  digitalWrite(LED_NEGATIVO, LOW);
  digitalWrite(LED_0_10, LOW);
  digitalWrite(LED_10_20, LOW);
  
  // Encender LEDs según el rango de energy
  if (energy < 0) {
    // Negativo: solo G35
    digitalWrite(LED_NEGATIVO, HIGH);
  } else if (energy >= 0 && energy < 10) {
    // Entre 0 y 10: G32
    digitalWrite(LED_0_10, HIGH);
  } else if (energy >= 10 && energy <= 20) {
    // Entre 10 y 20: G33
    digitalWrite(LED_10_20, HIGH);
  }
}

void mostrarEnLCD(int adcValue, float energy) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Energy: ");
  lcd.print(adcValue);
  lcd.print(" kWH");
  
  // Opcional: mostrar energy en segunda línea
  lcd.setCursor(0, 1);
  lcd.print("CAYAPA: ");
  lcd.print(energy, 2);
}

void enviarDatosAlServidor(float energy) {
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado. Intentando reconectar...");
    WiFi.begin(ssid, password);
    return;
  }
  
  HTTPClient http;
  
  // Configurar URL
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  
  // Crear JSON
  StaticJsonDocument<200> doc;
  doc["device_id"] = "cayapa-001";
  doc["energy"] = energy;
  doc["timestamp"] = millis() / 1000;  // Tiempo en segundos desde inicio
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.print("Enviando datos: ");
  Serial.println(jsonString);
  
  // Enviar POST request
  int httpResponseCode = http.POST(jsonString);
  
  if (httpResponseCode > 0) {
    Serial.print("Respuesta HTTP: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Respuesta: " + response);
  } else {
    Serial.print("Error en POST: ");
    Serial.print(httpResponseCode);
    // Códigos de error comunes:
    // -1: Error de conexión (servidor no alcanzable, IP incorrecta, servidor caído)
    // -2: Timeout de conexión
    // -3: Error en el código de respuesta HTTP
    if (httpResponseCode == -1) {
      Serial.println(" - Error de conexión. Verifica:");
      Serial.println("   1. Que la IP del servidor sea correcta");
      Serial.println("   2. Que el servidor esté corriendo en el puerto 3000");
      Serial.println("   3. Que el ESP32 y el servidor estén en la misma red");
    } else if (httpResponseCode == -2) {
      Serial.println(" - Timeout de conexión");
    } else {
      Serial.println(" - Error desconocido");
    }
  }
  
  http.end();
}
