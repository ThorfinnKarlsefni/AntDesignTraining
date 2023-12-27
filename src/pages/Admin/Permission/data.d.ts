interface PermissionItem {
  id: string;
  parentId: number;
  name: string;
  slug?: string;
  httpMethod: string;
  httpPath: string;
  order: number;
  children: PermissionItem[];
  createdAt?: string;
}

interface PathOptions {
  id: string;
  name: string;
  path: string;
}
