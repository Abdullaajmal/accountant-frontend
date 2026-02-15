import useLanguage from '@/locale/useLanguage';
import CreateSupplierModule from '@/modules/SupplierModule/CreateSupplierModule';

export default function SupplierCreate() {
  const entity = 'supplier';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Suppliers'),
    DATATABLE_TITLE: translate('Supplier List'),
    ADD_NEW_ENTITY: translate('Add New Supplier'),
    ENTITY_NAME: translate('Supplier'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateSupplierModule config={configPage} />;
}
