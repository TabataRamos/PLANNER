import { useState, useEffect } from "react";
import Axios from "axios";
import "./CreateCategory.css";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";
import CreateShore from "../CreateShore/CreateShore";

function CreateCategory() {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [listaCategorias, setListaCategorias] = useState([]);

  const [novoNomeCategoria, setNovoNomeCategoria] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setListaCategorias(response.data);
    });
  });

  const submitCategory = () => {
    Axios.post("http://localhost:3001/api/insert", {
      nomeCategoria: nomeCategoria,
    });
    setListaCategorias([...listaCategorias, { nomeCategoria: nomeCategoria }]);
  };

  const deleteCategory = (nome_categoria) => {
    Axios.delete(`http://localhost:3001/api/delete/${nome_categoria}`);
  };

  const updateCategory = (id_categoria) => {
    Axios.put(`http://localhost:3001/api/update`, {
      nomeCategoria: novoNomeCategoria,
      id_categoria: id_categoria,
    }).then((response) => {
      setListaCategorias(
        listaCategorias.map((val) => {
          return val.id_categoria == id_categoria
            ? {
                id_categoria: val.id,
                nome_categoria: val.novoNomeCategoria,
              }
            : val;
        })
      );
    });

    setNovoNomeCategoria("");
  };

  return (
    <div className="App">
      <h1>PLANNER ORIENTATION</h1>

      <div className="return">
        <Icon icon="bi:arrow-return-left" color="#aaa" width="32" />
      </div>

      <CreateShore />
      <div className="form">
        {listaCategorias.map((val) => {
          return (
            <div key={val.id_categoria} className="category">
              <h1>
                {val.id_categoria} - {val.nome_categoria}{" "}
              </h1>
              <div>
                <input
                  placeholder="Rename the category..."
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNovoNomeCategoria(e.target.value);
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      updateCategory(val.id_categoria);
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
                      deleteCategory(val.nome_categoria);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="create-category">
          <input
            placeholder="Type here a new category..."
            type="text"
            name="nomeCategoria"
            onChange={(e) => {
              setNomeCategoria(e.target.value);
            }}
            required
          />
          <button className="submit" onClick={submitCategory}>
            + New
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
