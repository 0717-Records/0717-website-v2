import axios from 'axios';
import { FieldDataType, FieldData, FieldValue } from '../types';

interface updateSectionHandlerProps {
  id: string;
  data: Record<string, any>;
  fieldArr: FieldData[];
}

const updateSectionHandler = async ({ id, data, fieldArr }: updateSectionHandlerProps) => {
  try {
    const { sub_title, ...newFieldVals } = data;

    const newFieldArr = fieldArr.map((field) => {
      return {
        id: field.id,
        data: getObjByType(field.type, newFieldVals[field.id]),
      };
    });

    // Update data on section
    await axios.put(`/api/sections/${id}`, {
      sub_title,
    });

    // Update each field in section
    const promises = newFieldArr.map((field) => updateOneField({ id: field.id, data: field.data }));
    await Promise.all(promises);
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

interface updateOneFieldProps {
  id: string;
  data: {
    stringValue?: any;
    intValue?: any;
    floatValue?: any;
    booleanValue?: any;
    dateTimeValue?: any;
    jsonValue?: any;
  };
}

const updateOneField = async ({ id, data }: updateOneFieldProps) => {
  try {
    await axios.put(`/api/fields/${id}`, data);
  } catch (error: any) {
    console.error(error);
    throw Error;
  }
};

const getObjByType = (type: string, value: FieldValue) => {
  switch (type) {
    case FieldDataType.String:
      return { stringValue: value };
    case FieldDataType.Paragraph:
      return { stringValue: value };
    case FieldDataType.Integer:
      return { intValue: value };
    case FieldDataType.Float:
      return { floatValue: value };
    case FieldDataType.Boolean:
      return { booleanValue: value };
    case FieldDataType.DateTime:
      return { dateTimeValue: value };
    case FieldDataType.Json:
      return { jsonValue: value };
    case FieldDataType.Image:
      return { stringValue: value };
    default:
      return {};
  }
};

export default updateSectionHandler;
