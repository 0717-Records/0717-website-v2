import { SectionData } from '@/app/types';

const getFieldFunc = (section: SectionData) => {
  const { components } = section;
  return (unique_component_name: string, field_name: string) => {
    const fields = components?.find(
      (component) => component.unique_name === unique_component_name
    )?.fields;
    const field_value = fields?.find((field) => field.name === field_name)?.value;
    return field_value;
  };
};

export default getFieldFunc;
