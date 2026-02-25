import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function ServerError({
  message,
  onClose,
  duration = 4000
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto hide
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose?.(); // махаме message от родителя
    });
  };

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{message}</Text>

        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  errorBox: {
    backgroundColor: 'rgba(255,0,0,0.15)',
    borderWidth: 1,
    borderColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});