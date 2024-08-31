import React from "react";
import CarDetailStyle from './CarDetail.module.css';

export default function CarDetail({carroIdx, listCarros, setListCarros, navigate}) {
  let carro = listCarros[carroIdx];

  function editCarroInfo(aReg) {
    let newValue = prompt("Informe o novo valor do campo \"" + aReg['label'] + "\"");
    if (!(newValue == null)) {
      // Alteração do carro com o novo valor
      aReg['value'] = newValue;

      // Mapeamento e atualização do obj.
      let newCarro = carro.map(
        (reg, idx) => {
          if (reg['id'] === aReg['id']) {
            return aReg;
          } else {
            return reg;
          }
        }
      );

      // Remoção do elemento antigo & Definição no array de dados
      listCarros[carroIdx] = newCarro;
      setListCarros(listCarros);
    }
    navigate("/car-detail?" + carroIdx);
  }

  return(
    <div>
      <div className="default-header">
        <h1>Detalhes de Carro</h1>
        <p>Detalhes do Carro Índice "{carroIdx}"</p>
      </div>
      <div>
        <ul>
          {carro.map(
            (reg, idx) =>
            <li key={reg['id']}>
              <div>
                <b>{reg['label']}</b>{reg['value']}
              </div>
              <button onClick={function (e) {e.preventDefault(); editCarroInfo(reg)}}>Editar Campo</button>
            </li>
          )}
        </ul>
      </div>
      <a href="#" onClick={function (e) {e.preventDefault(); navigate('/cars-list')}}>Voltar para lista</a>
    </div>
  );
}