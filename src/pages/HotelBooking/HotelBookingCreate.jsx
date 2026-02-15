import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import HotelBookingForm from '@/modules/HotelBookingModule/Forms/HotelBookingForm';

export default function HotelBookingCreate() {
  return <CreateItem config={{ entity: 'hotelbooking' }} CreateForm={HotelBookingForm} />;
}
