import type { MenuFetchState } from "../types";

function Home({ menuItems, loading, error }: MenuFetchState) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Heim</h1>
      <p>Velkomin á Nordic Bites!</p>
      {menuItems.length > 0 && (
        <div>
          <h2>Matseðill</h2>
          <h3>{menuItems[0].name}</h3>
          <p>{menuItems[0].description}</p>
          <p>{menuItems[0].price}</p>
        </div>
      )}
    </div>
  );
}
export default Home;
