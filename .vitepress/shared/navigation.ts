interface NavItem {
  text: string;
  path?: string;
  link?: string;
  items?: NavItem[];
  activeMatch?: string;
}

interface SidebarItem {
  text?: string;
  path?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

interface SidebarGroup {
  path: string;
  items: SidebarItem[];
}

type Sidebar = Record<string, SidebarItem[]>;

export function createNavbar(data: NavItem[]): NavItem[] {
  const navbar: NavItem[] = [];

  for (const topItem of data) {
    const { path, text, items } = topItem ?? {};
    if (path && items) {
      const navItem: NavItem = { text, items: [] };
      for (const item of items!) {
        navItem.items!.push({
          text: item.text,
          activeMatch: joinPaths(topItem.path || '', item.path || ''),
          path: getFirstChild(item, topItem.path || ''),
        });
      }
      navbar.push(navItem);
    } else {
      navbar.push({ text, path });
    }
  }

  return navbar;
}

export function createSidebar(data: NavItem[]): Sidebar {



  const sidebarTops: SidebarGroup[] = [];


  

  // const result: Sidebar = {};
  for (const sidebarItem of sidebars) {
    const { path, items } = sidebarItem;
    if (!result[path]) {
      result[path] = items;
    } else {
      result[path].push(...items);
    }
  }
  return result;
}

function createSidebarTopItem(item): SidebarItem {

  // return paths;
}

function createSidebarItem(navItem: NavItem): string {

}

function joinPaths(...parts: (string)[]): string {
  return parts.join('/').replace(/\/+/g, '/');
}

function getFirstChild(topItem: NavItem | undefined, ...prefix: string[]): string {
  if (!topItem) return '';
  
  let current: NavItem = topItem;
  const paths: string[] = [...prefix];
  
  while (current.items && current.items.length > 0) {
    if (current.link) {
      paths.push(current.link);
    }
    current = current.items[0];
  }

  if (current.link) {
    paths.push(current.link);
  }

  return paths.join('/').replace(/\/+/g, '/').replace(/^\//, '');
}

function createFlatLink(items: SidebarItem[], paths: string[]): SidebarItem[] {
  const result: SidebarItem[] = [];

  for (const item of items) {
    const newItem: SidebarItem = {
      ...item,
      link: joinPaths(...paths, item.link || ''),
    };
    if (item.items) {
      newItem.items = createFlatLink(item.items, [...paths, item.link || '']);
    }

    result.push(newItem);
  }
  return result;
}
