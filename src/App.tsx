import { Layout } from './components/Layout';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Village } from './sections/Village';
import { JoinUs } from './sections/JoinUs';
import { FAQ } from './sections/FAQ';
import { CTABand } from './sections/CTABand';
import { Footer } from './sections/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <Layout>
      <Hero />
      <About />
      <Village />
      <JoinUs />
      <FAQ />
      <CTABand />
      <Footer />
    </Layout>
  );
}

export default App;
