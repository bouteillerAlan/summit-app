import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";

export default function AppIndex() {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>title</Text>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}
