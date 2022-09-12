import { useHttp } from "../../hooks/http.hook";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
   heroesFetching,
   heroesFetched,
   heroesFetchingError,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";


const HeroesList = () => {
   const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes);
   const { activeFilter } = useSelector((state) => state.filters);
   const dispatch = useDispatch();
   const { request } = useHttp();

   useEffect(() => {
      dispatch(heroesFetching());
      request("http://localhost:3001/heroes")
         .then((data) => dispatch(heroesFetched(data)))
         .catch(() => dispatch(heroesFetchingError()));
   }, []);


   const renderHeroesList = (arr) => {
      if (heroesLoadingStatus === "loading") {
         return <Spinner />;
      } else if (heroesLoadingStatus === "error") {
         return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
      }

      if (arr.length === 0) {
         return <h5 className="text-center mt-5">Героев пока нет</h5>;
      }

      let heroes = arr.filter((el) => activeFilter === "all" ? el : el.element == activeFilter);

      return heroes.map(({ id, ...props }) => {
         return <HeroesListItem key={id} id={id} {...props} />;
      });

   };

   const elements = useMemo(() => renderHeroesList(heroes), [heroes, heroesLoadingStatus, activeFilter]);

   return (
      <ul>{elements}</ul>
   );
};

export default HeroesList;
