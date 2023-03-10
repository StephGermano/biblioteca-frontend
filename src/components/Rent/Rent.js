import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import TableRent from "./TableRent";
import api from "../../services/api";

function Rent() {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState();
  const [bookId, setBookId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getClients();
    getBooks();
  }, []);

  async function registerRent() {
    await api
      .post("/rent", { clientId: parseInt(clientId), bookId: parseInt(bookId) })
      .then((r) => {
        console.log(r.data);
      });

    handleClose();
  }

  async function getClients() {
    await api.get("/client").then((r) => {
      setClients(r.data);
    });
  }

  async function getBooks() {
    await api.get("/book").then((r) => {
      setBooks(r.data);
    });
  }

  return (
    <div className="container mt-2">
      <Button variant="primary" onClick={handleShow} className="mb-2">
        Cadastrar Aluguel
      </Button>

      <TableRent att={show} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            onChange={(e) => setClientId(e.target.value)}
            value={clientId}
            aria-label="Default select example"
          >
            {clients.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </Form.Select>
          <Form.Select
            onChange={(e) => setBookId(e.target.value)}
            value={bookId}
            aria-label="Default select example"
            className="mt-1"
          >
            {books.map((b) => {
              if (!b.isRented) {
                return <option value={b.id}>{b.name}</option>;
              } else {
                return;
              }
            })}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={registerRent}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Rent;
