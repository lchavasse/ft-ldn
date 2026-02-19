import { Layout } from './components/Layout';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { London } from './sections/London';
import { GetInvolved } from './sections/GetInvolved';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <Layout>
      <Hero />
      <Manifesto />
      <London />
      <GetInvolved />
    </Layout>
  );
}

export default App;