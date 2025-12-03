import { useCameraStore } from "@/presentation/store/useCameraStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function CameraScreen() {
  const {addSelectedImage} = useCameraStore()

  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requesCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState<string>();

  const cameraRef = useRef<CameraView>(null);

  const onRequestPermission = async () => {
    try {
      const { status: cameraPermissionStatus } = await requesCameraPermission();
      if (cameraPermissionStatus !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso a la camara para tomar fotos"
        );
        return
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission();
      if (mediaPermissionStatus !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso para acceder a la galeria"
        );
        return
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "error",
        "algo salio mal con los permisos, contacte al soporte"
      );
    }
  };

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          ...styles.container,
          marginHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.message}>
          Necesitamos tu permiso para mostrar la cámara y la galeria
        </Text>

        <TouchableOpacity onPress={onRequestPermission}>
          <ThemedText type="subtitle">Solicitar Permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7, // calidad de la imagen con respecto a la camara
    });

    console.log(picture);

    if (!picture.uri) return;

    setSelectedImage(picture.uri);

    // todo: guardar imagen
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const onPickImagesFromGallery = async() => {
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.5,
      aspect: [4,3],
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    })

    if (result.canceled) return

    result.assets.forEach(asset => {
      addSelectedImage(asset.uri);
    })

    router.dismiss();

  }

  const onPictureAccepted = async () => {
    if (!selectedImage) return;

    await MediaLibrary.createAssetAsync(selectedImage)
  
    addSelectedImage(selectedImage);

    router.dismiss();
  };

  const onReturnCancel = () => {
    // todo: Limpiar estado

    router.dismiss();
  };

  const onRetakePicture = () => {
    setSelectedImage(undefined);
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <ConfirmImageButton onPress={onPictureAccepted} />
        <RetakeImageButton onPress={onRetakePicture} />
        <ReturnCancellButton onPress={onReturnCancel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

      <ShutterButton onPress={onShutterButtonPress} />
      <FlipCameraButton onPress={toggleCameraFacing} />
      <GalleryButton onPress={onPickImagesFromGallery}/>
      <ReturnCancellButton onPress={onReturnCancel} />
    </View>
  );
}

// custom components
const ShutterButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    ></TouchableOpacity>
  );
};

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="camera-reverse-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Ionicons name="images-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const ReturnCancellButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
      <Ionicons name="arrow-back-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  );
};

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="close-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
