import { Size } from "@/core/products/interfaces/product.interface";
import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemeButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View
} from "react-native";

const ProductIdScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { productQuery, productMutation } = useProduct(id as string);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, [productQuery.data]);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/" />;
  }

  const product = productQuery.data!;

  return (
    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate(productLike)} 
    >
      {(
        { values, handleChange, handleBlur, handleSubmit, setFieldValue } //esto es para obtener los valores y funciones de formik si las necesitamos
      ) => (
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : undefined} //esto es para que en ios no tape el teclado los inputs
          behavior="padding"
        >
          <ScrollView>
            {/* Product Images */}
            <ProductImages images={values.images} />

            {/* inputs formulario */}
            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
              />

              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />

              <ThemedTextInput
                placeholder="Descripcion"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>

            {/* inputs de 2 rows */}
            <ThemedView
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginVertical: 5,
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
                onBlur={handleBlur("stock")}
              />
            </ThemedView>

            {/* button group */}
            <ThemedView style={{ marginHorizontal: 10 }}>
              {/* sizes */}
              <ThemeButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOption={values.sizes}
                onSelectOption={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(selectedSize as Size)
                    ? values.sizes.filter((size) => size !== selectedSize)
                    : [...values.sizes, selectedSize as Size];

                  setFieldValue("sizes", newSizesValue);
                }}
              />
              {/* gender options */}
              <ThemeButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOption={[values.gender]} //lo convertimos en array para que funcione el button group
                onSelectOption={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                } //setFieldValue de formik para actualizar el valor
              />
            </ThemedView>

            {/* button save */}
            <View
              style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}
            >
              <ThemedButton
                icon="save-outline"
                onPress={() => handleSubmit()} //handleSubmit de formik para enviar el formulario
              >
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductIdScreen;
