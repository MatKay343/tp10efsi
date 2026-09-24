import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CampoFormulario from '../components/CampoFormulario';
import TicketConfirmacion from '../components/TicketConfirmacion';

export default function InscripcionScreen() {
  const [datosConfirmados, setDatosConfirmados] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
  });

  useEffect(() => {
    const cargarUltimoEmail = async () => {
      try {
        const emailGuardado = await AsyncStorage.getItem('@sonidoSur:ultimoEmail');
        if (emailGuardado) {
          setValue('email', emailGuardado, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      } catch (error) {
        console.log('Error al cargar último email:', error);
      }
    };

    cargarUltimoEmail();
  }, [setValue]);

  const confirmarInscripcion = async (datos) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await AsyncStorage.setItem('@sonidoSur:ultimoEmail', datos.email.trim());
    } catch (error) {
      console.log('Error al guardar último email:', error);
    }

    setDatosConfirmados({ ...datos, email: datos.email.trim() });
    setIsSubmitting(false);
  };

  const volverAInscribir = () => {
    reset({
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    });
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

  const botonDeshabilitado = !isValid || isSubmitting;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>SONIDO SUR</Text>
        <Text style={styles.subtitulo}>Formulario de inscripción</Text>

        <Controller
          control={control}
          name="nombreCompleto"
          rules={{
            required: 'Ingresá tu nombre completo',
            validate: (value) =>
              (value && value.trim().length >= 3) || 'Ingresá tu nombre completo',
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
            validate: (value) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '') ||
              'Ingresá un email válido',
          }}
          render={({ field: { onChange, value } }) => (
            <CampoFormulario
              label="Email"
              placeholder="Ej: juan@gmail.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
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
              if (value === '' || value === undefined) {
                return 'La edad tiene que ser mayor a 12';
              }

              const edad = Number(value);

              if (!Number.isInteger(edad) || edad <= 12 || edad > 99) {
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

        <Text style={styles.label}>Tipo de entrada</Text>

        <Controller
          control={control}
          name="tipoEntrada"
          rules={{ required: 'Elegí un tipo de entrada' }}
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
                <Text style={styles.error}>{errors.tipoEntrada.message}</Text>
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
              if (!value || value.trim() === '') {
                return true;
              }

              return /^[0-9]+$/.test(value.trim()) || 'Solo se permiten números';
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
          style={[styles.boton, botonDeshabilitado && styles.botonDeshabilitado]}
          onPress={handleSubmit(confirmarInscripcion)}
          disabled={botonDeshabilitado}
        >
          {isSubmitting ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator size="small" color="#101010" />
              <Text style={styles.textoBoton}>Procesando...</Text>
            </View>
          ) : (
            <Text style={styles.textoBoton}>Confirmar inscripción</Text>
          )}
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
    backgroundColor: '#6d5dfc',
  },

  textoOpcion: {
    fontWeight: 'bold',
    color: '#111111',
  },

  textoSeleccionado: {
    color: '#ffffff',
  },

  error: {
    color: '#ff6b6b',
    marginTop: 6,
    fontSize: 14,
  },

  espacio: {
    height: 10,
  },

  boton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },

  botonDeshabilitado: {
    opacity: 0.45,
  },

  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  textoBoton: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
