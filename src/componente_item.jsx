import React, { useState } from "react";
import "./item.css";

const ComponenteItem = ({ imagem , nome , artista }) =>{
   const [isVisible, setIsVisible] = useState(true);

   const removeComponent = () => {
      setIsVisible(false);
   };

   return (
      isVisible && (
         <div className="caixaItem">
            <img src={imagem} alt="" width="50" />
            <p className='limite-characteres'>{nome}</p>
            <p className='limite-characteres'>{artista}</p>
            <button onClick={removeComponent}>excluir</button>
            
         </div>
      )
   );
}

export default ComponenteItem;