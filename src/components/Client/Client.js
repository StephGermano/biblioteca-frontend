import {
  Modal,
  Container,
  Table,
  InputGroup,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import api from "../../services/api";

function Client() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [contato, setContato] = useState();
  const [newContato, setNewContato] = useState();
  const [email, setEmail] = useState();
  const [newEmail, setNewEmail] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalshow, setModalShow] = useState(false);
  const clickClose = () => setModalShow(false);
  const clickShow = () => setModalShow(true);

  useEffect(() => {
    getClients();
  }, []);

  function clearInputs() {
    setName("");
    setCpf("");
    setContato("");
    setEmail("");
    setNewContato("");
    setNewEmail("");
  }

  async function getClients() {
    await api.get("/client").then((r) => {
      setClients(r.data);
    });
  }

  async function registerClient() {
    await api.post("/client", { name, cpf, contato, email }).then((r) => {
      console.log(r.data);
    });
    clearInputs();
    getClients();
  }

  async function updateContact(id, contactUpdate) {
    await api
      .put("/clientUpdateContact", { id, contato: contactUpdate })
      .then((r) => {
        console.log(r.data);
      });
    clearInputs();
    handleClose();
    getClients();
  }

  async function updateEmail(id, email) {
    await api.put("/clientUpdateEmail", { id, email }).then((r) => {
      console.log(r.data);
    });
    clearInputs();
    clickClose();
    getClients();
  }

  return (
    <div className="Container">
      <Container>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Cadastro de Cliente</Accordion.Header>
            <Accordion.Body>
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
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  placeholder="Telefone para contato"
                  value={contato}
                  onChange={(e) => {
                    setContato(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </InputGroup>
              <Button onClick={registerClient}>Cadastrar</Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tabelas de Cliente</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nome</th>
                      <th>Cpf</th>
                      <th colSpan={2}>Contato</th>
                      <th colSpan={2}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((e) => {
                      return (
                        <tr>
                          <td>{e.id}</td>
                          <td>{e.name}</td>
                          <td>{e.cpf}</td>
                          <td>{e.contato}</td>
                          <td>
                            <Button
                              onClick={handleShow}
                              variant="outline-primary"
                            >
                              <AiOutlineEdit />
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Insira o novo número de contato
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <InputGroup className="mb-3 mt-3">
                                  <Form.Control
                                    placeholder="48 9 99999999"
                                    value={newContato}
                                    onChange={(e) => {
                                      setNewContato(e.target.value);
                                    }}
                                  />
                                </InputGroup>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Fechar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    updateContact(e.id, newContato);
                                  }}
                                >
                                  Salvar
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                          <td>{e.email}</td>
                          <td>
                            <Button
                              onClick={clickShow}
                              variant="outline-primary"
                            >
                              <AiOutlineEdit />
                            </Button>
                            <Modal show={modalshow} onHide={clickClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Insira o novo número de contato
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <InputGroup className="mb-3 mt-3">
                                  <Form.Control
                                    placeholder="novoEmail@new.com.br"
                                    value={newEmail}
                                    onChange={(e) => {
                                      setNewEmail(e.target.value);
                                    }}
                                  />
                                </InputGroup>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={clickClose}
                                >
                                  Fechar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    updateEmail(e.id, newEmail);
                                  }}
                                >
                                  Salvar
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}

export default Client;
