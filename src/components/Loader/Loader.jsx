import { Blocks } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Blocks
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loader;
