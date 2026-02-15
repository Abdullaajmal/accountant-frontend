import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import DocumentDataTableModule from '@/modules/DocumentModule/DocumentDataTableModule';

export default function Document() {
  const translate = useLanguage();
  const entity = 'document';

  const dataTableColumns = [
    {
      title: translate('Document Name'),
      dataIndex: 'documentName',
    },
    {
      title: translate('Type'),
      dataIndex: 'documentType',
    },
    {
      title: translate('File Name'),
      dataIndex: ['file', 'name'],
    },
    {
      title: translate('Size'),
      dataIndex: ['file', 'size'],
      render: (size) => {
        if (!size) return '-';
        const mb = size / (1024 * 1024);
        return mb < 1 ? `${(size / 1024).toFixed(2)} KB` : `${mb.toFixed(2)} MB`;
      },
    },
    {
      title: translate('Uploaded'),
      dataIndex: ['file', 'uploadedAt'],
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Status'),
      dataIndex: 'isPublic',
      render: (isPublic) => (
        <Tag color={isPublic ? 'green' : 'blue'}>
          {isPublic ? translate('Public') : translate('Private')}
        </Tag>
      ),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Documents'),
    DATATABLE_TITLE: translate('Document List'),
    ADD_NEW_ENTITY: translate('Upload Document'),
    ENTITY_NAME: translate('Document'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <DocumentDataTableModule config={config} />;
}
