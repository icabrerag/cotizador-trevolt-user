// pages/api/productos.js
import db from '../../db/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { potencia } = req.query; // Obtener la potencia del query

    // Verificar si potencia está presente y convertir a número
    if (!potencia || isNaN(potencia)) {
      return res.status(400).json({ message: 'Potencia no especificada o no válida' });
    }

    try {
      // Convertir la potencia a número
      const potenciaNumero = parseFloat(potencia);

      // Cambiar la consulta para seleccionar el producto más cercano con potencia >= a la ingresada
      const [rows] = await db.query(
        'SELECT * FROM productos WHERE potencia_kw >= ? ORDER BY potencia_kw ASC LIMIT 1',
        [potenciaNumero]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontró un producto con la potencia especificada' });
      }

      res.status(200).json(rows[0]); // Responder con el producto más cercano
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
