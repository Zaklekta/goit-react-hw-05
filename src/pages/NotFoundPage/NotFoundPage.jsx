import css from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      Unfortunately, you encounter a non-existent or incorrect URL. The
      requested resource does not exist on the server.
    </div>
  );
};

export default NotFoundPage;
