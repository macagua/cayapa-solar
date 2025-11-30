// Componente de mapa reutilizable con React Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapMarker {
  id: string
  position: [number, number]
  title: string
  description?: string
  onClick?: () => void
}

interface SolarMapProps {
  center?: [number, number]
  zoom?: number
  markers: MapMarker[]
  height?: string
}

// Componente para centrar el mapa en un marcador
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default function SolarMap({
  center = [40.4168, -3.7038],
  zoom = 11,
  markers,
  height = '400px',
}: SolarMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%' }}
      scrollWheelZoom={true}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{
            click: () => marker.onClick?.(),
          }}
        >
          <Popup>
            <div>
              <strong>{marker.title}</strong>
              {marker.description && (
                <>
                  <br />
                  <span>{marker.description}</span>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

// Ejemplo de uso:
/*
import SolarMap from '@components/SolarMap'

const markers = [
  {
    id: '1',
    position: [40.4168, -3.7038],
    title: 'Placa Solar 1',
    description: 'Producción: 12.5 kWh',
    onClick: () => console.log('Clicked!')
  }
]

<SolarMap markers={markers} />
*/
