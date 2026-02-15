import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import ExpenseDataTableModule from '@/modules/ExpenseModule/ExpenseDataTableModule';

export default function Expense() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const entity = 'expense';

  const dataTableColumns = [
    {
      title: translate('Expense Number'),
      dataIndex: 'expenseNumber',
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Category'),
      dataIndex: 'expenseCategory',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Amount'),
      dataIndex: 'amount',
      render: (amount, record) => moneyFormatter({ amount, currency_code: record.currency }),
    },
  ];

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

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <ExpenseDataTableModule config={config} />;
}
