import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Village } from './sections/Village';
import { JoinUs } from './sections/JoinUs';
import { FAQ } from './sections/FAQ';
import { CTABand } from './sections/CTABand';
import { Footer } from './sections/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function MainPage({ onApply }: { onApply: () => void }) {
  useSmoothScroll();
  return (
    <>
      <Hero onApply={onApply} />
      <About />
      <Village />
      <JoinUs onApply={onApply} />
      <FAQ />
      <CTABand onApply={onApply} />
      <Footer />
    </>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout onApply={() => navigate('/apply')}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MainPage onApply={() => navigate('/apply')} />
              </motion.div>
            }
          />
          <Route
            path="/apply"
            element={<WaitlistModal onClose={() => navigate('/')} />}
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
