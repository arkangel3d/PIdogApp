import { React } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

  return (
    <div>
      <nav>
        <div>
          <div>
            <Link to={"/registar"}>
              <p>Registrar Raza</p>
            </Link>
          </div>
          <div>
            <Link to={"/home"}>
              <p>Home</p>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
