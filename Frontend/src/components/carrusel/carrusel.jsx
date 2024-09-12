// En '../components/carrusel.jsx'
import Carousel from "react-bootstrap/Carousel";
import "./carrusel.css";

export const CarruselUno = () => (
  <div className="contenedorCarrusel">
    <Carousel className="carrusel">
      <Carousel.Item>
        <img className="d-block w-100 rounded" src="/img/img1.png" alt="first slide" />
        <Carousel.Caption>
          <h3>SHOW ROOM</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 rounded " src="/img/img3.png" alt="Second slide" />
        <Carousel.Caption>
          <h3>VESTIMENTA</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 rounded " src="/img/img2.png" alt="third slide" />
        <Carousel.Caption>
          <h3>VARIEDAD</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);
