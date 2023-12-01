type Role = {
  id: string;
  name: string;
  normalizedName?: string;
  createdAt: string;
};

interface User {
  id: string;
  username: string;
  avatar?: string;
  createAt?: string;
  roles: Role[];
}

interface UserList {
  users: User[];
  total: number;
  pageSize: number;
  currentPage: number;
}

interface UpdateFormComponentProps {
  title: string;
  user: User;
  roleList: Role[];
}
