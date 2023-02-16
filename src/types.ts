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

interface SkillFrequencyFilter {
  min?: number;
  max?: number;
}
interface SkillFrequency {
  skill: string;
  _count?: {
    _all?: number;
  };
}

export {
  UserCreateInput,
  SkillCreateInput,
  UserUpdateInput,
  SkillFrequencyFilter,
  SkillFrequency,
};
