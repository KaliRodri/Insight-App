// SemestersScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const coursesData = {
  "Ciências Biológicas": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudo Evolutivo das Geosferas",
        "Fundamentos de Química",
        "Tópicos de Física",
        "Biologia Celular e Molecular",
        "Epistemologia da Ciência",
        "Lab. de Leitura e Produção de Texto",
        "Prática Pedagógica I",
        "Seminário Temático I",
      ],
      "Segundo Semestre": [
        "Biofísica",
        "Bioquímica",
        "Biologia dos Protoctistas ",
        "Biologia Vegetal I ",
        "Lab. de Leitura e Produção de Imagens ",
        "Prática Pedagógica II",
        "Genética",
        "Seminário Temático II",
      ],
      "Terceiro Semestre": [
        "Genética",
        "Biologia dos Invertebrados I",
        "Biologia do Desenvolvimento",
        "Anatomia e Organografia Vegetal",
        "Prática Pedagógica III",
        "Seminário Temático III",
      ],
      "Quarto Semestre": [
        "Biologia dos Invertebrados II",
        "Sistemática Vegetal",
        "Genética e Evolução",
        "Bioestatística",
        "Biologia dos Fungos",
        "Prática Pedagógica IV",
        "Seminário Temático IV",
      ],
      "Quinto Semestre": [
        "Biologia de Cordados",
        "Microbiologia",
        "Fisiologia Vegetal",
        "Ecologia Geral",
        "Prática Pedagógica e Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Fisiologia Animal Comparada",
        "Anatomia dos Vertebrados",
        "Bioética",
        "Projeto de Pesquisa I",
        "Prática Pedagógica e Estágio Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Paleontologia",
        "Ecologia e Meio Ambiente",
        "Projeto de Pesquisa II",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": ["Monografia", "Estágio Supervisionado II"],
    },
  },
  "Educação Física": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Metodologia do Trabalho Científico I",
        "Didática",
        "Fundamentos Anátomo-biológicos",
        "Fundamentos Sócio-antropológicos",
        "Conhecimento e Metodologia do Jogo",
        "Oficina I Atividade Física ",
      ],
      "Segundo Semestre": [
        "Fundamentos Histórico-Filosóficos",
        "História da Educação Física e Esporte",
        "Atividade Física e Saúde Coletiva",
        "Ordenamento Legal e Políticas Públicas em Educação Física, Esporte e Lazer",
        "Conhecimento e Metodologia do Esporte I",
        "Oficina II Biodança",
      ],
      "Terceiro Semestre": [
        "Metodologia do Trabalho Científico II",
        "Medidas e Avaliação em Atividade Física",
        "Psicologia da Educação",
        "Corpo e Movimento para Pessoas com Deficiência",
        "Conhecimento e Metodologia do Esporte II",
        "Oficina III Futebol",
      ],
      "Quarto Semestre": [
        "Lazer e Meio Ambiente",
        "Fisiologia do Exercício",
        "Conhecimento e Metodologia da Dança",
        "Conhecimento e Metodologia da Ginástica hidroginástica",
        "Oficina IV Atletismo",
      ],
      "Quinto Semestre": [
        "Políticas de Educação e Gestão Escolar",
        "Primeiros Socorros",
        "Conhecimento e Metodologia da Natação",
        "Conhecimento e Metodologia da Capoeira",
        "Estágio Curricular I",
        "LIBRAS - Língua Brasileira de Sinais",
      ],
      "Sexto Semestre": [
        "Mídia, Esporte e Lazer",
        "Educação e Ludicidade",
        "Conhecimento e Metodologia do Treinamento Corporal Esportivo",
        "Conhecimento e Metodologia da Luta",
        "Estágio Curricular II",
        "Conhecimento e Metodologia da Cultura Afro-brasileira e Indígena",
      ],
      "Sétimo Semestre": [
        "Projeto de Pesquisa",
        "Atividade Física para Grupos Especiais",
        "Oficina V (Corpo e Cultura)",
        "Estágio Curricular III",
      ],
      "Oitavo Semestre": ["TCC Monografia", "Estágio Curricular IV"],
    },
  },
  "Eng. Ambiental e Sanitária": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Décimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Geometria Analítica",
        "Cálculo 1",
        "Química Geral",
        "Int. à Eng. Sanitária e Ambiental",
        "Leitura e Produção de Texto",
        "Biologia Geral",
        "Desenho Técnico",
      ],
      "Segundo Semestre": [
        "Álgebra Linar",
        "Cálculo II",
        "Química Orgânica",
        "Geologia e Solos",
        "Ecologia Geral",
        "Biologia Sanitária e Ambiental",
        "Geometria Descritiva",
      ],
      "Terceiro Semestre": [
        "Física I",
        "Cálculo III",
        "Bioquímica",
        "Topografia",
        "Ecossistemas Aquáticos e Terrestres e suas Interfaces",
        "Poluição e Impacto Ambiental",
        "Computação",
      ],
      "Quarto Semestre": [
        "Fisica II",
        "Tópicos Sociológicos e Antropológicos",
        "Mecânica dos Solos",
        "Cartografia e Geoprocessamento",
        "Climatologia",
        "Métodos Numéricos e Computacionais",
        "Legislação Ambiental e Sanitária",
      ],
      "Quinto Semestre": [
        "Física III",
        "Microbiologia Ambiental",
        "Química Ambiental",
        "Estatística Básica",
        "Hidrologia e Solo",
        "Análise Ambiental",
      ],
      "Sexto Semestre": [
        "Física Ambiental",
        "Fenômenos de Transporte",
        "Hidráulica I",
        "Resistência dos Materiais",
        "Materiais e Técnicas de Construção",
        "Administração Básica",
        "Controle de Poluição das Águas",
      ],
      "Sétimo Semestre": [
        "Biotecnologia e Meio Ambiente",
        "Educação Ambiental",
        "Hidráulica II",
        "Saúde Pública e Ambiental",
        "Planejamento e Gestão Ambiental",
        "Economia e Meio Ambiente",
      ],
      "Oitavo Semestre": [
        "Mecânica dos Fluídos",
        "Projeto de Pesquisa",
        "Obras Hidráulicas",
        "Sistema de Abastecimento e Tratamento de Água",
        "Resíduos Sólidos e Gestão",
        "Controle e Recuperação de Áreas Degradadas",
      ],
      "Nono Semestre": [
        "Estágio Supervisionado I",
        "Orientação de TCC",
        "Recursos Naturais e Manejo",
        "Drenagem e Controle de Enchentes",
        "Sistema de Esgotamento",
        ,
      ],
      "Décimo Semestre": [
        "Estágio Supervisionado II",
        "Controle de Poluição Atmosférica",
        "Trabalho de Conclusão de Curso",
      ],
    },
  },
  História: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudo Evolutivo das Geosferas",
        "Fundamentos de Química",
        "Tópicos de Física",
        "Biologia Celular e Molecular",
        "Epistemologia da Ciência",
        "Lab. de Leitura e Produção de Texto",
        "Prática Pedagógica I",
        "Seminário Temático I",
      ],
      "Segundo Semestre": [
        "Biofísica",
        "Bioquímica",
        "Biologia dos Protoctistas ",
        "Biologia Vegetal I ",
        "Lab. de Leitura e Produção de Imagens ",
        "Prática Pedagógica II",
        "Genética",
        "Seminário Temático II",
      ],
      "Terceiro Semestre": [
        "Genética",
        "Biologia dos Invertebrados I",
        "Biologia do Desenvolvimento",
        "Anatomia e Organografia Vegetal",
        "Prática Pedagógica III",
        "Seminário Temático III",
      ],
      "Quarto Semestre": [
        "Biologia dos Invertebrados II",
        "Sistemática Vegetal",
        "Genética e Evolução",
        "Bioestatística",
        "Biologia dos Fungos",
        "Prática Pedagógica IV",
        "Seminário Temático IV",
      ],
      "Quinto Semestre": [
        "Biologia de Cordados",
        "Microbiologia",
        "Fisiologia Vegetal",
        "Ecologia Geral",
        "Prática Pedagógica e Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Fisiologia Animal Comparada",
        "Anatomia dos Vertebrados",
        "Bioética",
        "Projeto de Pesquisa I",
        "Prática Pedagógica e Estágio Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Paleontologia",
        "Ecologia e Meio Ambiente",
        "Projeto de Pesquisa II",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": ["Monografia", "Estágio Supervisionado II"],
    },
  },
  Vernáculas: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudos Filosóficos",
        "Significação e Contexto",
        "Estudos Teóricos do Texto Literário",
        "Leitura e Produção de Texto",
        "Estabelecimento dos Estudos Lingüísticos",
        "Prática Pedagógica I",
        "Seminário Interdisciplinar de Pesquisa I",
      ],
      "Segundo Semestre": [
        "Morfologia e Construção do Significado",
        "Tradição e Ruptura em Literaturas de Língua Portuguesa",
        "Estudos Sócio-Antropológicos",
        "Estudo da Produção Literária no Brasil",
        "Prática Pedagógica II",
        "Seminário Interdisciplinar de Pesquisa II",
      ],
      "Terceiro Semestre": [
        "Estudos Epistemológicos da Aprendizagem",
        "Construção do Sentido no Texto Literário",
        "Relações Sintáticas na Língua",
        "O Estético e o Lúdico na Literatura Infanto- Juvenil",
        "Literatura e Outras Artes",
        "Prática Pedagógica III",
        "Seminário Interdisciplinar de Pesquisa III",
      ],
      "Quarto Semestre": [
        "Psicologia e Educação",
        "Texto e Discurso",
        "Cânones e Contextos na Literatura Brasileira",
        "Estudos Fonéticos e Fonológicos",
        "Diversidade Lingüística",
        "Prática Pedagógica IV",
        "Seminário Interdisciplinar de Pesquisa IV",
      ],
      "Quinto Semestre": [
        "Cânones e Contextos na Literatura Portuguesa",
        "Constituição das Línguas Românicas",
        "Literatura e Cultura Afro-Brasileira",
        "Língua e Cultura Latinas",
        "Estudo da Ficção Brasileira Contemporânea",
        "Seminário Interdisciplinar de Pesquisa V",
        "Formação Histórica das Línguas Românicas",
      ],
      "Sexto Semestre": [
        "Literatura: Crítica, História, Cultura e Sociedade",
        "Língua Estrangeira Instrumental I",
        "Aspectos da Literatura Portuguesa",
        "Língua e Literatura Latinas",
        "Seminário Interdisciplinar de Pesquisa VI",
        "Constituição Histórica do Português Brasileiro",
        "Estudos da Produção Literária Baiana",
        "Crítica Textual: Edições e Estudos",
      ],
      "Sétimo Semestre": [
        "Seminário Interdisciplinar de Pesquisa VII",
        "Estágio Curricular Sup. III",
        "Constituição Histórica do Português Brasileiro",
        "Estudo da Produção Literária Baiana",
        "Crítica Textual: ED. e Estudos",
        "Lingua Estrangeira Instrumental II",
      ],
      "Oitavo Semestre": ["Estágio Curricular Supervisionado IV", "TCC"],
    },
  },
  "Língua Francesa e Literatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Aspectos Hist. e Cult. em Lingua Francesa",
        "Aspectos Hist. e Cult. em Lingua Materna",
        "Estudos Soc. Antrop. Ens. L. Fran.",
        "Lingua Portuguesa Instrumental",
        "Lingua Francesa Instrumental",
        "Lingua Francesa - Básico I",
        "Núcleo de Est. Intercisc. I",
      ],
      "Segundo Semestre": [
        "Estudos Filosóficos",
        "Leitura e Produção Textual",
        "Teo. Lit. em Lingua Fran. e Lingua Materna",
        "Aspectos Históricos e Culturais da África e da Diáspora ",
        "Estudos Linguísticos I",
        "Lingua Francesa - Básico II",
        "Núcleo de Est. Interdisciplinar II",
      ],
      "Terceiro Semestre": [
        "Compreensão e Produção Oral",
        "Est. da Morf. da Lingua Francesa I",
        "Estudos Fonéticos e Fonológicos I",
        "Estudos Linguísticos II",
        "Lingua Francesa-Intermediaria",
        "Núcleo de Est. Interdisciplinar III",
        "Panorama da Prod. Lit.: Da Origem Até a Modernidade",
      ],
      "Quarto Semestre": [
        "Lingua Francesa-Intermed. II",
        "Núcleo de Est. Interdisciplinar IV",
        "Políticas e Org. dos Sist. de Ensino",
        "Estudos Fonét. e Fonológicos II",
        "Estudos Comp. da Lit. em Lingua Francesa",
        "Produção do Texto Oral e Escrito",
        "Est. da Morf. da Lingua Francesa II",
      ],
      "Quinto Semestre": [
        "Estágio Curricular Supervisionado I",
        "Estudos Comparativos Linguísticos",
        "Estudos Comparativos da Lit. Francesa",
        "Estudos Fonéticos e Fonológicos III",
        "Lingua Francesa Intermediário III",
        "Linguística Aplicada no Ens. da Ling. Francesa I",
        "Núcleo de Estudos Interdisciplinares V",
      ],
      "Sexto Semestre": [
        "Libras",
        "Lingua Francesa Avançado I",
        "Núcleo de Estudos Interdisciplinares VI",
        "Estágio Curricular Supervisionado II",
        "Estudo Comp. da Lit. de Lingua Franc. e Ling. Materna",
        "Linguistica Aplicada e Lingua Francesa II",
        "LSP - Ensino da Ling. Franc. para fins específicos ",
      ],
      "Sétimo Semestre": [
        "Lingua Francesa - Avançado II",
        "TCC I",
        "Estágio Curricular Supervisionado III",
        "Prática de Tradução",
        "Análise Literária",
        "Novas Tecnologias E. D. e L. L. Francesa",
      ],
      "Oitavo Semestre": [
        "Lingua Francesa - Avançado III",
        "TCC II",
        "Estágio Curricular Supervisionado IV",
      ],
    },
  },
  "Lingua Inglesa e Literatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudo Evolutivo das Geosferas",
        "Fundamentos de Química",
        "Tópicos de Física",
        "Biologia Celular e Molecular",
        "Epistemologia da Ciência",
        "Lab. de Leitura e Produção de Texto",
        "Prática Pedagógica I",
        "Seminário Temático I",
      ],
      "Segundo Semestre": [
        "Biofísica",
        "Bioquímica",
        "Biologia dos Protoctistas ",
        "Biologia Vegetal I ",
        "Lab. de Leitura e Produção de Imagens ",
        "Prática Pedagógica II",
        "Genética",
        "Seminário Temático II",
      ],
      "Terceiro Semestre": [
        "Genética",
        "Biologia dos Invertebrados I",
        "Biologia do Desenvolvimento",
        "Anatomia e Organografia Vegetal",
        "Prática Pedagógica III",
        "Seminário Temático III",
      ],
      "Quarto Semestre": [
        "Biologia dos Invertebrados II",
        "Sistemática Vegetal",
        "Genética e Evolução",
        "Bioestatística",
        "Biologia dos Fungos",
        "Prática Pedagógica IV",
        "Seminário Temático IV",
      ],
      "Quinto Semestre": [
        "Biologia de Cordados",
        "Microbiologia",
        "Fisiologia Vegetal",
        "Ecologia Geral",
        "Prática Pedagógica e Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Fisiologia Animal Comparada",
        "Anatomia dos Vertebrados",
        "Bioética",
        "Projeto de Pesquisa I",
        "Prática Pedagógica e Estágio Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Paleontologia",
        "Ecologia e Meio Ambiente",
        "Projeto de Pesquisa II",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": ["Monografia", "Estágio Supervisionado II"],
    },
  },
  Matemática: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Matemática I",
        "Lógica",
        "Desenho Geométrico I",
        "Leitura e Produção Textual I",
        "Metodologia da Pesquisa I",
        "Informática I",
        "Psicologia I",
        "Tópicos Sócio-Antropológico-Filosófico - TSF",
        "Políticas Educacionais I",
        "Seminário Temático I (Linguagem e Representação Matemática)",
      ],
      "Segundo Semestre": [
        "Geometria Plana",
        "Geometria Analítica I",
        "Geometria Descritiva I",
        "Matemática II",
        "Leitura e Produção Textual II",
        "Metodologia da Pesquisa II",
        "Psicologia II",
        "Análise e Reflexão do Processo Ensino da Matemática - ARPE",
        "Políticas Educacionais II",
        "Seminário Temático II (Representação Geométrica I)",
      ],
      "Terceiro Semestre": [
        "Geometria Espacial",
        "Geometria Analítica II",
        "Matemática III",
        "Leitura e Produção Textual III",
        "Metodologia da Pesquisa III",
        "Laboratório do Ensino da Matemática I",
        "Didática",
        "Introdução a Língua Brasileira de Sinais",
        "Seminário Temático III (Representação Geométrica II)",
      ],
      "Quarto Semestre": [
        "Cálculo I",
        "Estatística I",
        "Algebra Linear I",
        "Leitura e Produção Textual IV",
        "Informática II",
        "Laboratório do Ensino da Matemática II",
        "Didática da Matemática",
        "História e Cultura Afro-brasileira e Indígena",
        "Seminário Temático IV (Pesquisa em Educação Matemática)",
      ],
      "Quinto Semestre": [
        "Cálculo II",
        "Física I",
        "Algebra Linear II",
        "Estrutura Algébrica I",
        "Leitura e Produção Textual V",
        "Softwares Matemáticos",
        "Estágio I",
      ],
      "Sexto Semestre": [
        "Cálculo III",
        "Física II",
        "Estrutura Algébrica II",
        "Trabalho de Conclusão de Curso I",
        "História da Matemática",
        "Estágio II",
      ],
      "Sétimo Semestre": [
        "Cálculo IV",
        "Física III",
        "Estrutura Algébrica III",
        "Trabalho de Conclusão de Curso II",
        "Estágio III",
      ],
      "Oitavo Semestre": [
        "Análise Real",
        "Trabalho de Conclusão de Curso III",
        "Estágio IV",
      ],
    },
  },
  "Sistemas de Informação": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudos Sócio Filosóficos",
        "Comunicação e Expressão",
        "Lógica e Matemática Discreta",
        "Teoria Geral da Administração",
        "Algoritmos",
        "Fundamentos da Informática",
      ],
      "Segundo Semestre": [
        "Metodologia da Pesquisa",
        "Sistemas de Informação",
        "Cálculo I",
        "Aplicações da Informática",
        "Linguagem de Programação I",
        "Arquitetura de Computadores",
      ],
      "Terceiro Semestre": [
        "OSM",
        "Ética e Direito em Informática",
        "Cálculo II",
        "Introdução a Estrutura de Dados",
        "Linguagem de Programação II",
        "Sistemas Operacionais",
      ],
      "Quarto Semestre": [
        "Probabilidade e Estatística",
        "Contabilidade",
        "Metodologia de Desenvolvimento de Sistemas I",
        "Estrutura de Dados",
        "Linguagem de Programação III",
        "Introdução a Redes de Computadores",
        "Tópicos Especiais em Sistemas de Informação",
      ],
      "Quinto Semestre": [
        "Teoria dos Grafos",
        "Psicologia Aplicada as Organizações",
        "Metodologia de Desenvolvimento de Sistemas II",
        "Introdução a Banco de Dados",
        "Interface Homem-Máquina",
        "Redes de Computadores",
      ],
      "Sexto Semestre": [
        "Economia",
        "Auditoria e Segurança de Sistemas",
        "Engenharia de Software",
        "Banco de Dados",
        "Laboratório de Aplicações Web",
        "Sistemas Distribuídos",
        "Estágio Supervisionado I",
      ],
      "Sétimo Semestre": [
        "Núcleo de Demandas Específicas",
        "Inteligência Artificial",
        "Sistemas Multimídia",
        "Planejamento Estratégico em TI",
        "Gerência de Projeto de Sistemas",
        "Projeto de Pesquisa em Informática",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": [
        "Núcleo de Demandas Específicas",
        "Trabalho de Conclusão de Curso",
        "Empreendedorismo",
        "Tópicos Especiais em Engenharia de Software",
        "Gestão de Pessoas",
        "Gestão do Conhecimento",
        "Estágio Supervisionado III",
      ],
    },
  },
  // Adicione as disciplinas para cada semestre e curso aqui
};

const SemestersScreen = ({ navigation, route }) => {
  const { course } = route.params;
  const { semesters, disciplines } = coursesData[course];

  const renderItem = ({ item }) => {
    const semesterDisciplines = disciplines[item];
    const numberOfDisciplines = semesterDisciplines
      ? semesterDisciplines.length
      : 0;

    return (
      <TouchableOpacity
        style={styles.semesterButton}
        onPress={() =>
          navigation.navigate("Disciplinas", {
            course,
            semester: item,
            disciplines: semesterDisciplines,
          })
        }
      >
        <Text style={styles.semesterButtonText}>
          {item} - {numberOfDisciplines} disciplinas
        </Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: width * 0.03, // Use proporções relativas para o padding
      borderRadius: width * 0.02, // Use proporções relativas para o borderRadius
    },
    semesterButton: {
      backgroundColor: "white",
      padding: width * 0.04, // Use proporções relativas para o padding
      marginVertical: height * 0.003, // Use proporções relativas para a margem vertical
      borderRadius: width * 0.01, // Use proporções relativas para o borderRadius
      width: width * 0.9, // Use proporções relativas para a largura
      borderColor: "#E1E1E1",
      borderWidth: 1,
      elevation: 1,
    },
    semesterButtonText: {
      fontSize: width * 0.035, // Use proporções relativas para o tamanho da fonte
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={semesters}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default SemestersScreen;
