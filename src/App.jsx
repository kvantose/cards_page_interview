import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import CatPage from "./components/CatPage/CatPage.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/photo/:id" element={<CatPage />} />
      </Routes>
    </>
  );
}

export default App;
