import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import ToastManager, { Toast } from "toastify-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const DisciplinesScreen = ({ route }) => {
  const { course, semester, disciplines } = route.params;
  const navigation = useNavigation();

  const [disciplineData, setDisciplineData] = useState(() => {
    const initialData = {};
    disciplines.forEach((discipline) => {
      initialData[discipline] = {
        grade1: 0,
        grade2: 0,
        grade3: 0,
        finalGrade: 0,
        average: 0,
        status: "Pendente",
      };
    });
    return initialData;
  });
  const [visibleDisciplines, setVisibleDisciplines] = useState({});

  const [sliderValues, setSliderValues] = useState(() => {
    const initialSliderValues = {};
    disciplines.forEach((discipline) => {
      initialSliderValues[discipline] = {
        grade1: parseFloat(disciplineData[discipline]?.grade1) || 0,
        grade2: parseFloat(disciplineData[discipline]?.grade2) || 0,
        grade3: parseFloat(disciplineData[discipline]?.grade3) || 0,
      };
    });
    return initialSliderValues;
  });

  const calculateFinalGrade = (discipline) => {
    const sliderValuesForDiscipline = sliderValues[discipline];

    if (!sliderValuesForDiscipline) {
      console.error(
        `Slider values for discipline '${discipline}' are undefined`
      );
      return "-";
    }

    const { grade1, grade2, grade3 } = sliderValuesForDiscipline;

    if (grade1 === undefined || grade2 === undefined || grade3 === undefined) {
      console.error(
        `One or more grades for discipline '${discipline}' are undefined`
      );
      return "-";
    }

    const average = (grade1 + grade2 + grade3) / 3;

    if (isNaN(average)) {
      console.error(`Average for discipline '${discipline}' is NaN`);
      return "-";
    } else {
      return (50 - 7 * average) / 3;
    }
  };

  const updateGrades = async (
    discipline,
    grade1,
    grade2,
    grade3,
    finalGrade
  ) => {
    console.log(`Updating grades for discipline: ${discipline}`);

    const average =
      (parseFloat(grade1) + parseFloat(grade2) + parseFloat(grade3)) / 3;

    setSliderValues((prevValues) => ({
      ...prevValues,
      [discipline]: {
        grade1,
        grade2,
        grade3,
      },
    }));

    setDisciplineData((prevData) => ({
      ...prevData,
      [discipline]: {
        ...prevData[discipline],
        grade1,
        grade2,
        grade3,
        finalGrade,
        average: isNaN(average) ? "-" : average,
      },
    }));

    try {
      // Salvando as notas, média e nota final no AsyncStorage
      await AsyncStorage.setItem(
        `grades_${discipline}`,
        JSON.stringify({
          grade1,
          grade2,
          grade3,
          finalGrade,
          average: isNaN(average) ? "-" : average,
        })
      );
      console.log(`Grades saved for discipline: ${discipline}`);
    } catch (error) {
      console.error("Error saving grades:", error);
    }
  };

  const toggleStatus = async (discipline) => {
    setDisciplineData((prevData) => ({
      ...prevData,
      [discipline]: {
        ...prevData[discipline],
        status:
          prevData[discipline]?.status === "Concluída"
            ? "Pendente"
            : "Concluída",
      },
    }));

    try {
      // Salvando o status no AsyncStorage
      await AsyncStorage.setItem(
        `status_${discipline}`,
        JSON.stringify({
          status:
            disciplineData[discipline]?.status === "Concluída"
              ? "Pendente"
              : "Concluída",
        })
      );
    } catch (error) {
      console.error("Error saving status:", error);
    }
  };

  const toggleVisibility = (discipline) => {
    setVisibleDisciplines((prevVisibility) => ({
      ...prevVisibility,
      [discipline]: !prevVisibility[discipline],
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const dataPromises = disciplines.map(async (discipline) => {
            const grades = await AsyncStorage.getItem(`grades_${discipline}`);
            const status = await AsyncStorage.getItem(`status_${discipline}`);

            console.log(`Loaded data for ${discipline}:`, { grades, status });

            const parsedGrades = JSON.parse(grades);
            const parsedStatus = JSON.parse(status)?.status || "Pendente";

            // Calcula a média na inicialização
            const average =
              parsedGrades &&
              (parsedGrades.grade1 +
                parsedGrades.grade2 +
                parsedGrades.grade3) /
                3;

            return {
              [discipline]: {
                ...parsedGrades,
                status: parsedStatus,
                average: isNaN(average) ? "-" : average,
              },
            };
          });

          const loadedDataArray = await Promise.all(dataPromises);
          const loadedData = Object.assign({}, ...loadedDataArray);

          console.log("Loaded data:", loadedData);

          setDisciplineData(loadedData);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
    }, [route.params.semester]) // Adiciona o semestre como dependência para recarregar os dados ao mudar de semestre
  );

  useEffect(() => {
    // Verifique se os dados foram carregados antes de inicializar o estado sliderValues
    if (Object.keys(disciplineData).length > 0) {
      const initialSliderValues = {};
      disciplines.forEach((discipline) => {
        initialSliderValues[discipline] = {
          grade1: parseFloat(disciplineData[discipline]?.grade1) || 0,
          grade2: parseFloat(disciplineData[discipline]?.grade2) || 0,
          grade3: parseFloat(disciplineData[discipline]?.grade3) || 0,
        };
      });
      setSliderValues(initialSliderValues);
    }
  }, [disciplineData]);

  const [toastDisplayed, setToastDisplayed] = useState(false);

  const calculateProgress = () => {
    const completedDisciplines = disciplines.filter(
      (discipline) => disciplineData[discipline]?.status === "Concluída"
    );
    const progress = completedDisciplines.length / disciplines.length;

    if (progress === 1 && !toastDisplayed) {
      // Substitua o Alert pelo toastify-react-native
      Toast.success("Parabéns, passou de semestre! 🎉");
      setToastDisplayed(true); // Atualiza o estado para indicar que o Toast foi exibido
    }

    return progress;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Resetar a variável toastDisplayed para false ao sair da tela
      setToastDisplayed(false);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {disciplines.map((discipline, index) => (
        <View key={index} style={styles.card}>
          <Pressable onPress={() => toggleVisibility(discipline)}>
            <View style={styles.disciplineTitleContainer}>
              <Text style={styles.disciplineTitle}>{discipline}</Text>
              <FontAwesome
                name={
                  disciplineData[discipline]?.status === "Concluída"
                    ? "check-circle"
                    : "circle"
                }
                size={width * 0.04}
                color={
                  disciplineData[discipline]?.status === "Concluída"
                    ? "#21F078"
                    : "black"
                }
                style={styles.icon}
              />
            </View>
          </Pressable>
          {visibleDisciplines[discipline] && (
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.averageText}>
                  1ª Nota:{" "}
                  {Number((sliderValues[discipline]?.grade1 || 0).toFixed(1))}
                </Text>
                <Slider
                  style={{ flex: 1 }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.1}
                  value={sliderValues[discipline]?.grade1}
                  onValueChange={(value) => {
                    setSliderValues((prevValues) => ({
                      ...prevValues,
                      [discipline]: {
                        ...prevValues[discipline],
                        grade1: value,
                      },
                    }));
                  }}
                  onSlidingComplete={(value) =>
                    updateGrades(
                      discipline,
                      value,
                      sliderValues[discipline]?.grade2,
                      sliderValues[discipline]?.grade3,
                      disciplineData[discipline]?.finalGrade
                    )
                  }
                  minimumTrackTintColor={"#21F078"}
                  maximumTrackTintColor={"#8BFFBC"}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.averageText}>
                  2ª Nota:{" "}
                  {Number((sliderValues[discipline]?.grade2 || 0).toFixed(1))}
                </Text>
                <Slider
                  style={{ flex: 1 }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.1}
                  value={sliderValues[discipline]?.grade2}
                  onValueChange={(value) => {
                    setSliderValues((prevValues) => ({
                      ...prevValues,
                      [discipline]: {
                        ...prevValues[discipline],
                        grade2: value,
                      },
                    }));
                  }}
                  onSlidingComplete={(value) =>
                    updateGrades(
                      discipline,
                      sliderValues[discipline]?.grade1,
                      value,
                      sliderValues[discipline]?.grade3,
                      disciplineData[discipline]?.finalGrade
                    )
                  }
                  minimumTrackTintColor={"#21F078"}
                  maximumTrackTintColor={"#8BFFBC"}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.averageText}>
                  3ª Nota:{" "}
                  {Number((sliderValues[discipline]?.grade3 || 0).toFixed(1))}
                </Text>
                <Slider
                  style={{ flex: 1 }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.1}
                  value={sliderValues[discipline]?.grade3}
                  onValueChange={(value) => {
                    setSliderValues((prevValues) => ({
                      ...prevValues,
                      [discipline]: {
                        ...prevValues[discipline],
                        grade3: value,
                      },
                    }));
                  }}
                  onSlidingComplete={(value) =>
                    updateGrades(
                      discipline,
                      sliderValues[discipline]?.grade1,
                      sliderValues[discipline]?.grade2,
                      value,
                      disciplineData[discipline]?.finalGrade
                    )
                  }
                  minimumTrackTintColor={"#21F078"}
                  maximumTrackTintColor={"#8BFFBC"}
                />
              </View>

              <Text style={styles.averageText}>
                Média:{" "}
                {Math.round((disciplineData[discipline]?.average || "") * 10) /
                  10}
              </Text>
              <View style={styles.inputContainer}>
                {disciplineData[discipline]?.average >= 3 &&
                  disciplineData[discipline]?.average <= 7 && (
                    <Text style={styles.averageText}>
                      Nota Final:{" "}
                      {Math.round(
                        (calculateFinalGrade(discipline) || "") * 10
                      ) / 10}
                    </Text>
                  )}
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => toggleStatus(discipline)}
                  style={[
                    styles.statusButton,
                    {
                      backgroundColor:
                        disciplineData[discipline]?.status === "Concluída"
                          ? "#21F078"
                          : "black",
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {disciplineData[discipline]?.status || "Pendente"}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      ))}

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={calculateProgress()}
          width={width * 0.9}
          height={height * 0.02}
          color="#21F078"
          unfilledColor="#E1E1E1"
          borderWidth={0}
        />
      </View>
      <ToastManager />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
  },
  disciplineTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: width * 0.02, // Adicione esta linha para criar espaço entre o texto e o ícone
  },
  card: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: width * 0.038,
    marginVertical: height * 0.003,
    borderRadius: width * 0.01,
    backgroundColor: "white",
    width: width * 0.9,
    elevation: 1,
  },
  disciplineTitle: {
    fontSize: width * 0.038,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: height * 0.01,
    color: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.005,
  },
  input: {
    flex: 1,
    marginLeft: width * 0.02,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: width * 0.01,
    borderRadius: width * 0.01,
    height: height * 0.06,
    fontSize: width * 0.035,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  statusButton: {
    padding: width * 0.02,
    borderRadius: width * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  icon: {
    color: "#21F078",
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },
  averageText: {
    marginTop: height * 0.005,
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "black",
  },
  progressBarContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
});

export default DisciplinesScreen;
