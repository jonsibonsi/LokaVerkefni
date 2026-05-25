import type { MenuFetchState } from "../types";

function Menu({ menuItems, loading, error }: MenuFetchState) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Matseðill</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Menu;
