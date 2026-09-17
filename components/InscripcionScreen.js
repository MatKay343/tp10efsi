import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';

import CampoFormulario from '../components/CampoFormulario';
import TicketConfirmacion from '../components/TicketConfirmacion';

export default function InscripcionScreen() {
  const [datosConfirmados, setDatosConfirmados] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',

    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
  });

  const confirmarInscripcion = (datos) => {
    debugger;
    console.log("llego aca");
    setDatosConfirmados(datos);
  };

  const volverAInscribir = () => {
    reset();
    setDatosConfirmados(null);
  };

  if (datosConfirmados) {
    return (
      <View style={styles.container}>
        <TicketConfirmacion
          datos={datosConfirmados}
          volverAInscribir={volverAInscribir}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          SONIDO SUR
        </Text>

        <Text style={styles.subtitulo}>
          Formulario de inscripción
        </Text>

        <Controller
          control={control}
          name="nombreCompleto"
          rules={{
            required: 'Ingresá tu nombre completo',
            minLength: {
              value: 3,
              message: 'Ingresá tu nombre completo',
            },
            validate: (value) =>
              value.trim().length >= 3 ||
              'Ingresá tu nombre completo',
          }}
          render={({ field: { onChange, value } }) => (
            <CampoFormulario
              label="Nombre completo"
              placeholder="Ej: Juan Pérez"
              value={value}
              onChangeText={onChange}
              error={errors.nombreCompleto?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Ingresá un email válido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingresá un email válido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CampoFormulario
              label="Email"
              placeholder="Ej: juan@gmail.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="edad"
          rules={{
            required: 'La edad tiene que ser mayor a 12',
            validate: (value) => {
              const edad = Number(value);

              if (edad < 12 || edad > 99) {
                return 'La edad tiene que ser mayor a 12';
              }

              return true;
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CampoFormulario
              label="Edad"
              placeholder="Ej: 17"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              error={errors.edad?.message}
            />
          )}
        />

        <Text style={styles.label}>
          Tipo de entrada
        </Text>

        <Controller
          control={control}
          name="tipoEntrada"
          rules={{
            required: 'Elegí un tipo de entrada',
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <View style={styles.opciones}>
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    value === 'general' && styles.opcionSeleccionada,
                  ]}
                  onPress={() => onChange('general')}
                >
                  <Text
                    style={[
                      styles.textoOpcion,
                      value === 'general' && styles.textoSeleccionado,
                    ]}
                  >
                    General
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.opcion,
                    value === 'vip' && styles.opcionSeleccionada,
                  ]}
                  onPress={() => onChange('vip')}
                >
                  <Text
                    style={[
                      styles.textoOpcion,
                      value === 'vip' && styles.textoSeleccionado,
                    ]}
                  >
                    VIP
                  </Text>
                </TouchableOpacity>
              </View>

              {errors.tipoEntrada && (
                <Text style={styles.error}>
                  {errors.tipoEntrada.message}
                </Text>
              )}
            </View>
          )}
        />

        <View style={styles.espacio} />

        <Controller
          control={control}
          name="telefono"
          rules={{
            validate: (value) => {
              if (value === '') {
                return true;
              }

              return /^[0-9]+$/.test(value)
                ? true
                : 'Solo se permiten números';
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CampoFormulario
              label="Teléfono (opcional)"
              placeholder="Ej: 1123456789"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              error={errors.telefono?.message}
            />
          )}
        />

        <TouchableOpacity
          style={[
            styles.boton,
            !isValid && styles.botonDeshabilitado,
          ]}
          onPress={confirmarInscripcion}
          disabled={!isValid}
        >
          <Text style={styles.textoBoton}>
            Confirmar inscripción
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },

  scroll: {
    padding: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    color: '#aaaaaa',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  opciones: {
    flexDirection: 'row',
    gap: 10,
  },

  opcion: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  opcionSeleccionada: {
    backgroundColor: '#555555',
  },

  textoOpcion: {
    fontWeight: 'bold',
    color: '#111111',
  },

  textoSeleccionado: {
    color: '#ffffff',
  },

  error: {
    color: '#ff4d4d',
    marginTop: 5,
    fontSize: 14,
  },

  espacio: {
    height: 5,
  },

  boton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  botonDeshabilitado: {
    opacity: 0.4,
  },

  textoBoton: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
