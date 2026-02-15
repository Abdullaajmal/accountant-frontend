import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import BookingForm from '@/modules/BookingModule/Forms/BookingForm';

export default function BookingCreate() {
  return <CreateItem config={{ entity: 'booking' }} CreateForm={BookingForm} />;
}
