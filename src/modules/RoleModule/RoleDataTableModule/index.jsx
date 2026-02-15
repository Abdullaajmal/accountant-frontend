import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';
import storePersist from '@/redux/storePersist';

export default function RoleDataTableModule({ config }) {
  const dispatch = useDispatch();
  const translate = useLanguage();

  const handleCreateDefaults = async () => {
    try {
      const auth = storePersist.get('auth');
      const token = auth?.current?.token || localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_BASE_URL}role/default/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        message.success(translate('Default roles created successfully'));
        // Refresh the list
        dispatch(erp.list({ entity: 'role' }));
      } else {
        message.error(response.data.message || translate('Failed to create default roles'));
      }
    } catch (error) {
      message.error(translate('Failed to create default roles'));
      console.error('Error creating default roles:', error);
    }
  };

  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Create Default Roles'),
            key: 'createDefaults',
            onClick: handleCreateDefaults,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
