import { useState, useEffect } from "react";
import type { MenuItem } from "../types";

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch(
          "https://6a1448dd6c7db8aac0543a10.mockapi.io/menu_items",
        );
        if (!response.ok) throw new Error("Network Error");
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown Error");
      } finally {
        setLoading(false);
      }
    }
    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
}
