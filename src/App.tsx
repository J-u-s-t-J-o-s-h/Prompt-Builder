import { ClientProvider } from './store/clientStore';
import { Layout } from './components/Layout';
import { ClientList } from './components/ClientList';
import { IntakeForm } from './components/intake/IntakeForm';
import { OutputPanel } from './components/OutputPanel';

function App() {
  return (
    <ClientProvider>
      <Layout
        leftPanel={<ClientList />}
        centerPanel={<IntakeForm />}
        rightPanel={<OutputPanel />}
      />
    </ClientProvider>
  );
}

export default App;
