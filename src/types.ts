export type MenuItem = {
  id: string;
  name: string;
  price: string;
  category: string;
  popular: boolean;
  description: string;
};

export type MenuFetchState = {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
};
