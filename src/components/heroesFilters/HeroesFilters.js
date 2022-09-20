import { useHttp } from "../../hooks/http.hook";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../actions";
import { setActiveFilter } from "./filtersSlice";


const HeroesFilters = () => {
   const { filters, activeFilter } = useSelector((state) => state.filters); //достаем состояние filters
   const dispatch = useDispatch();
   const { request } = useHttp();

   useEffect(() => {
      dispatch(fetchFilters(request));
   }, []);

   const renderFiltersList = (arr) => {
      if (arr.length === 0) {
         return <h5 className="text-center mt-5">Фильтров пока нет</h5>;
      }

      return arr.map((el) => (
         <button key={el.id} className={`btn ${el.class} ${activeFilter === el.name && "active"}`} onClick={() => dispatch(setActiveFilter(el.name))}>
            {el.label}
         </button>
      ));
   };

   const elements = useMemo(() => renderFiltersList(filters), [filters, activeFilter]);

   return (
      <div className="card shadow-lg mt-4">
         <div className="card-body">
            <p className="card-text">Отфильтруйте героев по элементам</p>
            <div className="btn-group">{elements}</div>
         </div>
      </div>
   );
};

export default HeroesFilters;
