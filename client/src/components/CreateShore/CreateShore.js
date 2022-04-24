import { useState, useEffect } from "react";
import Axios from "axios";
import "./CreateShore.css";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";

function CreateShore({ id }) {
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [listaTarefas, setListaTarefas] = useState([]);

  const [novoNomeTarefa, setNovoNomeTarefa] = useState("");

  const [descricao, setDescricao] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/tarefas").then((response) => {
      setListaTarefas(response.data);
    });
  });

  const submitShore = () => {
    Axios.post("http://localhost:3001/api/insert/tarefas", {
      nomeTarefa: nomeTarefa,
    });
    setListaTarefas([...listaTarefas, { nomeTarefa: nomeTarefa }]);
  };

  const deleteShore = (titulo_tarefa) => {
    Axios.delete(`http://localhost:3001/api/delete/tarefas/${titulo_tarefa}`);
  };

  const updateShore = (id_tarefa) => {
    Axios.put(`http://localhost:3001/api/update/tarefas`, {
      nomeTarefa: novoNomeTarefa,
      descricao: novaDescricao,
      categoria: novaCategoria,
      id_tarefa: id_tarefa,
    }).then((response) => {
      setListaTarefas(
        listaTarefas.map((val) => {
          return val.id_tarefa == id_tarefa
            ? {
                id_tarefa: val.id,
                titulo_tarefa: val.novoNomeTarefa,
              }
            : val;
        })
      );
    });

    setNovoNomeTarefa("");
  };

  return (
    <div>
      <div>
        {listaTarefas.map((val, index) => {
          if (id == val.categoria_tarefa) {
            return (
              <div key={index} className="card-tarefa">
                {show ? (
                  <div className="organize">
                    <input
                      placeholder="Rename the shore..."
                      type="text"
                      id="updateInput"
                      onChange={(e) => {
                        setNovoNomeTarefa(e.target.value);
                      }}
                    />
                    <input
                      placeholder="Description..."
                      type="text"
                      id="updateInput"
                      onChange={(e) => {
                        setNovaDescricao(e.target.value);
                      }}
                    />
                    <input
                      placeholder="Which category belongs..."
                      type="text"
                      id="updateInput"
                      onChange={(e) => {
                        setNovaCategoria(e.target.value);
                      }}
                    />
                    <div>
                      <button
                        onClick={() => {
                          updateShore(val.id_tarefa);
                        }}
                      >
                        Confirm
                      </button>

                      <button
                        className="close-modal"
                        onClick={(id_tarefa) => {
                          console.log(val.id_tarefa);
                          setShow(!show);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="organize">
                    <input id="checkbox" type="checkbox" />

                    <p className="nome-tarefa">{val.titulo_tarefa}</p>
                    <p className="descricao">{val.descricao_tarefa}</p>
                    <p className="date">{val.data_tarefa}</p>
                  </div>
                )}

                <div className="icon">
                  <div className="icon-edit">
                    <Icon
                      icon="fa6-solid:pen"
                      color="#aaa"
                      width="20"
                      cursor="pointer"
                      onClick={() => {
                        setShow(!show);
                      }}
                    />
                  </div>

                  <div>
                    <Icon
                      icon="codicon:trash"
                      color="#aaa"
                      width="30"
                      cursor="pointer"
                      onClick={() => {
                        deleteShore(val.titulo_tarefa);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>
        {/* <div className="create-">
          <input
            placeholder="Nova Tarefa..."
            type="text"
            name="nomeTarefa"
            onChange={(e) => {
              setNomeTarefa(e.target.value);
            }}
            required
          />

          <button className="submit" onClick={submitShore}>
            + New
          </button>
        </div> */}
      </div>
      {/* <div className="form">
        {listaTarefas.map((val, index) => {
          return (
            <div key={index} className="category">
              <h1>{val.titulo_tarefa} </h1>
              <h1>{val.descricao_tarefa} </h1>
              <h1>{val.categoria_tarefa} </h1>
              <div>
                <input
                  placeholder="Rename the shore..."
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNovoNomeTarefa(e.target.value);
                  }}
                />
                <input
                  placeholder="Description..."
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNovaDescricao(e.target.value);
                  }}
                />
                <input
                  placeholder="Which category belongs..."
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNovaCategoria(e.target.value);
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      updateShore(val.id_tarefa);
                    }}
                  >
                    Confirm
                  </button>

                  <button className="close-modal">Cancel</button>
                </div>
              </div>
              <div className="icon">
                <div className="icon-edit">
                  <Icon
                    icon="fa6-solid:pen"
                    color="#aaa"
                    width="20"
                    cursor="pointer"
                  />
                </div>

                <div>
                  <Icon
                    icon="codicon:trash"
                    color="#aaa"
                    width="30"
                    cursor="pointer"
                    onClick={() => {
                      deleteShore(val.titulo_tarefa);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>*/}
    </div>
  );
}

export default CreateShore;
