import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './api/store';
import Header from './Header';
import NonProfits from './pages/NonProfit';
import EmailTemplate from './pages/EmailTemplate';
import SentEmails from './pages/SentEmails';
import { SnackbarProvider } from './context';
import Grants from './pages/Grants';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SnackbarProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/non-profits" replace />} />
            <Route path="/non-profits" element={<NonProfits />} />
            <Route path="/email-template" element={<EmailTemplate />} />
            <Route path="/sent-emails" element={<SentEmails />} />
            <Route path="/grants" element={<Grants />} />
          </Routes>
        </SnackbarProvider>
      </Router>
    </Provider>
  );
}

export default App;
