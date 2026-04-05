import React from 'react';
import { Route, Link } from 'wouter';
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import SearchResults from './pages/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import { GifsContextProvider } from './context/GifsContext';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-logo-link" aria-label="Ir al inicio">
            <img
              className="App-logo"
              alt="Giffy logo"
              src={`${process.env.PUBLIC_URL}/logo192.png`}
            />
            <h1 className="App-brand">Giffy</h1>
          </Link>
        </header>

        <main className="App-content">
          <GifsContextProvider>
            <Route component={Home} path="/" />
            <Route component={SearchResults} path="/search/:keyword" />
            <Route component={Detail} path="/gif/:id" />
          </GifsContextProvider>
        </main>

        <footer className="App-footer">
          <p>
            Made with <span aria-label="amor">❤️</span> using React + Giphy API
          </p>
          <small>© {new Date().getFullYear()} Giffy - Portfolio Project</small>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;