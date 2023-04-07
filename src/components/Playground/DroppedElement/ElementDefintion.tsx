import type { FC } from 'react'
import {
  FileUploadDefinition,
  InputDefinition,
  SelectDefinition,
  TextareaDefinition,
} from '../Definitions'
import {
  CHECKBOX,
  DATEPICKER,
  EMAIL_INPUT,
  LONG_TEXT,
  MULTISELECT,
  PHONE_INPUT,
  SELECT,
  SHORT_TEXT,
  TEXT_INPUT,
  UPLOAD,
} from '@common/constants'
import { setInputType } from '@helpers/setInputType'

export const ElementDefinition: FC<any> = ({
  id,
  type,
  name,
  placeholder,
  value,
  descriptionForInput,
  required,
}) => {
  switch (type) {
    case TEXT_INPUT:
    case EMAIL_INPUT:
    case PHONE_INPUT:
    case SHORT_TEXT:
    case CHECKBOX:
    case DATEPICKER:
      return (
        <InputDefinition
          id={id}
          name={name}
          placeholder={placeholder}
          descriptionForInput={descriptionForInput}
          value={value}
          required={required}
          type={setInputType(type)}
        />
      )

    case LONG_TEXT:
      return <TextareaDefinition id={id} name={name} placeholder={placeholder} value={value} />

    case SELECT:
      return <SelectDefinition id={id} />

    case MULTISELECT:
      return <SelectDefinition multiselect={true} id={id} />

    case UPLOAD:
      return <FileUploadDefinition />

    default:
      return <></>
  }
}
