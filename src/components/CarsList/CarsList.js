import React from "react";
import CarsListStyle from "./CarsList.module.css";

export default function CarsList({listCarros, setListCarros, navigate}) {
  function removeCarro(carroIdx) {
    let auxListCarros = listCarros;
    auxListCarros.splice(carroIdx, 1);
    setListCarros(auxListCarros);
    alert("Carro \"" + carroIdx + "\" removido com sucesso!");
    navigate('/cars-list');
  }

  const listCarrosView = listCarros.map(
    (reg, idx) => {
      return (
        <li key={idx}>
          <a href="#" onClick={function (e) {e.preventDefault(); navigate('/car-detail?' + idx)}}>{reg[0]["value"]} - {reg[1]["value"]}</a>
          <button onClick={function (e) {e.preventDefault(); removeCarro(idx)}}>Excluir</button>
        </li>
      );
    }
  );
  return(
    <div>
      <div className="default-header">
        <h1>Lista de Carros</h1>
        <p>Estes são os carros registrados até o momento.</p>
      </div>
      <div className={CarsListStyle['CarsList-main']}>
        <ul>
          {listCarrosView}
        </ul>
      </div>
      <a href="#" onClick={function (e) {e.preventDefault(); navigate('/car-form?isSub')}}>Adicionar Carro</a>
    </div>
  );
}