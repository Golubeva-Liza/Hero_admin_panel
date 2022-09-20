
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useMemo, useState } from "react";
import {
   addHero
} from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
   const { filters, filtersLoadingStatus } = useSelector((state) => state.filters);
   const dispatch = useDispatch();
   const { request } = useHttp();

   //элементы формы необязательно помещать в reducer, если не используются где-то еще. можно воспользоваться useState
   const [nameInput, setNameInput] = useState('');
   const [descrInput, setDescrInput] = useState('');
   const [elemInput, setElemInput] = useState('');

   
   const onSubmitForm = () => {
      if (!nameInput || !descrInput || elemInput === 'default'){
         return;
      }

      const newHero = {
         id: uuidv4(),
         name: nameInput,
         description: descrInput,
         element: elemInput
      };

      request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
         .then(() => dispatch(addHero(newHero)))
         .then(() => {
            setNameInput('');
            setDescrInput('');
            setElemInput('default');
         })
   }

   const renderFiltersList = (arr) => {
      if (filtersLoadingStatus === "loading") {
         return <option>Загрузка элементов</option>;
      } else if (filtersLoadingStatus === "error") {
         return <option>Ошибка загрузки</option>;
      }

      if (arr && arr.length > 0){
         return arr.map(el => {
            if (el.name !== 'all'){
               return <option key={el.id} value={el.name}>{el.label}</option>
            }
         })
      }
   };

   const filtersElems = useMemo(() => renderFiltersList(filters), [filters, filtersLoadingStatus]);

   return (
      <form className="border p-4 shadow-lg rounded" onSubmit={e => e.preventDefault()}>
         <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
               Имя нового героя
            </label>
            <input
               required
               type="text"
               name="name"
               className="form-control"
               id="name"
               placeholder="Как меня зовут?"
               value={nameInput}
               onChange={(e) => setNameInput(e.target.value)}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="text" className="form-label fs-4">
               Описание
            </label>
            <textarea
               required
               name="text"
               className="form-control"
               id="text"
               placeholder="Что я умею?"
               style={{ height: "130px" }}
               value={descrInput}
               onChange={(e) => setDescrInput(e.target.value)}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="element" className="form-label">
               Выбрать элемент героя
            </label>
            <select
               required
               className="form-select"
               id="element"
               name="element"
               value={elemInput}
               onChange={(e) => setElemInput(e.target.value)}
            >
               <option value="default">Я владею элементом...</option>
               {filtersElems}
            </select>
         </div>

         <button type="submit" className="btn btn-primary" onClick={onSubmitForm}>
            Создать
         </button>
      </form>
   );
};

export default HeroesAddForm;
