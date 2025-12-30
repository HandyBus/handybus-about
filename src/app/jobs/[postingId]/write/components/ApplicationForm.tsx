'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputField } from '@/components/input/InputField';
import { AgreementItem } from '@/components/agreement/AgreementItem';
import { RadioOption } from '@/components/radio/RadioOption';
import { FileInputField } from '@/components/file/FileInputField';
import { Button } from '@/components/button/Button';
import { MANDATORY_AGREEMENT_TERMS } from '@/constants/agreementTerm.const';
import {
  ACCEPTED_FILE_TYPES,
  ApplicationFormData,
  applicationSchema,
  MAX_FILE_SIZE,
} from './types/applicationForm.type';
import { createJobApplication } from '@/app/services/recruitment.service';
import { getFileUrl } from '@/app/services/common.service';
import dayjs from 'dayjs';

interface ApplicationFormProps {
  jobTitle: string;
  postingId: string;
}

export const ApplicationForm = ({
  jobTitle,
  postingId,
}: ApplicationFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ApplicationFormData>>({
    name: '',
    contact: '',
    email: '',
    personalInfoConsent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const handleFileSelect = (
    file: File | null,
    field: 'resumeFile' | 'portfolioFile',
  ) => {
    if (!file) {
      if (field === 'resumeFile') setResumeFile(null);
      if (field === 'portfolioFile') setPortfolioFile(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'PDF 파일만 업로드 가능합니다.',
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]: '파일 크기는 10MB 이하로 업로드해주세요.',
      }));
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    if (field === 'resumeFile') setResumeFile(file);
    if (field === 'portfolioFile') setPortfolioFile(file);
  };

  const validate = () => {
    const dataToValidate = {
      ...formData,
      resumeFile: resumeFile,
      portfolioFile: portfolioFile,
    };

    const result = applicationSchema.safeParse(dataToValidate);
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
        let resumeFileUrl = '';
        if (resumeFile) {
          resumeFileUrl = await getFileUrl('resumes', 'pdf', resumeFile);
        }

        let portfolioFileUrl = null;
        if (portfolioFile) {
          portfolioFileUrl = await getFileUrl('resumes', 'pdf', portfolioFile);
        }

        await createJobApplication({
          jobPostingId: postingId,
          applicantName: data.name,
          applicantPhoneNumber: data.contact,
          applicantEmail: data.email,
          applicantCareerYears:
            data.careerType === 'CAREER' ? (data.careerYears ?? null) : 0,
          applicationType: 'JOB',
          customJobTitle: null,
          resumeFile: resumeFileUrl,
          portfolioFile: portfolioFileUrl ?? null,
          personalInfoConsent: data.personalInfoConsent,
          agreedAt: data.agreedAt,
        });
        router.replace(`/jobs/${postingId}/success`);
      } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCareerChange = (type: 'NEW' | 'CAREER') => {
    setFormData((prev) => ({
      ...prev,
      careerType: type,
      careerYears: type === 'NEW' ? undefined : prev.careerYears,
    }));
  };

  return (
    <div className="flex flex-col gap-32 tablet:gap-40 desktop:gap-40">
      {/* Header Section */}
      <section className="flex flex-col gap-8">
        <h1 className="text-[38px] font-600 leading-[140%] -tracking-[0.95px] text-basic-black">
          지원서 작성하기
        </h1>
        <p className="text-24 font-500 leading-[140%] -tracking-[0.6px] text-basic-black">
          {jobTitle}
        </p>
      </section>

      {/* Form Section */}
      <section className="flex flex-col gap-32">
        {/* Name */}
        <InputField
          label="이름"
          value={formData.name || ''}
          onChange={(val) => setFormData({ ...formData, name: val })}
          placeholder="홍 길동"
          error={errors.name}
        />

        {/* Contact */}
        <InputField
          label="연락처"
          value={formData.contact || ''}
          onChange={(val) => setFormData({ ...formData, contact: val })}
          placeholder="010-1234-5678"
          error={errors.contact}
        />

        {/* Email */}
        <InputField
          label="이메일"
          value={formData.email || ''}
          onChange={(val) => setFormData({ ...formData, email: val })}
          placeholder="메일 주소를 입력하세요."
          error={errors.email}
        />

        {/* Career */}
        <div className="flex flex-col gap-12">
          <label className="text-14 font-600 leading-[140%] -tracking-[0.35px] text-basic-black">
            경력
          </label>
          <div className="flex flex-col gap-16">
            <div className="flex min-h-[46.33px] items-center gap-24">
              <div className="flex items-center gap-12">
                <RadioOption
                  label="경력"
                  selected={formData.careerType === 'CAREER'}
                  onClick={() => handleCareerChange('CAREER')}
                />
                {formData.careerType === 'CAREER' && (
                  <div className="animate-fadeIn w-[72px]">
                    <div
                      className={`flex w-full items-center rounded-8 border px-12 py-8 focus-within:border-brand-primary-400 ${
                        errors.careerYears
                          ? 'border-basic-red-400'
                          : 'border-basic-grey-200'
                      }`}
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={
                          formData.careerYears
                            ? String(formData.careerYears)
                            : ''
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setFormData({
                            ...formData,
                            careerYears: val
                              ? Number(val.slice(0, 2))
                              : undefined,
                          });
                        }}
                        className="w-full bg-transparent px-4 py-4 text-14 font-500 leading-[160%] text-basic-black placeholder:text-basic-grey-400 focus:outline-none"
                      />
                      <p className="-mx-20 text-14 font-500 leading-[160%] -tracking-[0.35px]">
                        년
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <RadioOption
                label="신입 (경력 없음)"
                selected={formData.careerType === 'NEW'}
                onClick={() => handleCareerChange('NEW')}
              />
            </div>
          </div>
          {errors.careerType && (
            <p className="text-12 font-500 text-basic-red-400">
              {errors.careerType}
            </p>
          )}
          {errors.careerYears && (
            <p className="text-12 font-500 text-basic-red-400">
              {errors.careerYears}
            </p>
          )}
        </div>

        {/* Resume */}
        <FileInputField
          label="이력서 및 경력기술서"
          file={resumeFile}
          onFileSelect={(file) => handleFileSelect(file, 'resumeFile')}
          placeholder="파일 첨부 (최대 10MB)"
          error={errors.resumeFile}
          accept=".pdf"
        />

        {/* Portfolio */}
        <FileInputField
          label="포트폴리오 (선택사항)"
          file={portfolioFile}
          onFileSelect={(file) => handleFileSelect(file, 'portfolioFile')}
          placeholder="파일 첨부 (최대 10MB)"
          error={errors.portfolioFile}
          accept=".pdf"
        />
      </section>

      {/* Agreement Section */}
      <section>
        <section className="flex flex-col gap-12 rounded-8 bg-basic-grey-50 p-12">
          <AgreementItem
            label="[필수] 개인정보 필수 항목 수집 및 이용 동의"
            checked={!!formData.personalInfoConsent}
            onClick={() => {
              const newStateOfPersonalInfoConsent =
                !formData.personalInfoConsent;
              setFormData({
                ...formData,
                personalInfoConsent: newStateOfPersonalInfoConsent,
                agreedAt:
                  newStateOfPersonalInfoConsent === true
                    ? dayjs().toISOString()
                    : undefined,
              });
            }}
            terms={MANDATORY_AGREEMENT_TERMS}
          />
        </section>
        {errors.personalInfoConsent && (
          <p className="mt-12 text-12 font-500 text-basic-red-400">
            {errors.personalInfoConsent}
          </p>
        )}
      </section>

      <div className="container-padding fixed bottom-0 left-0 right-0 z-10 bg-basic-white pb-24 pt-8 desktop:hidden">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          isLoading={isLoading}
          type="button"
          variant="full"
        >
          지원하기
        </Button>
      </div>

      <Button
        onClick={handleSubmit}
        className="hidden desktop:flex"
        disabled={isLoading}
        isLoading={isLoading}
        type="button"
      >
        지원하기
      </Button>

      {/* Spacer for fixed button */}
      <div className="h-[80px] desktop:hidden" />
    </div>
  );
};
