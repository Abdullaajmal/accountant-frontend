import NotFound from '@/components/NotFound';
import { ErpLayout } from '@/layout';
import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import AccountForm from '@/modules/AccountModule/Forms/AccountForm';
import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { settingsAction } from '@/redux/settings/actions';

export default function UpdateAccountModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  useLayoutEffect(() => {
    if (currentResult) {
      const data = { ...currentResult };
      dispatch(erp.currentAction({ actionType: 'update', data }));
    }
  }, [currentResult]);

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <ErpLayout>
        {isSuccess ? (
          <UpdateItem config={config} UpdateForm={AccountForm} />
        ) : (
          <NotFound entity={config.entity} />
        )}
      </ErpLayout>
    );
}
