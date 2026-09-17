
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TicketConfirmacion({
  datos,
  volverAInscribir,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.titulo}>
          SONIDO SUR
        </Text>

        <Text style={styles.confirmacion}>
          ¡Inscripción confirmada!
        </Text>

        <View style={styles.linea} />

        <Text style={styles.dato}>
          Nombre
        </Text>

        <Text style={styles.valor}>
          {datos.nombreCompleto}
        </Text>

        <Text style={styles.dato}>
          Email
        </Text>

        <Text style={styles.valor}>
          {datos.email}
        </Text>

        <Text style={styles.dato}>
          Edad
        </Text>

        <Text style={styles.valor}>
          {datos.edad}
        </Text>

        <Text style={styles.dato}>
          Tipo de entrada
        </Text>

        <Text style={styles.valor}>
          {datos.tipoEntrada.toUpperCase()}
        </Text>

        {datos.telefono !== '' && (
          <>
            <Text style={styles.dato}>
              Teléfono
            </Text>

            <Text style={styles.valor}>
              {datos.telefono}
            </Text>
          </>
        )}

        <TouchableOpacity
          style={styles.boton}
          onPress={volverAInscribir}
        >
          <Text style={styles.textoBoton}>
            Volver a inscribir a otra persona
          </Text>
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
  },

  ticket: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  confirmacion: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },

  linea: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 20,
  },

  dato: {
    fontSize: 13,
    color: '#777777',
    marginTop: 10,
  },

  valor: {
    fontSize: 17,
    fontWeight: 'bold',
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
