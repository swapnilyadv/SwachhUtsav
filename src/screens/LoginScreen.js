import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('Citizen');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your credentials');
      return;
    }
    
    setLoading(true);
    // Simulating authentication
    setTimeout(() => {
      setLoading(false);
      if (activeRole === 'Citizen') {
        navigation.navigate('CitizenHome');
      } else if (activeRole === 'Garbage Collector') {
        navigation.navigate('CollectorDashboard');
      } else {
        navigation.navigate('AdminDashboard');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>♻️</Text>
            </View>
            <Text style={styles.title}>SwachhUtsav</Text>
            <Text style={styles.subtitle}>Smart Festival Waste Management</Text>
          </View>

          <View style={styles.roleSelector}>
            {['Citizen', 'Garbage Collector', 'Admin'].map((role) => (
              <TouchableOpacity 
                key={role}
                style={[styles.roleBtn, activeRole === role && styles.roleBtnActive]}
                onPress={() => setActiveRole(role)}
              >
                <Text style={[styles.roleBtnText, activeRole === role && styles.roleBtnTextActive]}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity 
              style={styles.forgotPass} 
              onPress={() => {
                console.log('Navigating to ForgotPassword');
                navigation.navigate('ForgotPassword');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPassText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginBtn} 
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => {
                  console.log('Navigating to Register');
                  navigation.navigate('Register');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.registerText}>Register now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  roleBtnActive: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  roleBtnText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  roleBtnTextActive: {
    color: '#2E7D32',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPassText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#666',
  },
  registerText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});
