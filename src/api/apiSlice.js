import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//объект - автоматически генерирует хуки на каждое наше действие, и reducer
export const apiSlice = createApi({
    reducerPath: 'api', //название reducer
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}), //функция, которая делает запрос
    tagTypes: ['Heroes'], //обозначили метки
    endpoints: builder => ({

        //запрос данных
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']//к какой метке относится запрос
        }), 

        //мутация данных
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']//если данные мутировали, то к чему обращаемся. 
            //Мы связали операции тэгами, поэтому они могут выполняться последовательно. После мутирования данных сразу получаем актуальные с сервера.
        }),

        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    }),//операции по базовому адресу (получение, удаление, отправка данных), описываем действия
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;