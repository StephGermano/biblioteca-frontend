import api from "../../services/api";
import { Table } from "react-bootstrap";
import "./TableRent.css";
import { useEffect, useState } from "react";
import moment from "moment";

function TableRent() {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    getRents();
  }, []);

  async function getRents() {
    api
      .get("/rent")
      .then((r) => {
        setRents(r.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="Container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Data Retorno</th>
            <th>Valor Diaria</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {rents.map((e) => {
            return (
              <tr>
                <td>{e.Book.name}</td>
                <td>{e.Client.name}</td>
                <td>{moment(e.dataRent).format("DD/MM/YYYY")}</td>
                <td>
                  {e.returnDate && moment(e.returnDate).format("DD/MM/YYYY")}
                </td>
                <td>{e.Book.dailyValue}</td>
                <td>{e.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableRent;
