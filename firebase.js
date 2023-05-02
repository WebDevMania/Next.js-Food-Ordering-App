import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7CIITnKHWkFTcC3EO-e1foNt2GM640X8",
  authDomain: "food-ordering-app-46e7a.firebaseapp.com",
  projectId: "food-ordering-app-46e7a",
  storageBucket: "food-ordering-app-46e7a.appspot.com",
  messagingSenderId: "523760707660",
  appId: "1:523760707660:web:9a5b0101d8ded813272ce9"
};

const app = initializeApp(firebaseConfig);

export default app