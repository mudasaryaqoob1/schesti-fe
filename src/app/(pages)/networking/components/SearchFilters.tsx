import React from 'react'
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import FormikController from '@/app/component/formControl';

const SearchFilters = () => {

    const initialValues = {
        test: ''
    };

    const validationSchema = Yup.object({

    });

    // submit handler
    const submitHandler = async (

    ) => {
    }

    return (
        <section className="w-full col-span-2 mb-4 shadow rounded-xl p-6 bg-white">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                {({
                    handleSubmit,
                    values,
                    errors,
                    handleBlur,
                    setFieldValue,
                    touched,
                }) => (
                    <>

                        <h6 className='text-ebonyClay font-bold text-lg'>Search Filter</h6>
                        <div className="mt-4">
                            <SelectComponent
                                label="State"
                                name="state"
                                placeholder="State"
                                field={{
                                    options: [],
                                    value: '',
                                    showSearch: true,
                                    onChange(value) {
                                        setFieldValue('state', value);
                                    },
                                    onBlur: handleBlur,
                                    onClear() {
                                        setFieldValue('state', '');
                                    },
                                }}
                                errorMessage={
                                    touched.test && errors.test
                                        ? errors.test
                                        : ''
                                }
                                hasError={touched.test && Boolean(errors.test)}
                            />
                            <div className='mt-2 flex flex-wrap gap-1 border-b border-lightSteelGray pb-6'>
                                {['Hawaii', 'Kentucky', 'Delaware'].map((state, i) => (
                                    <div key={i} className="flex gap-0.5 rounded-[163px] bg-schestiLightPrimary items-center px-2 py-1.5">
                                        <p className='text-xs text-graphiteGray'>{state}</p>
                                        <Image src='/crossblack.svg' alt='close' width={10} height={10} />
                                    </div>
                                ))}

                            </div>
                            <div className='mt-5'>
                                <FormikController
                                    control="input"
                                    label="Trades"
                                    type="text"
                                    suffix={<Image src='plus-circle.svg' alt='add-trade' width={14} height={14} />}
                                    name="trades"
                                    placeholder="Select Trade"
                                />


                                <div className='mt-2 flex flex-wrap gap-1'>
                                    {['Hawaii', 'Kentucky', 'Delaware'].map((state, i) => (
                                        <div key={i} className="flex gap-0.5 rounded-[163px] bg-schestiLightPrimary items-center px-2 py-1.5">
                                            <p className='text-xs text-graphiteGray'>{state}</p>
                                            <Image src='/crossblack.svg' alt='close' width={10} height={10} />
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>
                    </>
                )
                }

            </Formik >
        </section>

    )
}

export default SearchFilters