import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import * as yup from "yup";
import { useFormik } from "formik";
import { PaddedView, colors } from '../Themed';
import { useCartContext } from '../../context/useCartContext';
import { useCheckoutEmailUpdateMutation } from '../../saleor/api.generated';
import { TextInput, Button } from 'react-native-paper';

interface Props {
    onSubmit: () => void
    onCancel: () => void
}

interface Form {
    email: string,
}

const validationSchema = yup.object().shape({
    email: yup.string().required("Required"),
});

const PersonalDetailsForm: FC<Props> = ({ onSubmit, onCancel }) => {
    const { cart } = useCartContext()

    const [updateEmail] = useCheckoutEmailUpdateMutation()

    const formik = useFormik<Form>({
        initialValues: {
            email: "test@gmail.com",
        },
        validationSchema: validationSchema,

        onSubmit: (data) => {
            updateEmail({
                variables: {
                    id: cart?.id as string,
                    email: data.email
                }
            }).then(onSubmit)
        }
    });

    return (
        <PaddedView>
            <TextInput
                style={styles.input}
                onChangeText={(value) => formik.setFieldValue("email", value)}
                value={formik.values.email}
                placeholder="Email"
                label="Email" />

            <Button mode="contained" onPress={() => formik.handleSubmit()}>Submit</Button>
            <Button onPress={() => onCancel()} >Cancel</Button>
        </PaddedView>
    );
}

export default PersonalDetailsForm


const styles = StyleSheet.create({
    textInputWrapper: {
        display: "flex",

    },
    label: {
        color: colors.greyText,
        marginLeft: 12,
    },
    input: {
        marginBottom: 16,
    },
});

