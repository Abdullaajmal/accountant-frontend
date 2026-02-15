import useLanguage from '@/locale/useLanguage';
import CreateExpenseModule from '@/modules/ExpenseModule/CreateExpenseModule';

export default function ExpenseCreate() {
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
  return <CreateExpenseModule config={configPage} />;
}
