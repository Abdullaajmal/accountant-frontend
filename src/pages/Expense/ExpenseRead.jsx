import useLanguage from '@/locale/useLanguage';
import ReadExpenseModule from '@/modules/ExpenseModule/ReadExpenseModule';

export default function ExpenseRead() {
  const entity = 'expense';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Expenses'),
    DATATABLE_TITLE: translate('Expense List'),
    ADD_NEW_ENTITY: translate('Add New Expense'),
    ENTITY_NAME: translate('Expense'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadExpenseModule config={configPage} />;
}
