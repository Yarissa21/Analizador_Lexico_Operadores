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

      const respuesta = await fetch(
        'http://localhost:3000/analizador/analizar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            entrada,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.message);
        return;
      }

      setResultados(datos);

    } catch (error) {

      setError(
        'No se pudo conectar con el servidor.'
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Analizador Léxico
        </h1>

        <textarea
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Ingrese una cadena..."
          className="w-full border border-gray-300 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={analizarCadena}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Analizar
        </button>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {resultados.length > 0 && (

          <div className="mt-6">

            <h2 className="text-xl font-semibold mb-4">
              Resultados
            </h2>

            <div className="space-y-3">

              {resultados.map((resultado, index) => (

                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <p>
                    <span className="font-bold">
                      Tipo:
                    </span>{' '}
                    {resultado.tipo}
                  </p>

                  <p>
                    <span className="font-bold">
                      Valor:
                    </span>{' '}
                    {resultado.valor}
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