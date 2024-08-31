import React, { useState } from "react";
import CarFormStyle from "./CarForm.module.css";

export default function CarForm({setListCarros, listCarros, isSub=false, navigate=undefined}) {
  if(isSub && navigate == null)
    throw Error("Expected 'navigate' prop when 'isSub=true'!");

  const formArray = [
    {id: 0, name: "nome", value: "", type: "text", label: "Nome:"},
    {id: 1, name: "marca", value: "", type: "text", label: "Marca:"},
    {id: 2, name: "cor", value: "", type: "text", label: "Cor:"},
    {id: 3, name: "ano", value: new Date().getFullYear(), type: "number", label: "Ano:"}
  ];

  const [carro, setCarro] = useState(formArray);

  function recordCarro(e) {
    e.preventDefault();
    setListCarros([...listCarros, carro]);
    setCarro(formArray);
    alert("Carro adicionado com sucesso!");
    if (isSub) navigate('/cars-list');
  }

  function handleCarro(e, aId) {
    let carroAux = carro.map(
      (reg, idx) => {
        if (reg['id'] === aId) {
          return { ...reg, value: e.target.value };
        } else {
          return reg;
        }
      }
    );
    setCarro(carroAux);
  }

  return(
    <div>
      <div className="default-header">
        <h1>Adicionar Carro</h1>
        <p>Preencha para adicionar um novo carro HotWheels</p>
      </div>
      <form className={CarFormStyle['CarForm-form']} onSubmit={recordCarro}>
        {carro.map(
          (reg, idx) =>
          <div key={reg.id}>
            <label>{reg.label}<input name={reg.nome} id={reg.id} value={reg.value} onChange={(e) => handleCarro(e, reg.id)} type={reg.type} required={true} /></label>
          </div>
        )}
        <button type="submit">Adicionar</button>
        { isSub ? <a href="#" onClick={function (e) {e.preventDefault(); navigate('/cars-list')}}>Cancelar</a> : "" }
      </form>
    </div>
  );
}