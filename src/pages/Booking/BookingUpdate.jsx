import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import BookingForm from '@/modules/BookingModule/Forms/BookingForm';

export default function BookingUpdate() {
  return <UpdateItem config={{ entity: 'booking' }} UpdateForm={BookingForm} />;
}
