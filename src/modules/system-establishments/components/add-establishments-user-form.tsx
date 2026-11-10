import { FC } from 'react';
import { MailIcon } from 'lucide-react';
import z from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/common/components';
import { useAddEstablishmentUser } from '../hooks/useAddEstablishmentUser';

const addEstablishmentUserFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
});

type AddEstablishmentUserFormSchema = z.infer<typeof addEstablishmentUserFormSchema>;

type AddEstablishmentUserFormProps = {
  establishmentId: string;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 404) {
      return 'Пользователь не найден';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось создать заведение, попробуйте снова позже';
};

export const AddEstablishmentUserForm: FC<AddEstablishmentUserFormProps> = ({ establishmentId }) => {
  const addEstablishmentUser = useAddEstablishmentUser();

  const form = useForm({
    defaultValues: {
      emailAddress: '',
    } as AddEstablishmentUserFormSchema,
    validators: {
      onChange: addEstablishmentUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('emailAddress', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        await addEstablishmentUser.mutateAsync({ establishmentId, emailAddress: value.emailAddress });
        form.reset();
      } catch (error) {
        form.setFieldMeta('emailAddress', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getErrorMessage(error) }] },
        }));
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <form.Field
          name='emailAddress'
          listeners={{
            onChange: () => {
              form.setFieldMeta('emailAddress', prev => ({
                ...prev,
                errorMap: { ...prev.errorMap, onServer: undefined },
              }));
            },
          }}
        >
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

            return (
              <Field>
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='auth_email_address'
                    type='email'
                    autoComplete='email'
                    aria-invalid={isError}
                    placeholder='эл. почта менеджера'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={state => state.isSubmitting}>
          {isSubmitting => (
            <Button type='submit' className='max-sm:w-full' disabled={isSubmitting}>
              Добавить
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
