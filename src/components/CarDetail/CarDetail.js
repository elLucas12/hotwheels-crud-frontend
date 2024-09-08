import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { BASE_URL } from "../../api";

import CarDetailStyle from './CarDetail.module.css';

export default function CarDetail({carroIdx, listCarros, setListCarros}) {
  const navigate = useNavigate();
  const { data, loading, error } = useApi(BASE_URL);

  let carro = listCarros[carroIdx];

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
              <button onClick={function (e) {e.preventDefault(); }}>Editar Campo</button>
            </li>
          )}
        </ul>
      </div>
      <a href="#" onClick={function (e) {e.preventDefault(); navigate('/cars-list')}}>Voltar para lista</a>
    </div>
  );
}