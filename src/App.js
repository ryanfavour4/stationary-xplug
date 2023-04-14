import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StationeriesGrid from "./components/Apps/StationeryItems/StationeriesGrid";

const App = () => {
  return (
    <Container className="p-3">
      <Container className="p-2 mb-4 bg-light rounded-3 text-center">
        <h1 className="header">List of Stationery Items</h1>
      </Container>
      <StationeriesGrid />
    </Container>
  );
};

export default App;
