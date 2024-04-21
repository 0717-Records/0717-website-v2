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
  jsonValue: any;
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
  value: FieldValue;
}

// The way the field values are defined in the app (as opposed to in the db)
// e.g. string and paragraphs map to string here, and json maps to Link (and maybe more later)
export type FieldValue = string | number | boolean | Date | Link[] | null;

export interface Link {
  label?: string | null;
  url: string;
  iconType?: string | null;
}

// This must match the "names" that are stored in prisma on the FieldType model
export enum FieldDataType {
  String = 'string',
  Paragraph = 'paragraph',
  Integer = 'integer',
  Float = 'float',
  Boolean = 'boolean',
  DateTime = 'date_time',
  Json = 'json',
}

export interface HeroImage {
  id: string;
  imageUrl: string;
  altText: string | null;
  order: number;
}

export interface DisplayArtist {
  id: string;
  image?: string | null;
  description?: string | null;
  links?: any | null;
  name: string;
}
