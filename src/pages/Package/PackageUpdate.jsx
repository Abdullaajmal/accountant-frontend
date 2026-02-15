import useLanguage from '@/locale/useLanguage';
import UpdatePackageModule from '@/modules/PackageModule/UpdatePackageModule';

export default function PackageUpdate() {
  const entity = 'package';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Packages'),
    DATATABLE_TITLE: translate('Package List'),
    ADD_NEW_ENTITY: translate('Add New Package'),
    ENTITY_NAME: translate('Package'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdatePackageModule config={configPage} />;
}
