// Environment para PRODUCCIÓN
export const environment = {
  production: true,
  
  // ✅ URLs públicas de APIs
  apiUrl: 'https://api.miapp.com',
  authUrl: 'https://auth.miapp.com',
  
  // ✅ Configuraciones públicas
  appName: 'Trello App',
  version: '1.0.0',
  
  // ✅ IDs públicos de servicios externos
  firebaseConfig: {
    apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Este es público
    authDomain: 'miapp.firebaseapp.com',
    projectId: 'miapp-12345',
    storageBucket: 'miapp-12345.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef123456'
  },
  
  // ✅ Configuraciones de comportamiento
  enableAnalytics: true,
  enableDebug: false,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  
  // ❌ NUNCA pongas esto aquí:
  // secretKey: 'mi-clave-secreta', // ❌ NO!
  // databasePassword: 'password123', // ❌ NO!
  // stripeSecretKey: 'sk_live_...', // ❌ NO!
};
