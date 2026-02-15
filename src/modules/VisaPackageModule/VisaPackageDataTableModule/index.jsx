import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';

export default function VisaPackageDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config}></ErpPanel>
    </ErpLayout>
  );
}
