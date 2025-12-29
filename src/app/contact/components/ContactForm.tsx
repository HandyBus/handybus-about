'use client';

import { useState } from 'react';
import { InputField } from '@/components/input/InputField';
import { Button } from '@/components/button/Button';
import { createContact } from '@/app/services/common.service';
import { ContactFormData, contactFormSchema } from './types/contactForm.type';
import { useRouter } from 'next/navigation';

const ContactForm = () => {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    name: '',
    company: '',
    phoneNumber: '',
    email: '',
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return result.data;
  };

  const handleSubmit = async () => {
    const data = validate();

    if (data) {
      setIsLoading(true);
      try {
        await createContact(data);
        router.replace('/contact/success');
      } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="bg-basic-grey-50">
      <section className="container-padding flex flex-col items-center gap-64 py-64 tablet:gap-80 tablet:py-80 desktop:flex-row desktop:items-start desktop:justify-between desktop:gap-0 desktop:py-120">
        {/* Title Section */}
        <div className="flex w-full flex-col gap-8 desktop:w-[588px]">
          <h1 className="text-[34px] font-600 leading-[160%] tracking-[-0.95px] text-basic-black tablet:text-[38px]">
            협업 문의
          </h1>
          <div className="text-18 font-500 leading-[140%] tracking-[-0.5px] text-basic-grey-700 tablet:text-20">
            <p>핸디버스는 팬덤을 위한 다양한 시도에 모두 열려있습니다.</p>
            <p>언제든지 편하게 문의해 주세요.</p>
          </div>
        </div>

        <section className="desktop:ml-14 flex w-full flex-col gap-32 rounded-16 bg-basic-white p-24 tablet:p-32 desktop:w-[586px]">
          <div className="flex flex-col gap-40">
            <InputField
              label="이름"
              value={formData.name || ''}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="홍 길동"
              error={errors.name}
            />

            <InputField
              label="연락처"
              value={formData.phoneNumber || ''}
              onChange={(value) =>
                setFormData({ ...formData, phoneNumber: value })
              }
              placeholder="010-1234-5678"
              type="tel"
              error={errors.phoneNumber}
            />

            <InputField
              label="소속"
              value={formData.company || ''}
              onChange={(value) => setFormData({ ...formData, company: value })}
              placeholder="회사명을 입력하세요."
              error={errors.company}
            />

            <InputField
              label="답변 받을 이메일"
              value={formData.email || ''}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="메일 주소를 입력하세요."
              type="email"
              error={errors.email}
            />

            <InputField
              label="제목"
              value={formData.title || ''}
              onChange={(value) => setFormData({ ...formData, title: value })}
              placeholder="제목을 입력하세요."
              variant="bordered"
              error={errors.title}
            />

            <InputField
              label="내용"
              value={formData.content || ''}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="문의하고 싶은 내용을 입력하세요."
              variant="textarea"
              error={errors.content}
            />
          </div>

          <div className="hidden tablet:block">
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              전송하기
            </Button>
          </div>
        </section>
      </section>

      <div className="sticky bottom-0 z-10 border-t border-basic-grey-200 bg-basic-white p-16 tablet:hidden">
        <Button
          type="submit"
          variant="full"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          전송하기
        </Button>
      </div>
    </section>
  );
};

export default ContactForm;
