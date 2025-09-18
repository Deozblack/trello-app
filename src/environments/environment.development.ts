// Environment para DESARROLLO
export const environment = {
  production: false,
  
  // ✅ URLs de desarrollo
  apiUrl: 'http://localhost:3000/api',
  authUrl: 'http://localhost:3000/auth',
  
  // ✅ Configuraciones de desarrollo
  appName: 'Trello App (Dev)',
  version: '1.0.0-dev',
  
  // ✅ Firebase de desarrollo (configuración pública)
  firebaseConfig: {
    apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Proyecto de desarrollo
    authDomain: 'miapp-dev.firebaseapp.com',
    projectId: 'miapp-dev-12345',
    storageBucket: 'miapp-dev-12345.appspot.com',
    messagingSenderId: '987654321',
    appId: '1:987654321:web:fedcba654321'
  },
  
  // ✅ Configuraciones para desarrollo
  enableAnalytics: false,
  enableDebug: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB para testing
  
  // ✅ URLs de servicios mock para desarrollo
  mockApi: true,
  mockDelay: 1000, // Simular latencia
};
