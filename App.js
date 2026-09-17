import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TicketConfirmacion from './components/TicketConfirmacion';

export default function App() {
  const [mostrarTicket, setMostrarTicket] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const actualizarCampo = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
  };

  const enviarFormulario = () => {
    if (formulario) {
        setMostrarTicket(true);
      }
  };

  if (mostrarTicket) {
    return (
    <View style={styles.container}>
      <TicketConfirmacion
        datos={formulario}
      />
    </View>
    );
  } else {
     return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Text style={styles.titulo}>SonidoSur</Text>

        <Text style={styles.subtitulo}>
          Contactanos
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formulario.nombre}
          onChangeText={(texto) => actualizarCampo('nombre', texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formulario.email}
          onChangeText={(texto) => actualizarCampo('email', texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={formulario.telefono}
          onChangeText={(texto) => actualizarCampo('telefono', texto)}
        />

        <TextInput
          style={[styles.input, styles.mensaje]}
          placeholder="Mensaje"
          multiline
          value={formulario.mensaje}
          onChangeText={(texto) => actualizarCampo('mensaje', texto)}
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={enviarFormulario}
        >
          <Text style={styles.textoBoton}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 25,
    justifyContent: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  mensaje: {
    height: 120,
    textAlignVertical: 'top',
  },

  boton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBoton: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});