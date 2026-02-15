import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import HotelBookingForm from '@/modules/HotelBookingModule/Forms/HotelBookingForm';

export default function HotelBookingUpdate() {
  return <UpdateItem config={{ entity: 'hotelbooking' }} UpdateForm={HotelBookingForm} />;
}
