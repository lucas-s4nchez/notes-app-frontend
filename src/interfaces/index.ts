//!apiSlice
export interface IUser {
  ok: boolean;
  uid: string;
  username: string;
  token: string;
}
export interface ILoginCredentials {
  email: string;
  password: string;
}
export interface IRegisterCredentials {
  email: string;
  password: string;
  username: string;
}
export interface IAddNoteBody {
  title: string;
  content: string;
  date: number;
  user:
    | {
        username: string;
        uid: string;
      }
    | {};
}
export interface IUpdateNoteBody {
  _id: string;
  title: string;
  content: string;
  date: number;
  user: IUser;
}
export interface INote {
  _id: string;
  title: string;
  content: string;
  date: string;
  user: IUser;
}
//!Estados
export interface IUserInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: { username: string; uid: string } | {};
  token: string | null;
}
export interface IUiInitialState {
  isModalOpen: boolean;
  isDarkTheme: boolean;
}

//!Componentes
export interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export interface INavbarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}
export interface ISidebarProps {
  drawerWidth: number;
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
}

export interface ICardItemProps {
  _id: string;
  title: string;
  content: string;
  date: string;
  user: {};
}

//! Otras
export interface IChildrenProps {
  children: React.ReactNode;
}
export interface ICustomFetchBaseQueryError {
  status: number;
  data?: { ok: boolean; msg: string };
  error?: string;
}
