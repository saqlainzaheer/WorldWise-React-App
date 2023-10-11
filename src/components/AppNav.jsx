import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/App/cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="/App/countries">Countries</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
