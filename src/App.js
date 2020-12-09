import React from "react";
import Preloader from "./Preloader";
import "./App.css";

//хук с использованием useReducer без useRef
//для наглядной демонстрации необходимости useRef
//import usePreloader from "./hooks/v1_useReducerWithoutRef/usePreloader";

//хук с использованием useReducer с useRef - для обновления используется useEffect
//import usePreloader from "./hooks/v2_useReducerWithRef/usePreloader";

//хук с использованием useReducer с useRef - для обновления используется useLayoutEffect
//import usePreloader from "./hooks/v3_useReducerWithUseLayoutEffect/usePreloader";

//хук с использованием useState и useRef - для обновления useEffect
//import usePreloader from "./hooks/v4_useStateWithRef/usePreloader";

//хук с использованием useState и useRef - для обновления useLayoutEffect
//import usePreloader from "./hooks/v5_useStateWithUseLayoutEffect/usePreloader";

//хук с использованием генератора без промисов
//import usePreloader from "./hooks/v6_useReducerWithGenerator/usePreloader";

//хук с использованием генератора и for await
//import usePreloader from "./hooks/v7_useReducerWithGeneratorAwait/usePreloader";

//хук с использованием redux-saga 
//import usePreloader from "./hooks/v8_saga/usePreloader";

//хук с использованием хука useReducerWithSaga 
import usePreloader from "./hooks/v9_useReducerWithSaga/usePreloader";

export default function App() {
  usePreloader();
  return (
    <div className="App">
      <Preloader />
      <img
        alt="Картинка"
        src="https://c8.alamy.com/comp/HG6TM4/moraine-lake-is-a-glacially-fed-lake-in-banff-national-park-14-km-HG6TM4.jpg"
      />
      <img
        alt="Картинка"
        src="https://i.ytimg.com/vi/5rw3VbKL-FE/maxresdefault.jpg"
      />
      <img
        alt="Картинка"
        src="https://kaifolog.ru/uploads/posts/2016-03/1458036651_002.jpg"
      />
      <img
        alt="Картинка"
        src="https://million-wallpapers.ru/wallpapers/1/55/506744950768048/biryuzovyj-gornoe-ozero.jpg"
      />
      <img
        alt="Картинка"
        src="https://kaifolog.ru/uploads/posts/2016-03/1458036642_004.jpg"
      />
      <img
        alt="Картинка"
        src="https://img2.fonwall.ru/o/rx/lamborghini-lamborghini-aventador-cars-otjs.jpeg"
      />
      <img
        alt="Картинка"
        src="https://kaifolog.ru/uploads/posts/2016-03/thumbs/1458036716_006.jpg"
      />
      <img
        alt="Картинка"
        src="https://oboi.ws/filters/gotham_17_4681_oboi_ferrary_1920x1080.jpg"
      />
      <img
        alt="Картинка"
        src="https://kaifolog.ru/uploads/posts/2016-03/1458036705_011.jpg"
      />
      <img
        alt="Картинка"
        src="https://img3.goodfon.ru/wallpaper/nbig/6/87/lamborghini-aventador-lp700-4-3956.jpg"
      />
      <img
        alt="Картинка"
        src="https://wallpaperscave.com.ua/images/original/18/05-08/vehicles-cars-lamborghini-49386.jpg"
      />
      <img
        alt="Картинка"
        src="https://i.ytimg.com/vi/UVWb4p5pneU/maxresdefault.jpg"
      />
      <img
        alt="Картинка"
        src="https://oboi.ws/filters/vibrance_17_8671_oboi_lamborghini_gallardo_1920x1080.jpg"
      />
    </div>
  );
}
