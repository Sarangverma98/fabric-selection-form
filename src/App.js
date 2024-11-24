import FormPage from "./components/FormPage";
import { Routes, Route } from "react-router-dom";
import FormData from "./pages/FormData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/form-data" element={<FormData />} />
      </Routes>
    </div>
  );
}

export default App;
