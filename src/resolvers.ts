import { context } from "./context.js";
import {
  SkillFrequencyFilter,
  UserCreateInput,
  UserUpdateInput,
} from "./types.js";

const allUserResolver = (parent, args, contextValue) => {
  return context.prisma.user.findMany();
};

const userResolver = (parent, args, contextValue) => {
  return context.prisma.user.findFirst({
    where: {
      uid: {
        equals: args.uid,
      },
    },
    include: {
      skills: true,
    },
  });
};

const skillsResolver = (parent, args, contextValue) => {
  return context.prisma.skill.findMany();
};
const skillFrequencyResolver = async (
  parent,
  args: { filter: SkillFrequencyFilter },
  contextValue
) => {
  let tmp = await context.prisma.skill.groupBy({
    by: ["skill"],
    _count: {
      _all: true,
    },
  });
  //prisma can't filter on the _all field "can only filter on field available in by filed"
  //js filter instead implemented/but could also use raw sql here to run the query if it needs to be as performant as possible
  if (args.filter) {
    console.log("hi");
    tmp = tmp.filter((skill) => {
      return (
        skill._count._all >= args.filter.min &&
        skill._count._all <= args.filter.max
      );
    });
  }
  return tmp;
};
const userCreateInputResolver = async (
  parent,
  args: { data: UserCreateInput },
  contextValue
) => {
  const skills = args.data.skills.map((skill) => {
    return {
      skill: skill.skill,
      rating: skill.rating,
    };
  });
  return context.prisma.user.create({
    data: {
      name: args.data.name,
      phone: args.data.phone,
      company: args.data.company,
      email: args.data.email,
      skills: {
        create: skills,
      },
    },
    include: {
      skills: true,
    },
  });
};
const updateUserResolver = async (
  parent,
  args: { data: UserUpdateInput; uid: number },
  contextValue
) => {
  if (args.data.skills) {
    //can't do upsert many here which would be more efficient

    //Two options:
    //Option 1 (not implemented)
    //read all the skills which already exist for the users
    //filter to two lists:
    //update all skills that already exist
    //create new skills that doen't exist
    //delete all skills that are inside the db but not in one of the two lists

    //Option 2 (implemented)
    //just delete all the skills and add the ones on the list back
    await context.prisma.skill.deleteMany({
      where: {
        user_uid: args.uid,
      },
    });
    //sqlite doesn't support createMany
    for (const skill of args.data.skills) {
      await context.prisma.skill.create({
        data: {
          skill: skill.skill,
          rating: skill.rating,
          user_uid: args.uid,
        },
      });
    }
  }
  return context.prisma.user.update({
    where: {
      uid: args.uid,
    },
    data: {
      name: args.data.name,
      company: args.data.company,
      phone: args.data.phone,
      email: args.data.email,
    },
  });
};

export {
  userResolver,
  skillFrequencyResolver,
  skillsResolver,
  userCreateInputResolver,
  allUserResolver,
  updateUserResolver,
};
