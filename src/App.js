import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Home } from "./pages/Home";
import { CollectionEdit, CollectionIndex, CollectionNew, CollectionView } from "./pages/Collection";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

import "./style/defaults/variables.css"
import "./style/defaults/page-setup.css"
import "./style/defaults/transitions.css"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="collection">
            <Route index element={<CollectionIndex />} />
            <Route path="new" element={<CollectionNew />} />
            <Route path=":id">
              <Route index element={<CollectionView />} />
              <Route path="edit" element={<CollectionEdit />} />
            </Route>
          </Route>
        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
