interface PermissionItem {
  id: string;
  parentId: string;
  name: string;
  slug?: string;
  httpMethod: string;
  httpPath: string;
  order: number;
  createdAt?: string;
}

interface PathOptions {
  id: string;
  name: string;
  path: string;
}
