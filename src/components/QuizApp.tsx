"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, Award, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
  justification: string;
}

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const questions: Question[] = [
    {
        questionText: "¿Cuál es el propósito principal del empaque más allá de contener un producto?",
        options: [
            "Mejorar la apariencia del producto",
            "Comunicar los valores de la marca y generar confianza",
            "Garantizar una producción de bajo costo",
            "Aumentar la durabilidad del producto"
        ],
        correctAnswer: 1,
        justification: "El empaque no solo protege el producto, sino que también comunica los valores de la marca y y actúa como un vendedor silencioso que genera confianza en los consumidores."
    },
    {
        questionText: "¿Cuál de los siguientes describe mejor la cuarta dimensión del empaque?",
        options: [
            "Durabilidad del material",
            "Conexión emocional con los consumidores",
            "Colocación del código de barras",
            "Análisis de la estructura del empaque"
        ],
        correctAnswer: 1,
        justification: "La cuarta dimensión del empaque refiere a la conexión emocional que se establece entre el empaque y el consumidor, fortaleciendo su vínculo con la marca."
    },
    {
        questionText: "¿Qué papel desempeña principalmente el color en el diseño del empaque?",
        options: [
            "Reforzar la identidad de la marca y crear un impacto visual",
            "Fortalecer estructuralmente el empaque",
            "Reducir el impacto ambiental",
            "Proporcionar información detallada del producto"
        ],
        correctAnswer: 0,
        justification: "El color en el empaque es clave para expresar emociones y captar la atención, ayudando a que el producto refuerce su identidad de marca e impacte visualmente."
    },
    {
        questionText: "¿Qué factor es el más crucial al diseñar etiquetas para productos como el vino?",
        options: [
            "Incorporar colores vibrantes",
            "Garantizar la reciclabilidad del material",
            "Seducir y convencer a los consumidores a través de la narrativa",
            "Minimizar los costos de producción"
        ],
        correctAnswer: 2,
        justification: "Las etiquetas de productos como el vino deben capturar la atención y seducir al consumidor mediante una narrativa visual que convenza y comunique la esencia del producto."
    },
    {
        questionText: "¿De qué manera la colocación del código de barras influye en la percepción del consumidor?",
        options: [
            "Haciendo el empaque más fácil de manejar",
            "Mediante el uso creativo para provocar una sonrisa o mejorar la estética",
            "Aumentando la vida útil del producto",
            "Determinando el precio"
        ],
        correctAnswer: 1,
        justification: "El uso creativo de elementos funcionales como el código de barras contribuye a mejorar la estética y la experiencia visual del empaque."
    },
    {
        questionText: "¿Cuál es una función clave del empaque sostenible?",
        options: [
            "Aumentar el costo del producto para enfatizar la calidad",
            "Optimizar el uso de materiales y energía",
            "Crear altos niveles de complejidad visual",
            "Garantizar que el producto se destaque en el estante"
        ],
        correctAnswer: 1,
        justification: "El empaque sostenible busca optimizar el uso de materiales y energía para minimizar el impacto ambiental."
    },
    {
        questionText: "¿Cuál de las siguientes es la estrategia más efectiva para crear una conexión emocional a través del empaque?",
        options: [
            "Usar formas altamente complejas para atraer la atención",
            "Proporcionar instrucciones detalladas en todos los lados del empaque",
            "Utilizar tanto el diseño estructural como el gráfico para reforzar la experiencia de la marca",
            "Añadir un código de barras solo en la parte posterior"
        ],
        correctAnswer: 2,
        justification: "El diseño estructural y gráfico en conjunto fortalecen la experiencia de la marca y crean una conexión emocional más sólida con el consumidor."
    },
    {
        questionText: "¿Qué tipo de material de empaque se combina comúnmente con el aluminio para experiencias premium?",
        options: [
            "Cartón",
            "Vidrio",
            "Plástico corrugado",
            "Laminados metálicos"
        ],
        correctAnswer: 3,
        justification: "Los laminados metálicos suelen usarse junto al aluminio para dar una apariencia premium y sofisticada al empaque."
    },
    {
        questionText: "¿Cómo beneficia el empaque accesible a los consumidores?",
        options: [
            "Maximiza la visibilidad de la marca en los estantes",
            "Minimiza la necesidad de interacción táctil",
            "Reduce el esfuerzo y la fatiga del usuario para personas con diferentes habilidades",
            "Mejora el sabor del producto mediante una mejor exposición olfativa"
        ],
        correctAnswer: 2,
        justification: "El diseño accesible reduce el esfuerzo y la fatiga de los usuarios, facilitando la interacción del empaque para personas con diferentes habilidades."
    },
    {
        questionText: "¿Cuál de las siguientes representa una 'versión beta' del empaque?",
        options: [
            "Un diseño final listo para la producción masiva",
            "Un prototipo sujeto a comentarios de los consumidores para futuras mejoras",
            "Una versión que utiliza materiales de baja calidad para reducir costos",
            "Una versión estándar utilizada por otras marcas"
        ],
        correctAnswer: 1,
        justification: "Las versiones beta de un empaque se prueban con consumidores para recopilar comentarios y mejorar el diseño antes del lanzamiento final."
    },
    {
        questionText: "¿Cuál es la diferencia entre empaque primario, secundario y terciario?",
        options: [
            "El primario solo se ocupa de la contención, el secundario es promocional y el terciario es inexistente",
            "El primario está orientado al consumidor, el secundario al transporte a granel, y el terciario se utiliza en el envío y logística",
            "El primario se ocupa del reciclaje, el secundario de la estética, el terciario del etiquetado",
            "El primario es para productos de lujo, el secundario para bienes de consumo, el terciario para productos perecederos"
        ],
        correctAnswer: 1,
        justification: "El empaque primario está en contacto directo con el consumidor, el secundario agrupa para el transporte, y el terciario facilita la distribución en la cadena logística."
    },
    {
        questionText: "¿Cómo mejora el minimalismo en el empaque la experiencia del consumidor?",
        options: [
            "Eliminando información esencial para crear una apariencia elegante",
            "Reduciendo el tiempo de toma de decisiones y destacando elementos importantes",
            "Garantizando el uso de materiales complejos y lujosos",
            "Creando una estética confusa para fomentar un mayor examen"
        ],
        correctAnswer: 1,
        justification: "El minimalismo en el empaque resalta los elementos esenciales y facilita la toma de decisiones del consumidor al destacar la información clave."
    },
    {
        questionText: "¿Qué aspecto es esencial para diseñar un empaque que resuene con la narrativa de la marca?",
        options: [
            "Tipografía uniforme y poco distintiva",
            "Uso consistente de códigos visuales relevantes para la categoría y la esencia de la marca",
            "Uso de la mayor cantidad de colores posible para captar la atención",
            "Ausencia de cualquier información textual"
        ],
        correctAnswer: 1,
        justification: "El uso de códigos visuales coherentes con la marca permite que el empaque comunique de forma clara y efectiva la narrativa de la marca."
    },
    {
        questionText: "En el contexto del empaque y el medio ambiente, ¿por qué es fundamental el papel del consumidor?",
        options: [
            "Los consumidores eligen productos únicamente en función de la estética del material",
            "Las decisiones de compra de los consumidores influyen en las prácticas sostenibles y la selección de materiales",
            "El consumidor no tiene impacto en la sostenibilidad ambiental",
            "Solo las empresas y los organismos reguladores son responsables de la sostenibilidad"
        ],
        correctAnswer: 1,
        justification: "Las decisiones de compra de los consumidores influyen en la sostenibilidad, ya que pueden motivar a las empresas a usar materiales ecológicos y prácticas responsables."

    },
    {
        questionText: "¿Cuál es un beneficio importante de implementar principios de diseño universal en el empaque?",
        options: [
            "Exclusividad para usuarios de alta gama",
            "Comercialización en todos los segmentos y facilidad de acceso",
            "Reducción de costos en la producción",
            "Adaptabilidad limitada a diferentes categorías de productos"
        ],
        correctAnswer: 1,
        justification: "El diseño universal facilita que el empaque sea accesible y utilizable para un público amplio, garantizando un uso inclusivo en todos los segmentos."
    },
    {
        questionText: "¿En qué debe centrarse el empaque secundario?",
        options: [
            "Maximizar el peso para la durabilidad",
            "Garantizar que pueda ser reutilizado por el consumidor",
            "Mostrar rasgos de personalidad de la marca y ofrecer apilabilidad funcional",
            "Hacerlo invisible en el punto de venta"
        ],
        correctAnswer: 2,
        justification: "El empaque secundario debe reflejar la personalidad de la marca, además de ser funcional y optimizado para el almacenamiento y transporte.",
    },
    {
        questionText: "¿Cuál de los siguientes elementos es clave para crear una experiencia de empaque memorable después de la compra?",
        options: [
            "Garantizar una interacción mínima del consumidor con el empaque",
            "Incorporar elementos sorpresa dentro del empaque que alineen con los valores de la marca",
            "Usar solo empaques genéricos para evitar ofender a nadie",
            "Eliminar todo contenido no esencial para reducir costos"
        ],
        correctAnswer: 1,
        justification: "Elementos sorpresa que alineen con los valores de la marca crean una experiencia memorable y satisfactoria para el consumidor después de la compra."
    },
    {
        questionText: "¿Cuál es el objetivo principal de utilizar jerarquías visuales en el diseño del empaque?",
        options: [
            "Hacer que el empaque parezca abarrotado y colorido",
            "Facilitar la comprensión fácil de la información clave del producto",
            "Crear un flujo visual caótico e impredecible",
            "Distraer a los consumidores del mensaje de la marca"
        ],
        correctAnswer: 1,
        justification: "Las jerarquías visuales facilitan la comprensión rápida de la información clave sobre el producto, mejorando la experiencia del consumidor."
    },
    {
        questionText: "¿Cómo impacta el aspecto emocional del diseño del empaque en la lealtad del consumidor?",
        options: [
            "Solo enfocándose en colores brillantes para atraer a los niños",
            "Generando asociaciones positivas con los valores de la marca que fomentan compras repetidas",
            "Eliminando toda marca para enfatizar solo el contenido",
            "Añadiendo símbolos no relacionados para evocar curiosidad"
        ],
        correctAnswer: 1,
        justification: "El vínculo emocional que establece el empaque mediante asociaciones positivas refuerza la lealtad del consumidor hacia la marca."
    },
    {
        questionText: "¿Qué estrategia debe emplear una marca si quiere destacarse en una categoría dominada por un líder establecido?",
        options: [
            "Copiar todos los elementos de empaque exitosos del líder del mercado",
            "Innovar segmentando la categoría y creando identificadores de empaque únicos",
            "Usar los mismos colores que los competidores para integrarse",
            "Evitar diseñar cualquier empaque visual para enfocarse solo en la calidad del producto"
        ],
        correctAnswer: 1,
        justification: "Diferenciarse en una categoría saturada se logra mediante innovación en el diseño del empaque, creando una identidad única que destaque."
    },
    {
        questionText: "¿Cómo pueden los materiales ecológicos en el empaque influir en la imagen de una marca?",
        options: [
            "No tiene un impacto significativo en la percepción del consumidor",
            "Retrata a la marca como socialmente responsable y atrae a consumidores conscientes del medio ambiente",
            "Garantiza la superioridad del producto sobre otros",
            "Principalmente aumenta el costo de producción"
        ],
        correctAnswer: 1,
        justification: "El uso de materiales ecológicos en el empaque proyecta una imagen de marca socialmente responsable y atrae a consumidores conscientes del medio ambiente."
    },
    {
        questionText: "¿Qué consideración clave se debe tener al elegir entre vidrio y plástico como material de empaque?",
        options: [
            "El vidrio siempre se prefiere por su rentabilidad",
            "El plástico no puede moldearse en diferentes formas",
            "El vidrio proporciona una sensación premium y es completamente reciclable, pero es más pesado que el plástico",
            "El plástico no causa daño al medio ambiente"
        ],
        correctAnswer: 2,
        justification: "El vidrio brinda una experiencia premium y es completamente reciclable, aunque es más pesado que el plástico, lo que puede afectar el transporte."
    },
    {
        questionText: "¿Cuál de las siguientes es una desventaja importante del uso del metal como material de empaque?",
        options: [
            "Es difícil de imprimir",
            "Proporciona una protección insuficiente al producto",
            "Es propenso a reacciones químicas con ciertos contenidos",
            "Carece de valor estético"
        ],
        correctAnswer: 2,
        justification: "El metal puede reaccionar químicamente con ciertos contenidos, lo que limita su uso en algunos tipos de productos."
    },
    {
        questionText: "¿Qué aspecto del diseño de etiquetas es crucial para un producto dirigido a consumidores mayores?",
        options: [
            "Tipografías pequeñas y complejas para atraer sofisticación",
            "Alto contraste y tipografías grandes para mejorar la legibilidad",
            "Colores brillantes para atraer la atención",
            "Información mínima para mantenerlo simple"
        ],
        correctAnswer: 1,
        justification: "Para consumidores mayores, las etiquetas con alto contraste y tipografías grandes mejoran la legibilidad y facilitan la comprensión."
    },
    {
        questionText: "¿Cuál de las siguientes describe mejor el papel del empaque terciario?",
        options: [
            "Mejora el atractivo en el estante",
            "Proporciona información de marketing adicional",
            "Agrupa múltiples productos para un transporte eficiente",
            "Protege el producto de la luz ultravioleta"
        ],
        correctAnswer: 2,
        justification: "El empaque terciario agrupa múltiples productos y facilita su transporte eficiente en la cadena de distribución."
    },
    {
        questionText: "¿Cómo afecta el uso de material de empaque transparente a la percepción del consumidor?",
        options: [
            "Oculta la calidad del producto",
            "Permite a los consumidores ver directamente el producto, mejorando la confianza y la transparencia",
            "Hace que el producto sea más caro",
            "Desalienta las compras impulsivas"
        ],
        correctAnswer: 1,
        justification: "Un empaque transparente permite ver el producto, lo que aumenta la confianza del consumidor al ofrecer una sensación de transparencia."
    },
    {
        questionText: "¿Cuál es una posible desventaja de utilizar diseños de empaque demasiado complejos?",
        options: [
            "Simplifica el proceso de decisión del consumidor",
            "Puede confundir a los consumidores y disuadir la compra",
            "Siempre conduce a un aumento de ventas",
            "Es más fácil de producir"
        ],
        correctAnswer: 1,
        justification: "Los diseños de empaque demasiado complejos pueden confundir al consumidor y dificultar la decisión de compra."
    },
    {
        questionText: "¿Qué material es más adecuado para empaques de alimentos que requieren un sello hermético?",
        options: [
            "Papel",
            "Vidrio",
            "Plástico",
            "Aluminio"
        ],
        correctAnswer: 3,
        justification: "El aluminio es ideal para empaques que requieren un sello hermético, especialmente en productos alimentarios que necesitan conservación."
    },
    {
        questionText: "¿Cuál es el propósito principal del concepto de 'empaque universal'?",
        options: [
            "Atraer solo a un grupo específico de consumidores",
            "Garantizar que el empaque sea fácil de usar para personas de todas las edades y habilidades",
            "Reducir el costo de producción al usar un diseño simplificado",
            "Diseñar exclusivamente para consumidores de alto nivel socioeconómico"
        ],
        correctAnswer: 1,
        justification: "El empaque universal asegura que sea fácil de usar para personas de todas las edades y habilidades, promoviendo la inclusión."
    },
    {
        questionText: "¿Cuál de las siguientes estrategias es más efectiva para reducir el impacto ambiental de los empaques?",
        options: [
            "Usar el mayor volumen de plástico posible",
            "Reducir la cantidad de tinta utilizada y utilizar materiales reciclables",
            "Hacer el empaque más voluminoso para enfatizar la calidad",
            "Usar etiquetas grandes y detalladas para informar al consumidor"
        ],
        correctAnswer: 1,
        justification: "Reducir la cantidad de tinta y usar materiales reciclables son prácticas recomendadas para disminuir el impacto ambiental del empaque."
    },
    {
        questionText: "¿Quien es el mejor novio del mundo?",
        options: [
            "Marcos Quiroga",
            "Quiroga Marcos",
            "Marcos Dario Quiroga",
            "Todas son correctas"
        ],
        correctAnswer: 3,
        justification: "Pues porque el es el dueño de la verdad"
    }
];


function shuffle(array: Question[]): Question[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Inicializar las preguntas mezcladas
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions);

  useEffect(() => {
    const shuffled = shuffle([...questions]);
    setShuffledQuestions(shuffled);
    setIsShuffled(true);
  }, []);

  const handleAnswerClick = (selectedIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswer(selectedIndex);
      setIsAnswered(true);

      if (selectedIndex === shuffledQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    const shuffled = shuffle([...questions]);
    setShuffledQuestions(shuffled);
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return "¡Muy bien! Te ganaste una meriendita.";
    if (percentage >= 70) return "Zafas, con esto ya apruebas.";
    if (percentage >= 50) return "Ahí nomás, tenés que meterle.";
    return "¡Falta estudio! A seguir practicando.";
  };

  if (!isShuffled) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Cargando...</span>
      </div>
    );
  }  

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-8">
      {showScore ? (
        <Card className="relative max-w-2xl mx-auto p-8 text-center shadow-2xl bg-white/90">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Award className="w-20 h-20 mx-auto text-pink-500" />
            <h2 className="text-3xl font-bold text-gray-800">¡Completaste todas las preguntas!</h2>
            <p className="text-xl text-gray-600">
              Obtuviste {score} de {shuffledQuestions.length} puntos
            </p>
            <p className="text-lg font-medium text-pink-500">{getScoreMessage()}</p>
            <Button
              onClick={restartQuiz}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Reintentar
            </Button>
          </motion.div>
        </Card>
      ) : (
        <Card className="relative max-w-2xl mx-auto p-8 shadow-2xl bg-white/90">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Pregunta {currentQuestion + 1} de {shuffledQuestions.length}
              </span>
              <span className="text-sm font-medium text-pink-500">
                Puntuación: {score}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              {shuffledQuestions[currentQuestion].questionText}
            </h2>

            <div className="space-y-3">
              {shuffledQuestions[currentQuestion].options.map((option: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left rounded-lg transition-all ${
                    isAnswered
                      ? index === shuffledQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : index === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  } ${
                    selectedAnswer === index ? 'border-2' : 'border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-3">
                    {isAnswered && index === shuffledQuestions[currentQuestion].correctAnswer && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                    {isAnswered && index === selectedAnswer && index !== shuffledQuestions[currentQuestion].correctAnswer && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <XCircle className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-white rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800">Justificación:</h3>
                <p className="text-gray-600">{shuffledQuestions[currentQuestion].justification}</p>
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className={`${
                  isAnswered
                    ? 'bg-pink-500 hover:bg-pink-600'
                    : 'bg-gray-300'
                } text-white px-6`}
              >
                {currentQuestion === shuffledQuestions.length - 1 ? 'Ver Resultado' : 'Siguiente'}
              </Button>
            </div>
          </motion.div>
        </Card>
      )}
    </div>
  );
};

export default QuizApp;