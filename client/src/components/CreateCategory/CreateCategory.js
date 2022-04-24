import { useState, useEffect } from "react";
import Axios from "axios";
import "./CreateCategory.css";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";
import CreateShore from "../CreateShore/CreateShore";
import Form from "../Form/Form";

function CreateCategory() {
  const meusItens = ["React", "Vue", "Angular"];
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [listaCategorias, setListaCategorias] = useState([]);

  const [novoNomeCategoria, setNovoNomeCategoria] = useState("");

  const [show, setShow] = useState(false);

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

      {/* <Form /> */}

      <div className="return">
        <Icon icon="bi:arrow-return-left" color="#aaa" width="32" />
      </div>

      <div className="form">
        {listaCategorias.map((val) => {
          return (
            <div>
              <div key={val.id_categoria} className="category">
                {show ? (
                  <div className="edit">
                    <input
                      placeholder={`${val.nome_categoria} ...`}
                      type="text"
                      id="updateInput-2"
                      onChange={(e) => {
                        setNovoNomeCategoria(e.target.value);
                      }}
                    />
                    <div className="edit">
                      <button
                        className="submit-change"
                        onClick={() => {
                          updateCategory(val.id_categoria);
                        }}
                      >
                        Change
                      </button>

                      <button
                        className="submit-cancel"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <h1>
                    {val.id_categoria} - {val.nome_categoria}{" "}
                  </h1>
                )}

                <div className="icon">
                  <div className="icon-edit">
                    <Icon
                      icon="fa6-solid:pen"
                      color="#aaa"
                      width="20"
                      cursor="pointer"
                      onClick={() => {
                        console.log(val.id_categoria);
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
                        deleteCategory(val.nome_categoria);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <CreateShore id={val.id_categoria} />
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
