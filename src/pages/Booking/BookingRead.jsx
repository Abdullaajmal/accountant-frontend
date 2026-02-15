import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import BookingForm from '@/modules/BookingModule/Forms/BookingForm';
import useLanguage from '@/locale/useLanguage';

export default function BookingRead() {
  const translate = useLanguage();
  const config = {
    entity: 'booking',
    ENTITY_NAME: translate('Booking'),
  };
  return <ReadItem config={config} UpdateForm={BookingForm} />;
}
