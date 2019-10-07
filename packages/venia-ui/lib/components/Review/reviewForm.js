import React, { useState,  useCallback } from 'react';
import defaultClasses from './reviewForm.css';
import classify from '../../classify';
import { Form } from 'informed';
import Field from '../Field';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import { isRequired } from '../../util/formValidators';
import Button from '../Button';
import Rate from './rate';
import reviewMutation from '../../queries/submitReview.graphql';
import { useMutation } from '@magento/peregrine';


const ReviewForm = props => {
    const { classes, productId,availableRatings } = props

    const [optionId, setOptionId] = useState(null)
    const [queryResult, queryApi] = useMutation(reviewMutation);
    const { data, error } = queryResult;
    const { runMutation, setLoading } = queryApi;
    const handleSubmit = useCallback(
        ({ title, nickName, message }) => {
            setLoading(true);
            runMutation({
                variables: {
                    product_id: Number(productId),
                    title: String(title),
                    nickname: String(nickName),
                    detail: String(message),
                    ratings: [{ rating_id: 4, option_id: optionId }]
                }
            })
        },
        [optionId]
    );
    const getRateOptionId = useCallback((value) => {
        setOptionId(value)
    }, []);

    const response = data && typeof (data) != 'undefined' ? <div>Your review is added ;) </div> :
    error ? <div>Something went wrong ;( </div> : <div></div>
    return (
        <div className={classes.root}>
            <h1>Add a review</h1>
            <div className={classes.content}>
                <Form
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Field className={classes.rate} required={true}>
                        <span className={classes.rateName}>Rating  </span>
                        <Rate getRateOptionId={getRateOptionId} availableRatings={availableRatings}/>
                    </Field>
                    <div className={classes.textInputGroup}>
                        <Field label="Title *" required={true}>
                            <TextInput
                                autoComplete="title"
                                field="title"
                                validate={isRequired}
                            />
                        </Field>
                        <Field label="NickName *" required={true}>
                            <TextInput
                                autoComplete="nickName"
                                field="nickName"
                                validate={isRequired}
                            />
                        </Field>
                    </div>
                    <Field label="Your review *" required={true}>
                        <TextArea
                            autoComplete="message"
                            field="message"
                            validate={isRequired}
                        />
                    </Field>
                    {response}
                    <Button
                        priority="high"
                        type="submit"
                    >
                        {'Submit'}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default classify(defaultClasses)(ReviewForm);