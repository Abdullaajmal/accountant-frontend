import useLanguage from '@/locale/useLanguage';
import ReadPackageModule from '@/modules/PackageModule/ReadPackageModule';

export default function PackageRead() {
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
  return <ReadPackageModule config={configPage} />;
}
