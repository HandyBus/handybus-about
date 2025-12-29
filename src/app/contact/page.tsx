import { Metadata } from 'next';
import ContactForm from './components/ContactForm';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: '협업 문의',
  description: '핸디버스는 팬덤을 위한 다양한 시도에 모두 열려있습니다.',
};

const Page = () => {
  return (
    <>
      <ContactForm />
      <div className="hidden tablet:block">
        <Footer />
      </div>
    </>
  );
};

export default Page;
