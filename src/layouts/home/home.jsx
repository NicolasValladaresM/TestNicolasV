import Navbar from "../../components/navbar/navbar";
import InfoUser from "./info/infoUser";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <InfoUser />
    </div>
  );
};

export default Home;
