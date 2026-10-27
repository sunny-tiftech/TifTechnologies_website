import { Component, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { AuthProvider, ProtectedRoute } from "@/lib/AuthContext";
import { ContentProvider } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import CaseStudy from "@/pages/CaseStudy";
import Contact from "@/pages/Contact";
import CustomPage from "@/pages/CustomPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminEnquiries from "@/pages/AdminEnquiries";
import AdminContent from "@/pages/AdminContent";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F8FB] text-slate-600">
          <p>Something went wrong.</p>
          <button
            className="rounded-full bg-[#1E1A5E] px-5 py-2 text-sm font-semibold text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SmoothScroll() {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ContentProvider>
            <SmoothScroll />
            <div className="min-h-screen overflow-x-clip bg-[#F7F8FB] text-slate-600">
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:slug" element={<CaseStudy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/p/:slug" element={<CustomPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedRoute>
                      <AdminEnquiries />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/content"
                  element={
                    <ProtectedRoute>
                      <AdminContent />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </div>
          </ContentProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position="bottom-right" theme="light" richColors closeButton />
    </ErrorBoundary>
  );
}

export default App;
