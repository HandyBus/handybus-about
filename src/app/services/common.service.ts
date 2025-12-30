import z from 'zod';
import { instance } from './config';
import { CustomError } from './custom-error';
import { ContactFormData } from '../contact/components/types/contactForm.type';
import { ContactSchema } from '../types/common.type';

type KeyType = 'concerts' | 'users/profiles' | 'reviews' | 'events' | 'resumes';
type ExtensionType = 'pdf';

const getPresignedUrl = async (key: KeyType, extension: ExtensionType) => {
  const res = await instance.get(
    `/v1/core/file/presigned-url?key=${key}&extension=${extension}`,
    {
      shape: {
        presignedUrl: z.string(),
        cdnUrl: z.string(),
      },
    },
  );
  return res;
};

const uploadFileToS3 = async (url: string, file: File) => {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      cache: 'no-store',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    throw new CustomError(500, '파일 업로드 실패');
  }
};

export const getFileUrl = async (
  key: KeyType,
  extension: ExtensionType,
  file: File,
) => {
  try {
    const res = await getPresignedUrl(key, extension);
    await uploadFileToS3(res.presignedUrl, file);
    return res.cdnUrl;
  } catch (error) {
    console.error(error);
    throw new CustomError(500, '파일 URL 가져오기 실패');
  }
};

export const createContact = async (data: ContactFormData) => {
  const res = await instance.post('/v1/core/contacts', data, {
    shape: {
      contact: ContactSchema,
    },
  });
  return res.contact;
};
