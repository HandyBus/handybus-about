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

export const ApplicationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ApplicationFormData>>({
    name: '',
    contact: '',
    email: '',
    jobTitle: '',
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
          jobPostingId: null,
          applicantName: data.name,
          applicantPhoneNumber: data.contact,
          applicantEmail: data.email,
          applicantCareerYears: null,
          applicationType: 'TALENT_POOL',
          customJobTitle: data.jobTitle,
          resumeFile: resumeFileUrl,
          portfolioFile: portfolioFileUrl ?? null,
          personalInfoConsent: data.personalInfoConsent,
          agreedAt: data.agreedAt,
          wantsCoffeeChat: data.wantsCoffeeChat ?? null,
          messageToTeam: data.messageToTeam ?? null,
        });
        router.replace(`/jobs/talentPool/success`);
      } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-32 tablet:gap-40 desktop:gap-40">
      {/* Header Section */}
      <section className="flex flex-col gap-8">
        <h1 className="text-[38px] font-600 leading-[140%] -tracking-[0.95px] text-basic-black">
          인재풀 등록
        </h1>
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

        {/* Job Title */}
        <InputField
          label="직무"
          value={formData.jobTitle || ''}
          onChange={(val) => setFormData({ ...formData, jobTitle: val })}
          placeholder="직무를 입력하세요."
          error={errors.jobTitle}
        />

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

        {/* Wants Coffee Chat */}
        <div className="flex flex-col gap-12">
          <label className="text-14 font-600 leading-[140%] -tracking-[0.35px] text-basic-black">
            커피챗을 희망하시나요?
          </label>
          <div className="flex flex-col gap-16">
            <div className="flex min-h-[46.33px] items-center gap-24">
              <RadioOption
                label="네"
                selected={formData.wantsCoffeeChat ?? false}
                onClick={() =>
                  setFormData({
                    ...formData,
                    wantsCoffeeChat: true,
                  })
                }
              />
              <RadioOption
                label="아니오, 인재풀만 등록할게요"
                selected={!formData.wantsCoffeeChat}
                onClick={() =>
                  setFormData({
                    ...formData,
                    wantsCoffeeChat: false,
                  })
                }
              />
            </div>
          </div>
          {errors.wantsCoffeeChat && (
            <p className="text-12 font-500 text-basic-red-400">
              {errors.wantsCoffeeChat}
            </p>
          )}
        </div>
      </section>

      {/* Message to Team */}
      <InputField
        label="핸디버스 팀에게 하고 싶은 말이 있으시다면, 자유롭게 적어주세요. (선택사항)"
        value={formData.messageToTeam || ''}
        onChange={(val) => setFormData({ ...formData, messageToTeam: val })}
        placeholder="내용을 입력해 주세요."
        error={errors.messageToTeam}
        variant="textarea"
      />

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
          등록하기
        </Button>
      </div>

      <Button
        onClick={handleSubmit}
        className="hidden desktop:flex"
        disabled={isLoading}
        isLoading={isLoading}
        type="button"
      >
        등록하기
      </Button>

      {/* Spacer for fixed button */}
      <div className="h-[80px] desktop:hidden" />
    </div>
  );
};
