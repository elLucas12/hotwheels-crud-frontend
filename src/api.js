import axios from "axios";

export const BASE_URL = "http://localhost:5000/cars";

/**
 * Envia uma requisição POST para adição de um carro à API
 * 
 * @param {Object} jsonData Dados em objeto representativo JSON
 * @param {nevet[]} data Array de objetos de dados da API
 * @param {React.Dispatch<React.SetStateAction<never[]>>} setData Função de subreescrita do array de dados da API
 */
export async function postCar(jsonData, data, setData) {
  try {
    const res = await axios.post(BASE_URL, jsonData);
    const newData = {...res.data, id: (data.length ? data[data.length-1].id + 1 : 1)};
    setData([...data, newData]);
  } catch (error) {
    console.error("Erro ao realizar requisição POST de atualização ", error);
  }
}

/**
 * Envia uma requisição DELETE para a remoção de um carro através de seu ID
 * 
 * @param {Number} carId Número de identificação do carro
 * @param {nevet[]} data Array de objetos de dados da API
 * @param {React.Dispatch<React.SetStateAction<never[]>>} setData Função de subreescrita do array de dados da API
 * @param {React.Dispatch<React.SetStateAction<never[]>>} setDeleteDialog Função de sobreescrita para definição do estado de remoção (Dialog)
 */
export function deleteCar(carId, data, setData, setDeleteDialog) {
  try {
    axios.delete(`${BASE_URL}/${carId}`).then(() => {
      if (setDeleteDialog !== null)
        setDeleteDialog(true);
      setData(data.filter((reg) => reg.id !== carId));
    });
  } catch (error) {
    console.error("Erro ao realizar requisição DELETE", error);
  }
}

/**
 * 
 * @param {Object} jsonData Dados em objeto representativo JSON
 * @param {nevet[]} data Array de objetos de dados da API
 * @param {React.Dispatch<React.SetStateAction<never[]>>} setData Função de subreescrita do array de dados da API
 */
export async function putCar(jsonData, data, setData) {
  try {
    const res = await axios.put(BASE_URL, jsonData);
    const newData = data.map(car => (res.data.id === car.id ? res.data.id : car));
    setData([...data, newData]);
  } catch (error) {
    console.error("Erro ao realizar requisição PUT de atualização ", error);
  }
}