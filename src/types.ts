interface UserCreateInput {
  name: string;
  phone: string;
  company?: string;
  email: string;
  skills?: [SkillCreateInput];
}
interface SkillCreateInput {
  skill: string;
  rating: number;
}

interface UserUpdateInput {
  name?: string;
  phone?: string;
  company?: string;
  email?: string;
  skills?: [SkillCreateInput];
}

export { UserCreateInput, SkillCreateInput, UserUpdateInput };
