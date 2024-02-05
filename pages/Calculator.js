import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Calculator = () => {
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [resultado, setResultado] = useState("");
  const [notaFinal, setNotaFinal] = useState("");

  const Cal = () => {
    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);
    const n3 = parseFloat(nota3);

    const mediaP = ((n1 + n2 + n3) / 3).toFixed(1);

    if (n1 <= 10 && n2 <= 10 && !n3) {
      const conta = (21 - (n1 + n2)).toFixed(1);
      setResultado(`Você precisa tirar ${conta} na terceira prova`);
      setNotaFinal("");
      return;
    }

    if (n1 > 10 || n2 > 10 || n3 > 10) {
      setResultado("");
      setNotaFinal("Somente notas menores ou iguais a 10,0.");
      return;
    }

    setResultado(`Sua média é de ${mediaP}.`);

    if (mediaP >= 7 && !(n1 > 10) && !(n2 > 10) && !(n3 > 10)) {
      setNotaFinal("Parabéns! Você está aprovado(a)!");
    } else if (mediaP < 3) {
      setResultado(
        `Infelizmente sua média é de apenas ${mediaP} pontos, reprovou automaticamente.`
      );
      setNotaFinal("");
    }

    switch (parseFloat(mediaP)) {
      /* Nota 3 pra cima */
      case 3.0:
        setNotaFinal("Você precisa tirar 9.7 pontos na final.");
        break;
      case 3.1:
        setNotaFinal("Você precisa tirar 9.5 pontos na final.");
        break;
      case 3.2:
        setNotaFinal("Você precisa tirar 9.2 pontos na final.");
        break;
      case 3.3:
        setNotaFinal("Você precisa tirar 9.0 pontos na final.");
        break;
      case 3.4:
        setNotaFinal("Você precisa tirar 8.8 pontos na final.");
        break;
      case 3.5:
        setNotaFinal("Você precisa tirar 8.5 pontos na final.");
        break;
      case 3.6:
        setNotaFinal("Você precisa tirar 8.3 pontos na final.");
        break;
      case 3.7:
        setNotaFinal("Você precisa tirar 8.1 pontos na final.");
        break;
      case 3.8:
        setNotaFinal("Você precisa tirar 7.8 pontos na final.");
        break;
      case 3.9:
        setNotaFinal("Você precisa tirar 7.6 pontos na final.");
        break;

      case 4.0:
        setNotaFinal("Você precisa tirar 7.4 pontos na final.");
        break;
      case 4.1:
        setNotaFinal("Você precisa tirar 7.1 pontos na final.");
        break;
      case 4.2:
        setNotaFinal("Você precisa tirar 6.9 pontos na final.");
        break;
      case 4.3:
        setNotaFinal("Você precisa tirar 6.7 pontos na final.");
        break;
      case 4.4:
        setNotaFinal("Você precisa tirar 6.4 pontos na final.");
        break;
      case 4.5:
        setNotaFinal("Você precisa tirar 6.2 pontos na final.");
        break;
      case 4.6:
        setNotaFinal("Você precisa tirar 6.0 pontos na final.");
        break;
      case 4.7:
        setNotaFinal("Você precisa tirar 5.7 pontos na final.");
        break;
      case 4.8:
        setNotaFinal("Você precisa tirar 5.5 pontos na final.");
        break;
      case 4.9:
        setNotaFinal("Você precisa tirar 5.3 pontos na final.");
        break;

      case 5.0:
        setNotaFinal("Você precisa tirar 5.0 pontos na final.");
        break;
      case 5.1:
        setNotaFinal("Você precisa tirar 4.8 pontos na final.");
        break;
      case 5.2:
        setNotaFinal("Você precisa tirar 4.6 pontos na final.");
        break;
      case 5.3:
        setNotaFinal("Você precisa tirar 4.3 pontos na final.");
        break;
      case 5.4:
        setNotaFinal("Você precisa tirar 4.1 pontos na final.");
        break;
      case 5.5:
        setNotaFinal("Você precisa tirar 3.9 pontos na final.");
        break;
      case 5.6:
        setNotaFinal("Você precisa tirar 3.6 pontos na final.");
        break;
      case 5.7:
        setNotaFinal("Você precisa tirar 3.4 pontos na final.");
        break;
      case 5.8:
        setNotaFinal("Você precisa tirar 3.2 pontos na final.");
        break;
      case 5.9:
        setNotaFinal("Você precisa tirar 2.9 pontos na final.");
        break;

      case 6.0:
        setNotaFinal("Você precisa tirar 2.7 pontos na final.");
        break;
      case 6.1:
        setNotaFinal("Você precisa tirar 2.5 pontos na final.");
        break;
      case 6.2:
        setNotaFinal("Você precisa tirar 2.2 pontos na final.");
        break;
      case 6.3:
        setNotaFinal("Você precisa tirar 2.0 pontos na final.");
        break;
      case 6.4:
        setNotaFinal("Você precisa tirar 1.8 pontos na final.");
        break;
      case 6.5:
        setNotaFinal("Você precisa tirar 1.5 pontos na final.");
        break;
      case 6.6:
        setNotaFinal("Você precisa tirar 1.3 pontos na final.");
        break;
      case 6.7:
        setNotaFinal("Você precisa tirar 1.1 pontos na final.");
        break;
      case 6.8:
        setNotaFinal("Você precisa tirar 0.8 pontos na final.");
        break;
      case 6.9:
        setNotaFinal("Você precisa tirar 0.6 pontos na final.");
        break;

      default:
        setNotaFinal("");
    }
  };

  const EraseCal = () => {
    setNota1("");
    setNota2("");
    setNota3("");
    setResultado("");
    setNotaFinal("");
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Nota da primeira prova"
          style={styles.input}
          value={nota1}
          onChangeText={(text) => setNota1(text)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Nota da segunda prova"
          style={styles.input}
          value={nota2}
          onChangeText={(text) => setNota2(text)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Nota da terceira prova"
          style={styles.input}
          value={nota3}
          onChangeText={(text) => setNota3(text)}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.button}
          onPress={() => {
            Cal();
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Calcular</Text>
        </Pressable>
        <Pressable
          style={styles.buttonErase}
          onPress={() => {
            EraseCal();
          }}
        >
          <Text style={styles.buttonTextErase}>Limpar</Text>
        </Pressable>
        <Modal visible={modalVisible} animationType="fade" transparent={false}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.result}>{resultado}</Text>
              <Text style={styles.result}>{notaFinal}</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: width * 0.03,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginTop: height * 0.01,
    backgroundColor: "white",
    padding: width * 0.025,
    borderRadius: 5,
    height: height * 0.06,
    width: width * 0.9,
    borderColor: "black",
    borderWidth: 1,
  },
  closeButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: width * 0.05,
    fontWeight: "500",
  },
  input: {
    height: height * 0.065,
    width: width * 0.9,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    marginBottom: height * 0.007,
    paddingLeft: width * 0.02,
    fontSize: width * 0.04,
    backgroundColor: "white",
    borderRadius: width * 0.01,
  },
  result: {
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  formContainer: {
    zIndex: 1,
    padding: width * 0.05,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: height * 0.014,
    borderRadius: width * 0.01,
    height: height * 0.06,
    width: width * 0.9,
    margin: height * 0.01,
    elevation: 1,
  },
  buttonErase: {
    backgroundColor: "white",
    padding: height * 0.014,
    borderRadius: width * 0.01,
    height: height * 0.06,
    width: width * 0.9,
    margin: height * 0.001,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "bold",
    fontWeight: "500",
  },
  buttonTextErase: {
    color: "black",
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Calculator;
