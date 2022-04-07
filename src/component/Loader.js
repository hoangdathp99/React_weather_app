import ReactLoading from "react-loading";
import "../css/Loading.scss";
export default function Loader() {
  return (
    <div style={{ margin: "auto" }}>
      <ReactLoading type="spin" color="cyan" className="loading" />
    </div>
  );
}
