import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CampoFormulario({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    color: '#111111',
  },

  inputError: {
    borderColor: '#ff6b6b',
  },

  error: {
    color: '#ff6b6b',
    marginTop: 5,
    fontSize: 14,
  },
});