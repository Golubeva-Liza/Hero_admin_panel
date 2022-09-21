import { useHttp } from "../../hooks/http.hook";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

import {
   deleteHero
} from "../heroesList/heroesSlice";

import { useDeleteHeroMutation } from "../../api/apiSlice";


const HeroesListItem = ({ id, name, description, element = "default"}) => {

   const [deleteHero] = useDeleteHeroMutation();

   let elementClassName = useMemo(() => ({
      fire: "bg-danger bg-gradient",
      water: "bg-primary bg-gradient",
      wind: "bg-success bg-gradient",
      earth: "bg-secondary bg-gradient",
      default: "bg-warning bg-gradient"
   }), []);

   
   const deletingHero = () => {
      deleteHero(id);
   }

   return (
      <li
         className={`card flex-row mb-4 shadow-lg text-white ${elementClassName[element]}`}
      >
         <img
            src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
            className="img-fluid w-25 d-inline"
            alt="unknown hero"
            style={{ objectFit: "cover" }}
         />
         <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">{description}</p>
         </div>
         <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
            <button
               type="button"
               className="btn-close"
               aria-label="Close"
               onClick={deletingHero}
            ></button>
         </span>
      </li>
   );
};

export default HeroesListItem;
