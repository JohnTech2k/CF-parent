importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAEYLb-12Sy1IJt-Sw-1IG3tnmiNsKyFAg",
  authDomain: "cf-parent.firebaseapp.com",
  databaseURL: "https://cf-parent-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cf-parent",
  storageBucket: "cf-parent.firebasestorage.app",
  messagingSenderId: "496223135941",
  appId: "1:496223135941:web:da8c92a5b928aac28828ac"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'CF Parents', {
    body: body || '',
    icon: '/icon.png',
    badge: '/icon.png'
  });
});
