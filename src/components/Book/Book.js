import {
  Modal,
  Button,
  Form,
  InputGroup,
  Table,
  Container,
} from "react-bootstrap";

import {
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
  AiOutlineEdit,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Book() {
  const [show, setShow] = useState(false);
  const [modalshow, setModalShow] = useState(false);
  const [books, setBooks] = useState([]);
  const [name, setName] = useState();
  const [bookType, setBookType] = useState();
  const [dailyValue, setDailyValue] = useState();
  const [newDailyValue, setNewDailyValue] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickClose = () => setModalShow(false);
  const clickShow = () => setModalShow(true);

  useEffect(() => {
    getBooks();
  }, []);

  function clearInputs() {
    setName("");
    setBookType("");
    setDailyValue("");
    setNewDailyValue("");
  }

  async function getBooks() {
    await api.get("/book").then((r) => {
      setBooks(r.data);
    });
  }

  async function registerBook() {
    await api.post("/book", { name, bookType, dailyValue }).then((r) => {
      console.log(r.data);
    });
    clearInputs();
    handleClose();
  }

  async function updateDailyValue(id, dailyValue) {
    console.log(id);
    console.log(dailyValue);
    // await api
    //   .put("/book", {
    //     bookId: parseInt(bookId),
    //     dailyValue: parseInt(dailyValue),
    //   })
    //   .then((r) => {
    //     console.log(r.data);
    //   });
    // clearInputs();
    // clickClose();
  }

  return (
    <div className="container">
      <Button variant="primary" onClick={handleShow} className="mb-2">
        Cadastrar Livro
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Categoria"
              value={bookType}
              onChange={(e) => {
                setBookType(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Valor Diaria"
              value={dailyValue}
              onChange={(e) => {
                setDailyValue(e.target.value);
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={registerBook}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Table>
          <thead>
            <tr>
              <th>iD</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th colSpan={2}>Valor Diaria</th>
              <th>Alugado</th>
            </tr>
          </thead>
          <tbody>
            {books.map((e) => {
              if (e.isRented === true) {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.bookType}</td>
                    <td>{e.dailyValue}</td>
                    <td>
                      <Button variant="outline-primary" onClick={clickShow}>
                        <AiOutlineEdit />
                      </Button>
                      <Modal show={modalshow} onHide={clickClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Insira o novo valor </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3 mt-3">
                            <Form.Control
                              placeholder="R$ 00.00"
                              value={newDailyValue}
                              onChange={(e) => {
                                setNewDailyValue(e.target.value);
                              }}
                            />
                          </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={clickClose}>
                            Fechar
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              updateDailyValue(e.id, newDailyValue);
                            }}
                          >
                            Salvar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                    <td>{<AiOutlineCheckSquare />}</td>
                  </tr>
                );
              } else {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.bookType}</td>
                    <td>{e.dailyValue}</td>
                    <td>
                      <Button variant="outline-primary" onClick={clickShow}>
                        <AiOutlineEdit />
                      </Button>
                      <Modal show={modalshow} onHide={clickClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Insira o novo valor </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3 mt-3">
                            <Form.Control
                              placeholder="R$ 00.00"
                              value={newDailyValue}
                              onChange={(e) => {
                                setNewDailyValue(e.target.value);
                              }}
                            />
                          </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={clickClose}>
                            Fechar
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              updateDailyValue(e.id, newDailyValue);
                            }}
                          >
                            Salvar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                    <td>{<AiOutlineCloseSquare />}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Book;
