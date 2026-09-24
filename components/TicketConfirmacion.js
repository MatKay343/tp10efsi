import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TicketConfirmacion({ datos, volverAInscribir }) {
  const tipoEntrada = datos.tipoEntrada === 'vip' ? 'VIP' : 'General';

  return (
    <View style={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.titulo}>SONIDO SUR</Text>
        <Text style={styles.confirmacion}>¡Inscripción confirmada!</Text>

        <View style={styles.linea} />

        <Text style={styles.dato}>Nombre completo</Text>
        <Text style={styles.valor}>{datos.nombreCompleto}</Text>

        <Text style={styles.dato}>Email</Text>
        <Text style={styles.valor}>{datos.email}</Text>

        <Text style={styles.dato}>Edad</Text>
        <Text style={styles.valor}>{datos.edad}</Text>

        <Text style={styles.dato}>Tipo de entrada</Text>
        <Text style={styles.valor}>{tipoEntrada}</Text>

        {datos.telefono && (
          <>
            <Text style={styles.dato}>Teléfono</Text>
            <Text style={styles.valor}>{datos.telefono}</Text>
          </>
        )}

        <TouchableOpacity style={styles.boton} onPress={volverAInscribir}>
          <Text style={styles.textoBoton}>Volver a inscribir a otra persona</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#101010',
  },

  ticket: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#111111',
  },

  confirmacion: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: '#111111',
  },

  linea: {
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    marginBottom: 18,
  },

  dato: {
    fontSize: 13,
    color: '#777777',
    marginTop: 10,
    textTransform: 'uppercase',
  },

  valor: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111111',
  },

  boton: {
    backgroundColor: '#111111',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
