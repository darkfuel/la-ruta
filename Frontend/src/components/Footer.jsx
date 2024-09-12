import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: " rgba(235, 235, 235, 0.778)" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Siguenos en redes sociales:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon fas icon="bicycle" className="me-3" />
                La Ruta
              </h6>
              <p>
                Somo una tienda especializada en bicicletas y repuestos de alta
                calidad, ofreciendo asesoramiento experto y productos de marcas
                líderes para ciclistas de todos los niveles.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Categorías</h6>
              <p>
                <a href="#!" className="text-reset">
                  Bicicletas
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Cadenas
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Cascos
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Accesorios
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Santiago, Chile
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Contacto@laruta.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 56 9 2345 5678
              </p>
              <p>
                <MDBIcon fab icon="instagram" className="me-3" /> @laRuta
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          LaRuta.com
        </a>
      </div>
    </MDBFooter>
  );
}
