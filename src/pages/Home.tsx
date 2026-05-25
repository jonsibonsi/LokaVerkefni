import type { MenuFetchState } from "../types";

function Home({ menuItems, loading, error }: MenuFetchState) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our restaurant!</p>
      {menuItems.length > 0 && (
        <div>
          <h2>Featured Menu Item</h2>
          <h3>{menuItems[0].name}</h3>
          <p>{menuItems[0].description}</p>
          <p>{menuItems[0].price}</p>
        </div>
      )}
    </div>
  );
}
export default Home;
