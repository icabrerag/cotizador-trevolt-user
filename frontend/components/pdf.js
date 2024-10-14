import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: '#f5f5f5', // Fondo suave para mejor lectura
    color: '#333', // Texto oscuro
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50', // Verde agradable para el título
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff', // Fondo blanco para contraste
    borderRadius: 8, // Bordes redondeados
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottom: '2px solid #4CAF50', // Línea debajo del título de la sección
    paddingBottom: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 1.6,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
});

// Función para formatear el precio en pesos chilenos
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount);
};

// Obtener la fecha actual
const today = new Date();
const fechaCotizacion = today.toLocaleDateString(); // Formato local de la fecha

// Calcular la fecha de vencimiento (10 días después)
const vencimiento = new Date(today);
vencimiento.setDate(vencimiento.getDate() + 10);
const fechaVencimiento = vencimiento.toLocaleDateString(); // Formato local de la fecha

const CotizacionPDF = ({ formData, producto }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Título principal */}
      <Text style={styles.title}>Cotización Trevolt</Text>

      {/* Sección de datos del cliente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Cliente</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Nombre:</Text> {formData.name || 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Empresa:</Text> {formData.company || 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Correo Electrónico:</Text> {formData.email || 'No especificado'}
        </Text>
        <Text style={styles.boldText}>Fecha: {fechaCotizacion}</Text>
        <Text style={styles.boldText}>Fecha de vencimiento: {fechaVencimiento}</Text>
      </View>

      {/* Sección de datos del proyecto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles del Proyecto</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Región:</Text> {formData.responses['¿En cuál región se ubica el proyecto?'] || 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Consumo de Energía:</Text> {formData.responses['¿Cuánta energía consume? (kWh)'] || 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Conectado a la Red:</Text> {formData.responses['¿Su instalación está conectada a la red?'] || 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Rango de Potencia:</Text> {formData.responses['Rango de potencia que va a utilizar en kW (desde 3 a 300)'] || 'No especificado'}
        </Text>
      </View>

      {/* Sección de producto cotizado */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Producto Cotizado</Text>
        <View style={styles.row}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Inversor:</Text> {producto ? producto.inversor : 'No especificado'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Marca:</Text> {producto ? producto.marca : 'No especificado'}
          </Text>
        </View>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Cantidad de Paneles RISEN:</Text> {producto ? producto.cantidad_paneles_risen_550w : 'No especificado'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Precio de instalación:</Text> {producto ? formatCurrency(producto.valor_neto_aproximado) : 'No especificado'}
        </Text>
      </View>
    </Page>
  </Document>
);

export default CotizacionPDF;
