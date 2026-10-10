import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        // Mapeo y transformación de los datos
        const formattedData = data.map((item) => ({
          nombre: item.name,
          correo: item.email,
          usuario: item.username,
          ciudad: item.address.city,
        }));

        setProfiles(formattedData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="status-msg">Cargando datos...</p>;
  }

  return (
    <div className="container">
      <header>
        <h1>Directorio de Usuarios</h1>
      </header>

      <section className="grid-list">
        {profiles.map((profile, index) => (
          <article key={index} className="card">
            <h2>{profile.nombre}</h2>
            <p><strong>Usuario:</strong> @{profile.usuario}</p>
            <p><strong>Email:</strong> {profile.correo}</p>
            <p><strong>Ciudad:</strong> {profile.ciudad}</p>
          </article>
        ))}
      </section>
    </div>
  );
}