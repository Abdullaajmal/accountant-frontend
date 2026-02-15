import useLanguage from '@/locale/useLanguage';
import CreatePackageModule from '@/modules/PackageModule/CreatePackageModule';

export default function PackageCreate() {
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
  return <CreatePackageModule config={configPage} />;
}
