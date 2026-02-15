import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';

export default function FinancialYearDataTableModule({ config }) {
  const dispatch = useDispatch();
  const translate = useLanguage();

  const handleOpen = (id) => {
    dispatch(erp.update({ entity: 'financialyear', id, jsonData: {}, updateType: 'open' }));
  };

  const handleClose = (id) => {
    dispatch(erp.update({ entity: 'financialyear', id, jsonData: {}, updateType: 'close' }));
  };

  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Open Year'),
            key: 'open',
            onClick: handleOpen,
          },
          {
            label: translate('Close Year'),
            key: 'close',
            onClick: handleClose,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
