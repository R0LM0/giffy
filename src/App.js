import React from 'react';
import { Route, useLocation } from 'wouter';
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import SearchResults from './pages/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import SearchHeader from './components/SearchHeader';
import { GifsContextProvider } from './context/GifsContext';

function App() {
  const [location] = useLocation();
  const isHome = location === '/';

  return (
    <ErrorBoundary>
      <div className="App">
        <SearchHeader showBack={!isHome} />
        
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