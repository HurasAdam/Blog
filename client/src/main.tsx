import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx'
import "./styles/index.css";
import { Provider } from 'react-redux';
import store from "./store";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>

          <App />

        </QueryClientProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)
