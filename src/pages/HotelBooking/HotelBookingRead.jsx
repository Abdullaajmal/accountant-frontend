import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import HotelBookingForm from '@/modules/HotelBookingModule/Forms/HotelBookingForm';
import useLanguage from '@/locale/useLanguage';

export default function HotelBookingRead() {
  const translate = useLanguage();
  const config = {
    entity: 'hotelbooking',
    ENTITY_NAME: translate('Hotel Booking'),
  };
  return <ReadItem config={config} UpdateForm={HotelBookingForm} />;
}
