import { omit } from 'lodash-es';

interface NavItem {
  text?: string;
  path?: string;
  link?: string;
  items?: NavItem[];
  activeMatch?: string;
}

export function createNavbar(data: NavItem[], parentPaths: string[] = []): NavItem[] {
  const navbar: NavItem[] = [];

  for (const topItem of data) {
    const { path, items } = topItem;
    const newItem: NavItem = { text: topItem.text };
    if (items?.[0]?.path) {
      newItem.items = createNavbar(items, [...parentPaths, path!]);
    } else {
      const newPath = joinPaths(...parentPaths, path ?? '');
      newItem.activeMatch = newPath;;
      newItem.link = getFirstChild(topItem, newPath);
    }
    navbar.push(newItem);
  }

  return navbar;
}

export function createSidebar(data: NavItem[]): NavItem[] {
  const sidebarTops = createSidebarTops(data);
  const sidebars = createSidebarPath(sidebarTops);
  const result: any = {}

  for (const item of sidebars) {
    const { path, items } = item;
    result[path!] = items;
  }
  
  return result;
}

function createSidebarTops(
  data: NavItem[],
  parentPaths: string[] = [],
  level: number = 0
): NavItem[] {
  return data.reduce<NavItem[]>((acc, item) => {
    if (!item) return acc;
    
    const { path, items } = item;
    const currentParentPaths = [...parentPaths.slice(0, level), path] as string[];
    
    if (!items?.[0]?.path) {
      // 叶子节点
      const newPath = joinPaths(...currentParentPaths);
      acc.push({ ...item, path: newPath, items });
    } else {
      // 非叶子节点，递归处理
      acc.push(...createSidebarTops(items, currentParentPaths, level + 1));
    }
    
    return acc;
  }, []);
}

function createSidebarPath(sidebarTops: NavItem[]): NavItem[] {
  return sidebarTops.map(item => {
    const { path, items } = item;
    const newItem = { ...item, path };
    if (items) {
      newItem.items = generateAbsolutePath(items, [path]);
    }
    return newItem;
  });
}

function generateAbsolutePath(sidebarTops, parentPaths: any[] = []) {
  const result: any[] = []
  for (const item of sidebarTops) {
    const { link, items } = item
    const isLast = !items || items.length === 0
    const newItem: NavItem = {
      ...omit(item, 'link'),
      ...(isLast ? { link: joinPaths(...parentPaths, link) } : {}),
    }
    result.push(newItem)
    if (items) {
      newItem.items = generateAbsolutePath(items, [...parentPaths, link])
    }
  }

  return result
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

  return joinPaths(...paths);
}

function joinPaths(...parts: (string)[]): string {
  return parts.join('/').replace(/\/+/g, '/');
}

