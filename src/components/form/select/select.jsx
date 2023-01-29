import styles from "./select.module.css";

function Select({ text, name, options, handleSelect, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handleSelect} value={value || ""}>
        <option>Selecione uma opção</option>
        {options.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
