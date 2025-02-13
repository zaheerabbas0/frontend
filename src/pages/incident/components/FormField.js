import { noWhitespaceValidator } from '../../../utils/Utils';

export const fieldsConfiguration = (projects = []) => [
  {
    label: 'Subject',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: 'Subject is required' },
      { validator: noWhitespaceValidator('Subject') },
    ],
    placeholder: 'Enter Subject',
    responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
  },
  // {
  //   label: 'Attachment',
  //   name: 'attachment_file',
  //   type: 'dragger',
  //   responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
  //   props: {
  //     accept: '.pdf',
  //     mode: 'multiple',
  //     onFileChange: onFileChange,
  //     checkPDFType: true,
  //     maxCount: 1,
  //   },
  // },
  // {
  //   label: 'Project',
  //   name: 'project_id',
  //   type: 'select',
  //   rules: [{ required: false, message: 'Please select Project!' }],
  //   placeholder: 'Select Project',
  //   options: projects,
  // },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    rules: [
      { required: true, message: 'Write a Description!' },
      { validator: noWhitespaceValidator('Description') },
    ],
    columnSpan: 24,
    placeholder: 'Enter Description',
    responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
  },
];
