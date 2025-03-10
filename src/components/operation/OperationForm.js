// OperationForm.jsx
import React, { useState } from "react";
import style from "./OperationForm.module.css";

function OperationForm({ onAddOperation }) {
  const [type, setType] = useState("credito"); // Valor por defecto
  const [cuota, setCuota] = useState(1);
  const [mes, setMes] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [gastos, setGastos] = useState("ingreso"); // Valor por defecto
  const [description, setLink] = useState("");
  const [errors, setErrors] = useState({}); // Para manejar errores de validación

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación básica
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El título es requerido.";
    if (!price.trim()) newErrors.price = "El precio es requerido.";
    if (!/^\d+(\.\d+)?$/.test(price))
      newErrors.price = "El precio debe ser un número válido."; // Valida que price sea numérico.
    if (cuota <= 0) newErrors.cuota = "La cuota debe ser mayor que cero";
    if (!description.trim()) newErrors.description = "El link es requerido";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Crear el nuevo objeto de operación
    const newOperation = {
      id: Date.now(), // ID único (usando la fecha/hora actual)
      type,
      cuota,
      setMes,
      title,
      price: parseFloat(price), // Convertir a número
      gastos,
      description,
    };

    // Llamar a la función pasada por prop (para agregar al estado principal)
    onAddOperation(newOperation);

    // Limpiar el formulario
    setType("credito");
    setCuota(1);
    setMes(true);
    setTitle("");
    setPrice("");
    setGastos("ingreso");
    setDescription("");
    setErrors({}); // Limpiar errores
  };

  const modifyType = (e) => {
    setType(e.target.value);
    if(e.target.value === "debito"){
      setCuota(1);
      setMes(true);
    }
  }


  return (
    <form className={style.operationForm} onSubmit={handleSubmit}>
      <h2>Agregar Nueva Operación</h2>

      <div className={style.formGroup}>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => modifyType(e)}>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>
      </div>

     {type === "credito" && (<div className={style.formGroup}>
        <label htmlFor="cuota">Cuota:</label>
        <input
          type="number"
          id="cuota"
          value={cuota}
          onChange={(e) => setCuota(parseInt(e.target.value, 10))}
        />
        {errors.cuota && <p className={style.errorMessage}>{errors.cuota}</p>}
        <div></div>
      </div>)}
      
      {type === "credito" && (<div className={style.formGroup}>
        <label htmlFor="mes">Mes de Ingreso:</label>
        <select
          id="mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}>
          <option value={true}>Este Mes</option>
          <option value={false}>Mes Que Viene</option>
        </select>
      </div>)}

      {console.log(mes)}
      {console.log(cuota)}

      <div className={style.formGroup}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className={style.errorMessage}>{errors.title}</p>}
      </div>


      <div className={style.formGroup}>
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className={style.errorMessage}>{errors.price}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="gastos">Gasto/Ingreso:</label>
        <select
          id="gastos"
          value={gastos}
          onChange={(e) => setGastos(e.target.value)}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
      </div>

      <div className={style.formGroup}>
        <label htmlFor="link">Descripcion:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.link && <p className={style.errorMessage}>{errors.link}</p>}
      </div>

      <div className={style.buttonGroup}>
        <button type="submit" className={style.submitButton}>
          Agregar Operación
        </button>
        <button
          type="return"
          className={style.returnButton}
          onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
    </form>
  );
}

export default OperationForm;
