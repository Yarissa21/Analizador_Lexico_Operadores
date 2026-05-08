import { useState } from 'react';

interface Resultado {
  tipo: string;
  valor: string;
}

function App() {
  const [entrada, setEntrada] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [error, setError] = useState('');

  const analizarCadena = async () => {
    setError('');
    setResultados([]);
    try {
      const respuesta = await fetch('http://localhost:3000/analizador/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entrada }),
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) {
        setError(datos.message);
        return;
      }
      setResultados(datos);
    } catch (error) {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-900 border border-blue-500/40 shadow-lg shadow-blue-500/30 rounded-xl p-8 w-full max-w-2xl">
        
        <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-6 tracking-wide drop-shadow-lg">
          ⚡ Analizador Léxico ⚡
        </h1>

        <textarea
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Ingrese una cadena..."
          className="w-full bg-gray-800 text-gray-200 border border-blue-500/40 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
        />

        <button
          onClick={analizarCadena}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition transform hover:scale-105 shadow-md"
        >
          Analizar
        </button>

        {error && (
          <div className="mt-4 bg-red-900/40 text-red-300 border border-red-500/40 p-3 rounded-lg shadow-md">
            {error}
          </div>
        )}

        {resultados.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">
              Resultados
            </h2>
            <div className="space-y-3">
              {resultados.map((resultado, index) => (
                <div
                  key={index}
                  className="border border-purple-500/40 rounded-lg p-4 bg-gray-800 text-gray-200 shadow-md hover:shadow-purple-500/30 transition"
                >
                  <p>
                    <span className="font-bold text-blue-300">Tipo:</span> {resultado.tipo}
                  </p>
                  <p>
                    <span className="font-bold text-purple-300">Valor:</span> {resultado.valor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
