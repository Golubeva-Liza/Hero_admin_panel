import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetHeroesQuery } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";



const HeroesList = () => {
   // const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes);
   const { activeFilter } = useSelector((state) => state.filters);

   const {
      data: heroes2 = [],
      isFetching,//последюущие запросы
      isLoading,//первый запрос
      isSuccess,
      isError,
      error
   } = useGetHeroesQuery(); //useEffect, useSelector и useDispatch не нужны, все делается автоматически. запрос делается при моунтинге.


   const renderHeroesList = (arr) => {
      if (arr.length === 0) {
         return <h5 className="text-center mt-5">Героев пока нет</h5>;
      }

      let heroes = arr.filter((el) => activeFilter === "all" ? el : el.element == activeFilter);

      return heroes.map(({ id, ...props }) => {
         return <HeroesListItem key={id} id={id} {...props} />;
      });

   };

   const elements = useMemo(() => renderHeroesList(heroes2), [heroes2, activeFilter]);

   return (
      <>
         {isLoading ? <Spinner /> : null}
         {isError ? <h5 className="text-center mt-5">Ошибка загрузки</h5> : null}
         {!isLoading && !isError ?  <ul>{elements}</ul> : null}
      </>

   );
};

export default HeroesList;
