import prisma from '@/app/libs/prisma';

const componentUniqueName = 'company_info';
const fieldName = 'email';

const getEmail = async () => {
  try {
    const component = await prisma.component.findUnique({
      where: { unique_name: componentUniqueName },
    });

    if (!component)
      throw new Error(`Component with unique name "${componentUniqueName}" not found.`);

    const field = await prisma.field.findFirst({
      where: {
        componentId: component.id,
        name: 'email',
      },
    });

    if (!field) throw new Error(`Field with name "${fieldName}" not found.`);

    return field.stringValue;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getEmail;
