import { Text, ScrollView, View, TouchableOpacity, TextInput } from "react-native";
import { ChevronDown, HelpCircle, Search, MessageCircle, Mail } from "lucide-react-native";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
      question: 'Jak rozpocząć śledzenie spaceru?',
      answer: 'Naciśnij przycisk "Rozpocznij nowy spacer" na stronie głównej. Możesz rozpocząć od razu lub wybrać zapisaną trasę.',
    },
    {
      question: 'Czy mogę wstrzymać spacer?',
      answer: 'Tak! Naciśnij przycisk pauzy podczas spaceru. Twój postęp zostanie zapisany i możesz wznowić w dowolnym momencie.',
    },
    {
      question: 'Jak utworzyć własną trasę?',
      answer: 'Przejdź do strony Cele i naciśnij "Utwórz nową trasę". Narysuj swoją ścieżkę na mapie i zapisz ją.',
    },
    {
      question: 'Co aplikacja śledzi?',
      answer: 'Aplikacja śledzi dystans, czas trwania, spalone kalorie, tempo i liczbę kroków w czasie rzeczywistym.',
    },
    {
      question: 'Czy działa offline?',
      answer: 'Tak, śledzenie GPS działa offline. Twoje dane zostaną zsynchronizowane po ponownym połączeniu z internetem.',
    },
    {
      question: 'Jak zmienić jednostki?',
      answer: 'Przejdź do Ustawienia > Jednostki i wybierz Metryczne (km) lub Imperialne (mi).',
    },
    {
      question: 'Czy moje dane są bezpieczne?',
      answer: 'Tak! Wszystkie dane są szyfrowane i przechowywane bezpiecznie. Nigdy nie sprzedajemy Twoich informacji.',
    },
    {
      question: 'Jak usunąć moje dane?',
      answer: 'Przejdź do Ustawienia > Wyczyść wszystkie dane, aby usunąć wszystkie informacje, lub Usuń konto, aby trwale usunąć swoje konto.',
    },
  ];

const FaqScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView className="bg-gray-50 flex-1">
            <View className="px-6 pt-5 pb-20">
                {/* FAQ List */}
                <View className="gap-5">
                    {faqData.map((faq, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <View 
                                key={faq.question} 
                                className={`bg-white rounded-[32px] overflow-hidden border-2 transition-all ${isExpanded ? 'border-emerald-500 shadow-xl shadow-emerald-900/10' : 'border-white shadow-md shadow-black/5'}`}
                            >
                                <TouchableOpacity 
                                    onPress={() => toggleFAQ(index)} 
                                    activeOpacity={0.8}
                                    className="p-6 flex-row items-center justify-between bg-white"
                                >
                                    <View className="flex-1 mr-4">
                                        <Text className={`text-[17px] font-bold leading-6 ${isExpanded ? 'text-emerald-700' : 'text-gray-900'}`}>
                                            {faq.question}
                                        </Text>
                                    </View>
                                    <View className={`rounded-2xl p-2 ${isExpanded ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                                        <ChevronDown 
                                            size={22} 
                                            color={isExpanded ? "#059669" : "#6b7280"} 
                                            style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                
                                {isExpanded && (
                                    <View className="px-6 pb-8 bg-white">
                                        <View className="h-[1px] bg-gray-50 mb-6" />
                                        <Text className="text-gray-600 text-[16px] leading-7 font-medium">
                                            {faq.answer}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                {/* Contact Section */}
                <View className="mt-16 bg-white rounded-[40px] p-8 border border-gray-100 shadow-2xl shadow-emerald-900/5 items-center">
                    <View className="bg-emerald-50 w-16 h-16 rounded-full items-center justify-center mb-4">
                        <MessageCircle size={32} color="#059669" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Nadal masz pytania?</Text>
                    <Text className="text-gray-500 text-center mb-8 px-4">Jeśli nie znalazłeś odpowiedzi, skontaktuj się z nami!</Text>
                    
                    <View className="w-full">
                        <View className="bg-emerald-600 py-5 rounded-2xl flex-row items-center justify-center shadow-lg shadow-emerald-600/20">
                            <Mail size={20} color="white" style={{ marginRight: 8 }} />
                            <Text className="text-white font-bold text-lg">[EMAIL_ADDRESS]</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default FaqScreen;