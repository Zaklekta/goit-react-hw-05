import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <>
      <p className={css.err}>Ooops.. Some error has occured.</p>
    </>
  );
};

export default ErrorMessage;
