interface MenuItem {
  id: number;
  name: string;
  parentId: number;
  order: number;
  path: string;
  hideInMenu: boolean;
  component: string;
}

interface MenuTree {
  id: number;
  parentId: number;
  name: string;
  order: number;
  hideInMenu: boolean;
  children: MenuTree[];
}

interface MenuTreeProps {
  menuTree: MenuTree[];
  refreshMenuTree: () => void;
  roleItems: any;
}

interface UpdateMenuTreeItem {
  parent: number;
  dropToGap: boolean;
  dropKey: number;
  dropPosition: number;
}

interface UpdateFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuTree: MenuTree[];
  roleItems: any;
  menuItem: MenuItem;
  refreshMenuTree: () => void;
}
