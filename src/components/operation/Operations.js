import React from "react";
import styles from "./Operations.module.css";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

const Operation = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // ... alguna lógica (por ejemplo, validación) ...
    navigate("/operationForm"); // Redirige a la ruta del formulario
  };

  return (
    <div>
      <Nav />
      <div className={styles.bodyItems}>
        <button className={styles.addButton} onClick={handleClick}>
          + Agregar operacion
        </button>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li
              key={item.id}
              className={
                item.gastos === "ingreso"
                  ? styles.itemIngreso
                  : styles.itemEgreso
              }>
              {/*<img
                        src={item.image}
                        alt={item.title}
                        className={styles.itemImage}
                    />*/}
              <div className={styles.itemDetails}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {item.gastos === "ingreso" ? (
                  <p className={styles.itemPrice}>+ ${item.price}</p>
                ) : (
                  <p className={styles.itemPrice}>- ${item.price}</p>
                )}

                <a href={item.link} className={styles.itemLink}>
                  Ver detalle
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Operation;
