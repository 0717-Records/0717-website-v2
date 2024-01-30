export interface SectionRaw {
  id: string;
  unique_name: string;
  title: string | null;
  hide: boolean;
  sub_title: string | null;
  order: number | null;
  component_section: {
    id: string;
    sectionId: string;
    componentId: string;
    order: number | null;
    component: ComponentRaw;
  }[];
  custom: boolean;
}

export interface ComponentRaw {
  id: string;
  unique_name: string;
  name: string | null;
  fields: FieldRaw[];
  custom: boolean;
}

export interface FieldRaw {
  id: string;
  name: string | null;
  order: number | null;
  stringValue: string | null;
  intValue: number | null;
  floatValue: number | null;
  booleanValue: boolean | null;
  dateTimeValue: Date | null;
  fieldType: {
    id: string;
    name: string;
  };
}

export type SectionData = Omit<SectionRaw, 'component_section'> & {
  components: ComponentData[];
};

export type ComponentData = Omit<ComponentRaw, 'fields'> & {
  fields: FieldData[];
};

export interface FieldData {
  id: string;
  name: string;
  type: string;
  value: string | number | boolean | Date | null;
}

// This must match the "names" that are stored in prisma on the FieldType model
export enum FieldDataType {
  String = 'string',
  Paragraph = 'paragraph',
  Integer = 'integer',
  Float = 'float',
  Boolean = 'boolean',
  DateTime = 'date_time',
}
