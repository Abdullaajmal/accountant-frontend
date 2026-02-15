import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';

export default function CommissionDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config}></ErpPanel>
    </ErpLayout>
  );
}
