import "./Form.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function Form() {
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [listaTarefas, setListaTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [dataTarefa, setDataTarefa] = useState("");
  const submitShore = () => {
    Axios.post("http://localhost:3001/api/insert/tarefas", {
      nomeTarefa: nomeTarefa,
      descricao: descricao,
      categoria: categoria,
      dataTarefa: dataTarefa,
    });
    setListaTarefas([
      ...listaTarefas,
      {
        nomeTarefa: nomeTarefa,
        descricao: descricao,
        categoria: categoria,
        dataTarefa: dataTarefa,
      },
    ]);
  };

  return (
    <div className="create-box">
      <p>Create a new Shore</p>
      <div className="create-shore">
        <input
          type="date"
          onChange={(e) => {
            setDataTarefa(e.target.value);
          }}
        />
        <input
          placeholder="Title..."
          type="text"
          id="updateInput"
          onChange={(e) => {
            setNomeTarefa(e.target.value);
          }}
        />
        <input
          placeholder="Description..."
          type="text"
          id="updateInput"
          onChange={(e) => {
            setDescricao(e.target.value);
          }}
        />
        <input
          placeholder="Category..."
          type="text"
          id="updateInput"
          onChange={(e) => {
            setCategoria(e.target.value);
          }}
        ></input>
      </div>

      <button className="submit" onClick={submitShore}>
        + New{" "}
      </button>
    </div>
  );
}

export default Form;
