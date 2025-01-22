import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../util";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("User Loggedout");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json();

      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser.toLocaleUpperCase()}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item) => (
            <ul key={item.id}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Home;
