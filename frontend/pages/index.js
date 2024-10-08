import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer'; // Importa pdf para generar el archivo
import CotizacionPDF from '../components/pdf';

const regions = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  'O’Higgins',
  'Maule',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes y la Antártica Chilena',
];

const questions = [
  { question: '¿En cuál región se ubica el proyecto?', type: 'select' },
  { question: '¿Cuánta energía consume? (kWh)', type: 'number' },
  { question: '¿Su instalación está conectada a la red?', type: 'select', options: ['Sí', 'No'] },
  { question: 'Rango de potencia que va a utilizar en kW (desde 3 a 300)', type: 'number', min: 3, max: 300 },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    responses: {},
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [producto, setProducto] = useState(null);

  // Nuevo useEffect para cargar producto cuando se ingresa la potencia
  useEffect(() => {
    const potencia = formData.responses['Rango de potencia que va a utilizar en kW (desde 3 a 300)'];
    if (potencia) {
      fetchProducto(potencia); // Llama a la función cuando la potencia es válida
    }
  }, [formData.responses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 0) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        responses: { ...formData.responses, [questions[step - 1].question]: value },
      });
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[step - 1];

    if (step === 0 && (!formData.name || !formData.company || !formData.email)) {
      alert('Por favor, completa toda la información.');
      return;
    } else if (currentQuestion && !formData.responses[currentQuestion.question]) {
      alert(`Por favor, responde a la pregunta: "${currentQuestion.question}".`);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 300); // Duración de la transición
  };

  const fetchProducto = async (potencia) => {
    try {
      const response = await fetch(`/api/productos?potencia=${potencia}`);
      if (!response.ok) {
        throw new Error('Error fetching product');
      }
      
      const productoObtenido = await response.json();
      
      // Imprimir la respuesta completa para depuración
      console.log('Producto obtenido:', productoObtenido);
  
      // Verifica que el producto obtenido tenga la información que necesitas
      if (productoObtenido && Object.keys(productoObtenido).length > 0) {
        setProducto(productoObtenido);
      } else {
        console.error('Producto no válido:', productoObtenido);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };  

  const generatePDF = async () => {
    const blob = await pdf(
      <CotizacionPDF
        formData={formData}
        producto={producto}
      />
    ).toBlob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cotizacion.pdf';
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const potencia = formData.responses['Rango de potencia que va a utilizar en kW (desde 3 a 300)'];
      await fetchProducto(potencia);

      // Una vez que se obtenga el producto, genera el PDF automáticamente
      await generatePDF();

    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error al obtener el producto. Inténtalo de nuevo.');
    }
  };

  const renderQuestion = () => {
    if (step === 0) {
      return (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6 text-green">Cotizador Trevolt</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-light">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-light">Empresa</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-light">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              required
            />
          </div>
        </div>
      );
    } else if (step <= questions.length) {
      const currentQuestion = questions[step - 1];
      return (
        <div>
          <h2 className="text-2xl mb-4">{currentQuestion.question}</h2>
          {currentQuestion.type === 'select' ? (
            currentQuestion.question === '¿Su instalación está conectada a la red?' ? (
              <select
                name={currentQuestion.question}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              >
                <option value="" disabled selected>
                  Selecciona una opción
                </option>
                {currentQuestion.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name={currentQuestion.question}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              >
                <option value="" disabled selected>
                  Selecciona una región
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            )
          ) : (
            <input
              type={currentQuestion.type}
              min={currentQuestion.min}
              max={currentQuestion.max}
              name={currentQuestion.question}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-dark text-light rounded-md"
              required
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-2xl mb-4">Gracias por completar el formulario</h2>
          <button onClick={handleSubmit} className="w-full py-2 px-4 bg-green text-white font-semibold rounded-md">
            Generar Cotización
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-light">
      <div className="bg-dark border border-gray-600 p-8 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {renderQuestion()}
          </div>
          {step <= questions.length && (
            <div className="mt-6">
              <button type="submit" className="w-full py-2 px-4 bg-green text-white font-semibold rounded-md">
                Siguiente
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
