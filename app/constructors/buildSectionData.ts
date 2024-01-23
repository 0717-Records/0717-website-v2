import {
  ComponentData,
  FieldDataType,
  FieldData,
  SectionData,
  SectionRaw,
  FieldRaw,
} from '../types';

const buildSectionData = (section: SectionRaw): SectionData => {
  const sortedComponents = getSortedComponents(section);

  const { component_section, ...sectionData } = section;

  return {
    ...sectionData,
    components: sortedComponents.map((component) => {
      const componentData: ComponentData = {
        ...component,
        fields: component.fields.map((field) => {
          const fieldValue: FieldData = {
            id: field.id,
            name: field.name || '',
            type: field.fieldType.name,
            value: getValueByFieldType(field),
          };
          return fieldValue;
        }),
      };
      return componentData;
    }),
  };
};

const getSortedComponents = (section: SectionRaw) => {
  const { component_section } = section;

  const sortedCompSectArray = component_section.sort((a, b) => {
    const orderA = a.order || Number.POSITIVE_INFINITY;
    const orderB = b.order || Number.POSITIVE_INFINITY;
    return orderA - orderB;
  });

  return sortedCompSectArray.map((item) => item.component);
};

const getValueByFieldType = (field: FieldRaw): string | number | boolean | Date | null => {
  switch (field.fieldType.name) {
    case FieldDataType.String:
      return field.stringValue || '';
    case FieldDataType.Paragraph:
      return field.stringValue || '';
    case FieldDataType.Integer:
      return field.intValue || 0;
    case FieldDataType.Float:
      return field.floatValue || 0.0;
    case FieldDataType.Boolean:
      return field.booleanValue || null;
    case FieldDataType.DateTime:
      return field.dateTimeValue || null;
    default:
      return null;
  }
};

export default buildSectionData;
